/**
 * Deen AI — Local Search Engine v3
 * 
 * PHILOSOPHY: "Only answer when CERTAIN, reject everything else."
 * 
 * Instead of maintaining a blocklist of unsupported topics (which will always miss cases),
 * this engine uses a WHITELIST approach:
 * 1. Extract the user's INTENT (what topic are they asking about?)
 * 2. Check if that topic matches eating OR sleeping
 * 3. Only THEN search the database for specific matches
 * 4. Everything else → polite "I don't have an answer for that"
 * 
 * NO external API calls. Everything runs locally.
 */

import { getAllEntries, getEntriesByCategory, getCategoryStructure } from '../data/deenDatabase.js';

// ═══════════════════════════════════════════════
// GREETING DETECTION
// ═══════════════════════════════════════════════

const GREETINGS = ['assalamu alaikum', 'assalamualaikum', 'salam', 'salaam', 'walaikum', 'hello', 'hi', 'hey', 'marhaba'];

const GREETING_RESPONSE = "Wa Alaikum Assalam wa Rahmatullahi wa Barakatuh! 🌙\n\nWelcome to Deen AI. I can help you with duas and sunnah practices for:\n• **Eating & Sleeping**\n• **Washroom & Leaving Home**\n\nTry asking me things like:\n• \"Dua before eating\"\n• \"Washroom sunnah\"\n• \"Leaving home\"";

function isGreeting(query) {
  const q = query.toLowerCase().trim();
  return GREETINGS.some(g => q.includes(g));
}

// ═══════════════════════════════════════════════
// INTENT DETECTION — What is the user asking about?
// ═══════════════════════════════════════════════

// These are the ONLY topics we can answer about
const EATING_SIGNALS = [
  'eat', 'eating', 'food', 'meal', 'khana', 'khane', 'khate', 'khanay',
  'drink', 'drinking', 'peena', 'peete', 'peene',
  'bismillah', 'alhamdulillah after eat', 'lick', 'finger',
  'right hand eat', 'sitting eat', 'waste food', 'criticize food', 'dastarkhwaan'
];

const SLEEPING_SIGNALS = [
  'sleep', 'sleeping', 'sone', 'sona', 'neend', 'nind',
  'bed', 'bistar', 'lie down', 'lying',
  'waking', 'wake', 'uthna', 'uthne', 'jagana', 'jagta', 'utho',
  'night', 'raat', 'morning', 'subah', 'sokar',
  'ayatul kursi', 'ayat ul kursi', 'ayat-ul-kursi',
  'three qul', 'teen qul', 'quls',
  'tasbih fatim', 'subhanallah 33', 'alhamdulillah 33',
  'wudu before sleep', 'dust bed', 'right side sleep',
  'surah baqarah last', 'last two ayah', 'last two verse', 'astagfar', 'astagfirullah'
];

const WASHROOM_SIGNALS = [
  'washroom', 'toilet', 'bathroom', 'restroom', 'loo', 'pee', 'poop', 'istinja',
  'baitulkhala', 'bait-ul-khala', 'peshaab'
];

const HOME_SIGNALS = [
  'home', 'house', 'leave', 'leaving', 'door', 'going out', 'ghar', 'nikal'
];

// Specific entry-level keywords that let us definitively match within a category
const SPECIFIC_ENTRY_KEYWORDS = {
  eating: [
    'bismillah', 'right hand', 'nearest', 'sitting', 'lick', 'finger',
    'criticize', 'waste', 'morsel', 'three fingers', 'barakah food',
    'alhamdulillah eat', 'forgiven', 'sins forgiven',
    'khana khatam', 'khane ke baad', 'khane se pehle',
    'seedha hath', 'dayen hath', 'baith kar', 'dastarkhwaan', 'zaanu', 'tek laga', 'luqma', 'bartan'
  ],
  sleeping: [
    'ayatul kursi', 'ayat ul kursi', 'three qul', 'teen qul',
    'surah ikhlas', 'surah falaq', 'surah nas',
    'surah baqarah', 'last two', 'akhri ayat',
    'right side', 'dayen karwat', 'wudu sleep', 'wazu',
    'dust bed', 'bistar jharna', 'tasbih fatim',
    'subhanallah 33', 'dam karna',
    'bismikallah', 'bismika',
    'die and live', 'amut', 'ahya',
    'sone se pehle', 'uthne ki dua', 'raat ko', 'astagfar', 'surma', 'qibla', 'aundha', 'pet ke bal'
  ],
  washroom: [
    'enter washroom', 'leave washroom', 'khubuth', 'khabaith', 'ghufranaka',
    'joota', 'chappal', 'sar dhhaank', 'left foot', 'right foot', 'qible ki taraf na munh', 'bilkul baat na karna', 'saabun', 'dho lena', 'baayaan paaon'
  ],
  leaving_home: [
    'leave home', 'ghar se nikal', 'tawakkaltu', 'la hawla', 'salaam kar ke nikalna'
  ]
};

