/**
 * Deen AI — Embedded Deeniyat Database
 * All content is strictly from authentic Islamic sources (Sahih Bukhari, Sahih Muslim, etc.)
 * 
 * Structure: category > subcategory > entries[]
 * Each entry: { id, arabic, transliteration, translation, reference, keywords[], details }
 */

const deenDatabase = {
  eating: {
    label: "Eating",
    icon: "🍽️",
    subcategories: {
      dua_before: {
        label: "Duas Before Eating",
        entries: [
          {
            id: "eat-before-1",
            arabic: "بِسْمِ اللَّهِ",
            transliteration: "Bismillāh",
            translation: "In the name of Allah.",
            reference: "Sahih Bukhari 5376, Sahih Muslim 2017",
            details: "The Prophet ﷺ said: 'When any one of you eats, let him mention the name of Allah. If he forgets to mention Allah at the beginning, let him say: Bismillahi fi awwalihi wa akhirihi.'",
            keywords: ["bismillah", "before eating", "eating dua", "start eating", "begin eating", "food", "meal", "khana", "khane se pehle"]
          },
          {
            id: "eat-before-2",
            arabic: "بِسْمِ اللَّهِ فِي أَوَّلِهِ وَآخِرِهِ",
            transliteration: "Bismillāhi fī awwalihi wa ākhirihi",
            translation: "In the name of Allah at its beginning and at its end.",
            reference: "Sunan Abu Dawud 3767, Jami at-Tirmidhi 1858",
            details: "This is recited when one forgets to say Bismillah at the beginning of the meal. The Prophet ﷺ taught this to Umayyah bin Makhshi.",
            keywords: ["forgot bismillah", "forgot", "beginning end", "forgot to say", "bhool gaya"]
          },
          {
            id: "eat-before-3",
            arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
            transliteration: "Allāhumma bārik lanā fīmā razaqtanā wa qinā 'adhāban-nār",
            translation: "O Allah, bless us in what You have provided for us and protect us from the punishment of the Fire.",
            reference: "Ibn as-Sunni, Al-Azkar by Imam Nawawi",
            details: "A comprehensive dua asking for barakah (blessing) in sustenance and seeking protection from the Hellfire.",
            keywords: ["bless food", "barakah", "barkat", "blessing", "protection", "hellfire", "rizq"]
          }
        ]
      },
      dua_after: {
        label: "Duas After Eating",
        entries: [
          {
            id: "eat-after-1",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
            transliteration: "Alḥamdu lillāhil-ladhī aṭ'amanī hādhā wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah",
            translation: "All praise is due to Allah Who has given me this food and provided it for me without any might or power on my part.",
            reference: "Sunan Abu Dawud 4023, Jami at-Tirmidhi 3458",
            details: "The Prophet ﷺ said: 'Whoever eats food and then says this, his past sins will be forgiven.' This is the most virtuous dua after eating.",
            keywords: ["after eating", "alhamdulillah", "praise", "finish eating", "done eating", "khana khatam", "khane ke baad", "sins forgiven"]
          },
          {
            id: "eat-after-2",
            arabic: "الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ غَيْرَ مَكْفِيٍّ وَلَا مُوَدَّعٍ وَلَا مُسْتَغْنًى عَنْهُ رَبَّنَا",
            transliteration: "Alḥamdu lillāhi ḥamdan kathīran ṭayyiban mubārakan fīhi, ghayra makfiyyin wa lā muwadda'in wa lā mustaghnan 'anhu Rabbanā",
            translation: "All praise is due to Allah, abundant, good and blessed praise. It cannot be compensated for, nor left, nor can it be done without, our Lord.",
            reference: "Sahih Bukhari 5458",
            details: "Abu Umamah reported that when the Prophet ﷺ finished his meal, he would say this dua. It expresses gratitude while acknowledging utter dependence on Allah.",
            keywords: ["after eating", "abundant praise", "prophet dua", "sunnah", "finish meal", "gratitude", "shukr"]
          },
          {
            id: "eat-after-3",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
            transliteration: "Alḥamdu lillāhil-ladhī aṭ'amanā wa saqānā wa ja'alanā muslimīn",
            translation: "All praise is due to Allah Who gave us food and drink and made us Muslims.",
            reference: "Sunan Abu Dawud 3850, Jami at-Tirmidhi 3457",
            details: "A beautiful dua combining gratitude for sustenance with gratitude for the greatest blessing — Islam itself.",
            keywords: ["after eating", "drinking", "muslim", "islam", "food drink", "gratitude"]
          }
        ]
      },
      sunnah: {
        label: "Sunnah of Eating",
        entries: [
          {
            id: "eat-sunnah-1",
            arabic: "كُلْ بِيَمِينِكَ",
            transliteration: "Kul bi yamīnik",
            translation: "Eat with your right hand.",
            reference: "Sahih Muslim 2020",
            details: "The Prophet ﷺ said: 'Do not eat with the left hand, for Shaytan eats with his left hand.' He said this to Umar ibn Abi Salamah when he was a young boy.",
            keywords: ["right hand", "sunnah eating", "how to eat", "hand", "dayen hath", "seedha hath", "etiquette"]
          },
          {
            id: "eat-sunnah-2",
            arabic: "كُلْ مِمَّا يَلِيكَ",
            transliteration: "Kul mimmā yalīk",
            translation: "Eat from what is nearest to you.",
            reference: "Sahih Bukhari 5376, Sahih Muslim 2022",
            details: "The Prophet ﷺ instructed: 'Mention the name of Allah, eat with your right hand, and eat from what is nearest to you.' This teaches adab (manners) at the dining table.",
            keywords: ["eat nearest", "close to you", "sunnah eating", "manners", "adab", "etiquette", "table manners"]
          },
          {
            id: "eat-sunnah-3",
            transliteration: "Sitting while eating",
            translation: "It is Sunnah to sit while eating and drinking.",
            reference: "Sahih Muslim 2024",
            details: "The Prophet ﷺ forbade drinking while standing. Qatadah was asked about eating, and he said: 'That is worse.' Sitting shows humility and is better for digestion.",
            keywords: ["sitting", "sit down", "not standing", "sunnah eating", "drink sitting", "baith kar", "etiquette"]
          },
          {
            id: "eat-sunnah-4",
            transliteration: "Licking the fingers",
            translation: "The Prophet ﷺ used to lick his three fingers after eating.",
            reference: "Sahih Muslim 2032",
            details: "Ka'b ibn Malik reported: The Prophet ﷺ used to eat with three fingers and lick them before wiping them. He ﷺ said: 'You do not know in which part of the food the barakah lies.'",
            keywords: ["lick fingers", "three fingers", "sunnah eating", "barakah", "barkat", "blessing food", "ungliyan chatna"]
          },
          {
            id: "eat-sunnah-5",
            transliteration: "Not criticizing food",
            translation: "The Prophet ﷺ never criticized any food.",
            reference: "Sahih Bukhari 5409, Sahih Muslim 2064",
            details: "Abu Hurairah (RA) said: 'The Messenger of Allah ﷺ never criticized any food. If he liked it, he would eat it; if he disliked it, he would leave it.' This is a beautiful sunnah of grace and gratitude.",
            keywords: ["not criticize", "don't insult food", "sunnah eating", "leave food", "manners", "grace", "adab", "khana bura na bolo"]
          },
          {
            id: "eat-sunnah-6",
            transliteration: "Not wasting food",
            translation: "Do not waste food. Pick up fallen morsels, clean them, and eat them.",
            reference: "Sahih Muslim 2033",
            details: "The Prophet ﷺ said: 'When any one of you drops a morsel, he should pick it up and remove any dirt on it, then eat it. He should not leave it for the Shaytan.' Wasting food is contrary to the Sunnah.",
            keywords: ["waste food", "fallen food", "pick up", "don't waste", "israf", "barbadi", "morsel", "khana na pheko"]
          }
        ]
      }
    }
  },
  sleeping: {
    label: "Sleeping",
    icon: "🌙",
    subcategories: {
      dua_before: {
        label: "Duas Before Sleeping",
        entries: [
          {
            id: "sleep-before-1",
            arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
            transliteration: "Bismikallāhumma amūtu wa aḥyā",
            translation: "In Your name, O Allah, I die and I live.",
            reference: "Sahih Bukhari 6324",
            details: "Hudhayfah (RA) reported that the Prophet ﷺ used to say this when going to sleep. Sleep is called the 'minor death' — we surrender ourselves to Allah each night.",
            keywords: ["before sleeping", "sleeping dua", "bismika", "die and live", "sone se pehle", "neend", "sleep"]
          },
          {
            id: "sleep-before-2",
            arabic: "اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا لَكَ مَمَاتُهَا وَمَحْيَاهَا إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ",
            transliteration: "Allāhumma innaka khalaqta nafsī wa anta tawaffāhā, laka mamātuhā wa maḥyāhā. In aḥyaytahā faḥfaẓhā, wa in amattahā faghfir lahā. Allāhumma innī as'alukal-'āfiyah",
            translation: "O Allah, You have created my soul and You shall take its life. To You belongs its life and death. If You should keep my soul alive then protect it, and if You should take its life then forgive it. O Allah, I ask You for well-being.",
            reference: "Sahih Muslim 2712",
            details: "A profound dua acknowledging that our souls belong to Allah. We ask for protection if we wake up, and forgiveness if we pass away in sleep.",
            keywords: ["before sleeping", "soul", "protection", "forgiveness", "death sleep", "rooh", "nafs"]
          },
          {
            id: "sleep-before-3",
            arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
            transliteration: "Allāhumma qinī 'adhābaka yawma tab'athu 'ibādak",
            translation: "O Allah, protect me from Your punishment on the Day You resurrect Your servants.",
            reference: "Sunan Abu Dawud 5045, Jami at-Tirmidhi 3398",
            details: "Al-Bara' ibn 'Azib reported that the Prophet ﷺ instructed: When you go to bed, perform wudu as you would for salah, then lie on your right side and recite this dua.",
            keywords: ["before sleeping", "punishment", "resurrection", "day of judgment", "qiyamah", "azab", "protection"]
          },
          {
            id: "sleep-before-4",
            arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
            transliteration: "Bismika Rabbī waḍa'tu janbī, wa bika arfa'uh. Fa in amsakta nafsī farḥamhā, wa in arsaltahā faḥfaẓhā bimā taḥfaẓu bihi 'ibādakaṣ-ṣāliḥīn",
            translation: "In Your name my Lord, I lie down and in Your name I rise. If You should take my soul then have mercy upon it, and if You should return my soul then protect it in the manner You protect Your righteous servants.",
            reference: "Sahih Bukhari 6320, Sahih Muslim 2714",
            details: "A beautiful dua of tawakkul (trust in Allah) — whether we live or die through the night, we place our trust in His mercy and protection.",
            keywords: ["before sleeping", "lie down", "rise", "mercy", "righteous", "trust", "tawakkul", "bharosa"]
          }
        ]
      },
      dua_after: {
        label: "Duas Upon Waking Up",
        entries: [
          {
            id: "sleep-after-1",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَمَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
            transliteration: "Alḥamdu lillāhil-ladhī aḥyānā ba'damā amātanā wa ilayhin-nushūr",
            translation: "All praise is due to Allah, Who gave us life after He caused us to die, and unto Him is the resurrection.",
            reference: "Sahih Bukhari 6312",
            details: "The Prophet ﷺ would say this every morning upon waking up. It's a powerful reminder that every morning is a new life granted by Allah, and we will all return to Him.",
            keywords: ["waking up", "morning dua", "after sleeping", "uthne ki dua", "subah", "morning", "alive", "resurrection"]
          },
          {
            id: "sleep-after-2",
            arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
            transliteration: "Lā ilāha illallāhu waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamdu wa huwa 'alā kulli shay'in qadīr. Subḥānallāhi walḥamdu lillāhi wa lā ilāha illallāhu wallāhu akbar. Wa lā ḥawla wa lā quwwata illā billāhil-'aliyyil-'aẓīm",
            translation: "There is no god but Allah alone, with no partner. To Him belongs the dominion and praise, and He has power over all things. Glory be to Allah, praise be to Allah, there is no god but Allah, Allah is the Greatest. There is no might or power except with Allah, the Most High, the Supreme.",
            reference: "Sahih Bukhari 1154",
            details: "The Prophet ﷺ said: 'Whoever wakes up at night and says this, then says: Allāhummaghfir lī (O Allah forgive me) — or makes dua — it will be accepted. If he performs wudu and prays, his prayer will be accepted.'",
            keywords: ["waking night", "tahajjud", "night waking", "accepted dua", "raat ko uthna", "qabool"]
          }
        ]
      },
      sunnah: {
        label: "Sunnah of Sleeping",
        entries: [
          {
            id: "sleep-sunnah-1",
            transliteration: "Sleeping on the right side",
            translation: "It is Sunnah to sleep on the right side.",
            reference: "Sahih Bukhari 6311, Sahih Muslim 2710",
            details: "The Prophet ﷺ said to Al-Bara' ibn 'Azib: 'When you go to bed, perform wudu as you would for salah, then lie down on your right side.' Sleeping on the right side is recommended by the Sunnah and also has health benefits as it eases the heart.",
            keywords: ["right side", "sleeping position", "sunnah sleeping", "lie down", "dayen karwat", "seedhi taraf"]
          },
          {
            id: "sleep-sunnah-2",
            transliteration: "Performing Wudu before sleeping",
            translation: "It is Sunnah to perform wudu (ablution) before going to sleep.",
            reference: "Sahih Bukhari 247, Sahih Muslim 2710",
            details: "The Prophet ﷺ instructed Al-Bara' ibn 'Azib: 'When you go to your bed, perform wudu like the wudu for salah.' Sleeping in the state of wudu means an angel stays with you through the night.",
            keywords: ["wudu", "ablution", "before sleep", "angel", "sunnah sleeping", "wazu", "paaki"]
          },
          {
            id: "sleep-sunnah-3",
            transliteration: "Dusting the bed before sleeping",
            translation: "Dust the bed three times before lying down.",
            reference: "Sahih Bukhari 6320, Sahih Muslim 2714",
            details: "Abu Hurairah (RA) narrated that the Prophet ﷺ said: 'When any one of you goes to his bed, let him dust his bed with the edge of his lower garment three times, for he does not know what has come on to it after him.' This is for physical and spiritual cleanliness.",
            keywords: ["dust bed", "clean bed", "three times", "sunnah sleeping", "bistar jharna", "safai"]
          },
          {
            id: "sleep-sunnah-4",
            arabic: "آية الكرسي + المعوذتين",
            transliteration: "Reciting Ayat-ul-Kursi before sleeping",
            translation: "Recite Ayat-ul-Kursi (Surah Al-Baqarah, 2:255) before sleeping for Allah's protection throughout the night.",
            reference: "Sahih Bukhari 2311",
            details: "The Prophet ﷺ confirmed that whoever recites Ayat-ul-Kursi before sleeping, a guardian from Allah will be appointed over him and no devil will come near him until morning. This story came from Abu Hurairah's encounter with a figure (Shaytan) trying to steal from the charity food.",
            keywords: ["ayatul kursi", "ayat ul kursi", "protection", "night", "shaytan", "devil", "guardian", "hifazat", "surah baqarah"]
          },
          {
            id: "sleep-sunnah-5",
            transliteration: "Reciting the last two ayahs of Surah Al-Baqarah",
            translation: "Recite the last two verses of Surah Al-Baqarah before sleeping — they are sufficient for you.",
            reference: "Sahih Bukhari 5009, Sahih Muslim 807",
            details: "The Prophet ﷺ said: 'Whoever recites the last two verses of Surah Al-Baqarah at night, they will suffice him.' Scholars say this means they suffice him as protection, or as night prayer (qiyam al-layl).",
            keywords: ["surah baqarah", "last two verses", "akhri ayatein", "sufficient", "protection night", "kafi"]
          },
          {
            id: "sleep-sunnah-6",
            transliteration: "Gathering palms and blowing into them",
            translation: "Before sleeping, gather your palms, blow into them, recite Surah Al-Ikhlas, Surah Al-Falaq, and Surah An-Nas, then wipe over your body.",
            reference: "Sahih Bukhari 5017",
            details: "Aishah (RA) narrated that the Prophet ﷺ would gather his palms every night before sleeping, blow lightly into them, recite the three Quls (Surah Al-Ikhlas, Al-Falaq, An-Nas), then wipe over whatever he could of his body, starting with his head, face, and front body. He would do this three times.",
            keywords: ["three quls", "surah ikhlas", "surah falaq", "surah nas", "blow hands", "wipe body", "teen qul", "sunnah sleeping", "dam karna"]
          },
          {
            id: "sleep-sunnah-7",
            transliteration: "Reciting SubhanAllah, Alhamdulillah, Allahu Akbar",
            translation: "Recite SubhanAllah 33 times, Alhamdulillah 33 times, and Allahu Akbar 34 times before sleeping.",
            reference: "Sahih Bukhari 5362, Sahih Muslim 2727",
            details: "Ali (RA) narrated that Fatimah (RA) came to the Prophet ﷺ asking for a servant. He ﷺ said: 'Shall I not direct you to something better? When you go to bed, say SubhanAllah 33 times, Alhamdulillah 33 times, and Allahu Akbar 34 times. That is better for you than a servant.'",
            keywords: ["subhanallah", "alhamdulillah", "allahu akbar", "tasbih fatima", "33 times", "tasbeeh", "sunnah sleeping", "fatimah"]
          }
        ]
      }
    }
  }
};