/**
 * Fuzzy match a query against an array of signals
 */
function fuzzyMatchAny(query, array) {
  const q = query.toLowerCase();
  
  // 1. Exact substring check first (fastest)
  if (array.some(sig => q.includes(sig))) return true;
  
  // 2. Fuzzy token check for typos
  const qTokens = getMeaningfulTokens(q);
  
  for (const sig of array) {
    const sigWords = sig.split(/\s+/);
    for (const sigWord of sigWords) {
      if (sigWord.length < 4) continue; // Don't fuzzy match short words (eat, bed, etc.)
      
      const allowedDist = sigWord.length > 6 ? 2 : 1;
      
      if (qTokens.some(token => {
        if (Math.abs(token.length - sigWord.length) > allowedDist) return false;
        return levenshtein(token, sigWord) <= allowedDist;
      })) {
        return true; // Typo match found!
      }
    }
  }
  return false;
}

/**
 * Detect if the query is about eating, sleeping, or unknown
 * Returns: 'eating' | 'sleeping' | 'washroom' | 'leaving_home' | 'both' | null
 */
function detectIntent(query) {
  const q = query.toLowerCase();
  
  const matchesEating = fuzzyMatchAny(q, EATING_SIGNALS);
  const matchesSleeping = fuzzyMatchAny(q, SLEEPING_SIGNALS);
  const matchesWashroom = fuzzyMatchAny(q, WASHROOM_SIGNALS);
  const matchesHome = fuzzyMatchAny(q, HOME_SIGNALS);
  
  if (matchesEating && matchesSleeping) return 'both';
  if (matchesEating) return 'eating';
  if (matchesSleeping) return 'sleeping';
  if (matchesWashroom) return 'washroom';
  if (matchesHome) return 'leaving_home';
  
  // Check specific entry keywords as fallback
  const matchesEatingSpecific = fuzzyMatchAny(q, SPECIFIC_ENTRY_KEYWORDS.eating);
  const matchesSleepingSpecific = fuzzyMatchAny(q, SPECIFIC_ENTRY_KEYWORDS.sleeping);
  const matchesWashroomSpecific = fuzzyMatchAny(q, SPECIFIC_ENTRY_KEYWORDS.washroom);
  const matchesHomeSpecific = fuzzyMatchAny(q, SPECIFIC_ENTRY_KEYWORDS.leaving_home);
  
  if (matchesEatingSpecific) return 'eating';
  if (matchesSleepingSpecific) return 'sleeping';
  if (matchesWashroomSpecific) return 'washroom';
  if (matchesHomeSpecific) return 'leaving_home';
  
  return null;
}

/**
 * Detect subcategory hints
 */
function detectSubType(query) {
  const q = query.toLowerCase();
  if (q.includes('before') || q.includes('pehle') || q.includes('start') || q.includes('enter') || q.includes('andar')) return 'dua_before';
  if (q.includes('after') || q.includes('baad') || q.includes('done') || q.includes('finish') || q.includes('waking') || q.includes('wake') || q.includes('uthne') || q.includes('utho') || q.includes('exit') || q.includes('baahar')) return 'dua_after';
  if (q.includes('sunnah') || q.includes('sunnat') || q.includes('etiquette') || q.includes('manners') || q.includes('adab') || q.includes('how to') || q.includes('tarika')) return 'sunnah';
  return null;
}

// ═══════════════════════════════════════════════
// SCORING — Only uses meaningful (non-generic) tokens
// ═══════════════════════════════════════════════

const STOPWORDS = new Set([
  'the', 'is', 'at', 'in', 'it', 'to', 'of', 'a', 'an', 'and', 'or', 'but',
  'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does',
  'did', 'will', 'would', 'shall', 'should', 'may', 'might', 'can', 'could',
  'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'how',
  'when', 'where', 'why', 'not', 'no', 'nor', 'so', 'if', 'then', 'than',
  'too', 'very', 'just', 'about', 'above', 'below', 'between', 'from',
  'up', 'down', 'out', 'off', 'on', 'over', 'under', 'again', 'further',
  'here', 'there', 'all', 'each', 'every', 'both', 'few', 'more', 'most',
  'other', 'some', 'such', 'only', 'own', 'same', 'for', 'with', 'are',
  'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'they', 'them',
  'his', 'her', 'its', 'tell', 'today', 'please', 'give', 'show', 'want',
  'say', 'said', 'saying', 'read', 'reading',
]);

// Words too generic to drive scoring (they appear in every entry)
const GENERIC_TERMS = new Set([
  'dua', 'duas', 'duaa', 'sunnah', 'sunnat', 'sunnats', 'sunnahs',
  'prophet', 'hadith', 'islam', 'islamic', 'muslim', 'allah',
  'pray', 'prayer', 'recite', 'recitation', 'deen', 'deeni',
  'before', 'after',
]);

function getMeaningfulTokens(query) {
  return query.toLowerCase().trim()
    .split(/\s+/)
    .filter(t => t.length > 2 && !STOPWORDS.has(t) && !GENERIC_TERMS.has(t));
}

/**
 * Dice coefficient string similarity
 */
function stringSimilarity(str1, str2) {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  if (s1 === s2) return 1;
  if (s1.length < 2 || s2.length < 2) return 0;
  
  const bigrams1 = new Set();
  for (let i = 0; i < s1.length - 1; i++) bigrams1.add(s1.substring(i, i + 2));
  
  let intersection = 0;
  for (let i = 0; i < s2.length - 1; i++) {
    if (bigrams1.has(s2.substring(i, i + 2))) intersection++;
  }
  
  return (2.0 * intersection) / ((s1.length - 1) + (s2.length - 1));
}

/**
 * Score an entry against the query
 */
function scoreEntry(entry, tokens) {
  let score = 0;
  if (tokens.length === 0) return 0;
  
  if (entry.keywords) {
    for (const keyword of entry.keywords) {
      const kw = keyword.toLowerCase();
      if (GENERIC_TERMS.has(kw)) continue;
      
      for (const token of tokens) {
        if (kw === token) {
          score += 15;
        } else if (kw.includes(token) && token.length >= 4) {
          score += 8;
        } else if (token.includes(kw) && kw.length >= 4) {
          score += 6;
        }
        if (token.length >= 5) {
          const sim = stringSimilarity(token, kw);
          if (sim > 0.65) score += sim * 4;
        }
      }
    }
  }
  
  if (entry.transliteration) {
    const trans = entry.transliteration.toLowerCase();
    for (const token of tokens) {
      if (token.length >= 4 && trans.includes(token)) score += 3;
    }
  }
  
  return score;
}

// ═══════════════════════════════════════════════
// RESPONSE FORMATTING
// ═══════════════════════════════════════════════