/**
 * Get all entries from the database as a flat array
 */
export function getAllEntries() {
  const entries = [];
  for (const category of Object.values(deenDatabase)) {
    for (const subcategory of Object.values(category.subcategories)) {
      entries.push(...subcategory.entries);
    }
  }
  return entries;
}

/**
 * Get entries by category
 */
export function getEntriesByCategory(categoryKey) {
  const category = deenDatabase[categoryKey];
  if (!category) return [];
  const entries = [];
  for (const subcategory of Object.values(category.subcategories)) {
    entries.push(...subcategory.entries);
  }
  return entries;
}

/**
 * Get entries by subcategory
 */
export function getEntriesBySubcategory(categoryKey, subcategoryKey) {
  return deenDatabase[categoryKey]?.subcategories?.[subcategoryKey]?.entries || [];
}

/**
 * Get category and subcategory labels for UI
 */
export function getCategoryStructure() {
  const structure = {};
  for (const [catKey, catVal] of Object.entries(deenDatabase)) {
    structure[catKey] = {
      label: catVal.label,
      icon: catVal.icon,
      subcategories: {}
    };
    for (const [subKey, subVal] of Object.entries(catVal.subcategories)) {
      structure[catKey].subcategories[subKey] = {
        label: subVal.label,
        count: subVal.entries.length
      };
    }
  }
  return structure;
}

export default deenDatabase;