function formatEntry(entry) {
  let response = '';
  
  if (entry.arabic) {
    response += `<div class="arabic-text">${entry.arabic}</div>\n`;
  }
  
  if (entry.transliteration && entry.id && !entry.id.includes('sunnah')) {
    response += `<div class="transliteration">${entry.transliteration}</div>\n`;
  } else if (entry.transliteration && (!entry.id || entry.id.includes('sunnah'))) {
    response += `<div class="sunnah-title">${entry.transliteration}</div>\n`;
  }
  
  if (entry.translation) {
    response += `<div class="translation">"${entry.translation}"</div>\n`;
  }
  
  if (entry.arabic || entry.translation || entry.transliteration) {
    const arabicText = (entry.arabic || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const engText = (entry.translation || entry.transliteration || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const btnId = 'btn-' + Math.random().toString(36).substr(2, 9);
    response += `<div class="card-actions">
      <button id="${btnId}" class="play-btn" onclick="window.playDeenAudio('${arabicText}', '${engText}', '${btnId}')">
        <span class="icon">▶</span> Play Audio
      </button>
    </div>\n`;
  }
  
  if (entry.details) {
    response += `<div class="details">${entry.details}</div>\n`;
  }
  
  if (entry.reference) {
    response += `<div class="reference">📖 ${entry.reference}</div>\n`;
  }
  
  return response;
}

// The "I don't have that" message — shown for ANY query we can't answer
const NO_ANSWER_MSG = `I don't have an answer for that. 🤲\n\nI can currently only help with:\n• **Eating** & **Sleeping**\n• **Washroom** & **Leaving Home**\n\nIn sha Allah, more topics will be added soon!`;

const OUT_OF_SCOPE_MSG = `I'm Deen AI — your companion for learning Islamic practices. 🌙\n\nI can only help with **Deeniyat topics**. Right now I cover:\n• **Eating & Sleeping**\n• **Washroom & Leaving Home**\n\nPlease ask me something related to these topics!`;

// ═══════════════════════════════════════════════
// MAIN SEARCH FUNCTION
// ═══════════════════════════════════════════════

/**
 * Main search — the heart of the app
 * 
 * Logic flow:
 * 1. Is it a greeting? → Respond warmly
 * 2. Can we detect the intent as eating/sleeping? → Search entries
 * 3. Is it Islamic-related but not eating/sleeping? → "I don't have that"
 * 4. Completely off-topic? → "I can only help with deeniyat"
 */
export function search(query) {
  if (!query || query.trim().length === 0) {
    return {
      type: 'empty',
      message: 'Please ask me something about Deeniyat — I can help with eating and sleeping duas and sunnah practices! 🌙'
    };
  }
  
  // 1. Greetings
  if (isGreeting(query)) {
    return { type: 'greeting', message: GREETING_RESPONSE };
  }
  
  const q = query.toLowerCase().trim();
  
  // 2. Detect intent — is this about eating or sleeping?
  const intent = detectIntent(q);
  
  // 3. If NO eating/sleeping intent detected → reject
  if (!intent) {
    // Check if it's at least Islamic-related (has words like dua, sunnah, etc.)
    const isIslamic = ['dua', 'sunnah', 'sunnat', 'hadith', 'prophet', 'islam', 'muslim',
      'allah', 'quran', 'pray', 'deen', 'bismillah', 'alhamdulillah', 'subhanallah',
      'ayat', 'surah', 'recite', 'tasbih', 'dhikr', 'zikr'].some(kw => q.includes(kw));
    
    if (isIslamic) {
      return { type: 'no_data', message: NO_ANSWER_MSG };
    }
    
    return { type: 'out_of_scope', message: OUT_OF_SCOPE_MSG };
  }
  
  // 4. Intent detected! Get category entries
  let entries;
  if (intent === 'both') {
    entries = getAllEntries();
  } else {
    entries = getEntriesByCategory(intent);
  }
  
  const subType = detectSubType(q);
  const tokens = getMeaningfulTokens(q);
  
  // Score entries
  let scored = entries.map(entry => ({
    entry,
    score: scoreEntry(entry, tokens)
  }));
  
  // Boost entries matching subcategory
  if (subType) {
    scored = scored.map(se => ({
      ...se,
      score: se.entry.id && se.entry.id.includes(subType.replace('dua_', ''))
        ? se.score + 10
        : se.score
    }));
  }
  
  // Sort and filter
  scored.sort((a, b) => b.score - a.score);
  const results = scored.filter(se => se.score >= 5);
  
  if (results.length > 0) {
    const top = results.slice(0, 4);
    const structure = getCategoryStructure();
    const categoryLabel = intent !== 'both' ? (structure[intent]?.label || '') : '';
    
    let html = '';
    if (top.length === 1) {
      html = `<div class="dua-card">${formatEntry(top[0].entry)}</div>`;
    } else {
      html = categoryLabel
        ? `Here's what I found about <strong>${categoryLabel.toLowerCase()}</strong>:\n\n`
        : `Here's what I found:\n\n`;
      top.forEach((se, i) => {
        html += `<div class="dua-card">${formatEntry(se.entry)}</div>`;
        if (i < top.length - 1) html += `<div class="card-divider"></div>`;
      });
    }
    
    return { type: 'result', message: html, count: top.length };
  }
  
  // Intent detected but no specific match → show all entries for that category
  // (user said "eating dua" without specifying before/after — show everything)
  if (entries.length > 0) {
    const top = entries.slice(0, 4);
    const structure = getCategoryStructure();
    const categoryLabel = intent !== 'both' ? (structure[intent]?.label || '') : '';
    
    let html = categoryLabel
      ? `Here's what I have about <strong>${categoryLabel.toLowerCase()}</strong>:\n\n`
      : `Here's what I found:\n\n`;
    top.forEach((se, i) => {
      html += `<div class="dua-card">${formatEntry(se)}</div>`;
      if (i < top.length - 1) html += `<div class="card-divider"></div>`;
    });
    
    return { type: 'result', message: html, count: top.length };
  }
  
  // Shouldn't reach here, but just in case
  return { type: 'no_data', message: NO_ANSWER_MSG };
}

/**
 * Get suggested queries for the welcome screen
 */
export function getSuggestions() {
  return [
    { text: "Dua before eating", icon: "🍽️", category: "eating" },
    { text: "Sunnah of sleeping", icon: "🌙", category: "sleeping" },
    { text: "Entering washroom", icon: "🚿", category: "washroom" },
    { text: "Leaving home", icon: "🚪", category: "leaving_home" },
  ];
}
