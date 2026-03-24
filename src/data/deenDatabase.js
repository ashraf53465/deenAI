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
            id: "eat-dua-before-1",
            details: "Khaane se pehle ki dua padhna:",
            arabic: "بِسْمِ اللهِ وَعَلَى بَرَكَةِ اللهِ",
            transliteration: "Bismillahi wa 'ala barakatillah",
            translation: "In the name of Allah and with the blessings of Allah",
            reference: "Tirmizi: 1858",
            keywords: ["before eating", "dua", "khana", "start", "bismillah"]
          }
        ]
      },
      dua_after: {
        label: "Duas After Eating",
        entries: [
          {
            id: "eat-dua-after-1",
            details: "Khaane ke baad ki dua padhna:",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
            transliteration: "Alhamdulillahil-ladhi at'amana wa saqana wa ja'alana muslimin",
            translation: "All praise is due to Allah, who has fed us and given us drink, and made us Muslims",
            reference: "Tirmizi: 3457",
            keywords: ["after eating", "dua", "khana", "finish", "alhamdulillah"]
          }
        ]
      },
      sunnah: {
        label: "Sunnahs of Eating",
        entries: [
          {
            id: "eat-sunnah-1",
            transliteration: "Dastarkhwaan bichhaana.",
            translation: "Spreading a dining mat.",
            reference: "Bukhari: 5415, Anas رضی اللہ عنہ",
            keywords: ["dastarkhwan", "mat", "sunnah", "eating"]
          },
          {
            id: "eat-sunnah-2",
            transliteration: "Donon haath (gatton tak) dhona.",
            translation: "Washing both hands up to the wrists.",
            reference: "Tirmizi: 1846, Salman رضی اللہ عنہ",
            keywords: ["wash hands", "dhona", "haath", "eating"]
          },
          {
            id: "eat-sunnah-3",
            transliteration: "Ek zaanu ya do zaanu baithna.",
            translation: "Sitting on one or both knees.",
            reference: "Ibne Maaja: 3263, Fat'hul Baari: 9/542",
            keywords: ["sit", "knees", "baithna", "zaanu", "eating"]
          },
          {
            id: "eat-sunnah-4",
            transliteration: "Tek laga kar na khaana.",
            translation: "Not eating while leaning against something.",
            reference: "Tirmizi: 1830, Abu Juhaifah رضی اللہ عنہ",
            keywords: ["lean", "tek", "support", "eating"]
          },
          {
            id: "eat-sunnah-5",
            transliteration: "Daayein haath se khaana.",
            translation: "Eating with the right hand.",
            reference: "Bukhari: 5376",
            keywords: ["right hand", "daayein", "haath", "seedha", "eating"]
          },
          {
            id: "eat-sunnah-6",
            transliteration: "Teen ungliyon se khaana.",
            translation: "Eating with three fingers.",
            reference: "Muslim: 5417",
            keywords: ["three fingers", "teen ungli", "eating"]
          },
          {
            id: "eat-sunnah-7",
            transliteration: "Apne saamne se khaana.",
            translation: "Eating from the food that is directly in front of you.",
            reference: "Bukhari: 5376",
            keywords: ["saamne", "front", "eating"]
          },
          {
            id: "eat-sunnah-8",
            transliteration: "Bahot ziyaada garm na khaana.",
            translation: "Not eating food that is very hot.",
            reference: "Mustadrak: 7125",
            keywords: ["hot", "garm", "eating"]
          },
          {
            id: "eat-sunnah-9",
            transliteration: "Khaane mein aib na nikaalna.",
            translation: "Not finding fault in the food.",
            reference: "Bukhari: 5409",
            keywords: ["aib", "fault", "complain", "eating"]
          },
          {
            id: "eat-sunnah-10",
            transliteration: "Agar luqma gir jaaye, to utha kar kha lena.",
            translation: "If a morsel falls, pick it up and eat it.",
            reference: "Muslim: 5421",
            keywords: ["gir", "fall", "morsel", "luqma", "eating"]
          },
          {
            id: "eat-sunnah-11",
            transliteration: "Bartan aur ungliyon ko chaat kar saaf karna.",
            translation: "Cleaning the plate and fingers by licking them.",
            reference: "Muslim: 5420",
            keywords: ["chaat", "lick", "clean", "plate", "bartan", "eating"]
          },
          {
            id: "eat-sunnah-12",
            transliteration: "Khaane ke baad haath dhona aur kulli karna.",
            translation: "Washing hands and rinsing the mouth after eating.",
            reference: "Tirmizi: 1846, Bukhari: 5454",
            keywords: ["wash", "dhona", "kulli", "rinse", "after eating"]
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
            id: "sleep-dua-before-1",
            details: "Teen martaba Astagfaar padhna:",
            arabic: "أَسْتَغْفِرُ اللهَ الْعَظِيْمَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّوْمُ وَأَتُوْبُ إِلَيْهِ",
            transliteration: "Astaghfirullahal 'Azeemal-ladhi la ilaha illa Huwal-Hayyul-Qayyum wa atoobu ilayh",
            translation: "I seek the forgiveness of Allah the Almighty, whom there is no deity except Him, the Living, the Sustainer, and I repent to Him.",
            reference: "Tirmizi (implied)",
            keywords: ["astagfar", "forgiveness", "repent", "sleeping"]
          },
          {
            id: "sleep-dua-before-2",
            details: "Tasbeeh-e-Faatmi padhna:",
            transliteration: "SubhanAllah (33 times), Alhamdulillah (33 times), Allahu Akbar (34 times)",
            translation: "Glory be to Allah, All praise to Allah, Allah is the Greatest",
            reference: "Bukhari: 5361",
            keywords: ["tasbeeh", "fatimi", "fatima", "subhanallah", "sleeping"]
          },
          {
            id: "sleep-dua-before-3",
            details: "Sura-e-Ikhlaas, Sura-e-Falaq aur Sura-e-Naas padhna.",
            transliteration: "Qul Huwallahu Ahad... Qul A'oodhu bi Rabbil-Falaq... Qul A'oodhu bi Rabbin-Naas...",
            translation: "Say, 'He is Allah, [who is] One...' Say, 'I seek refuge in the Lord of daybreak...' Say, 'I seek refuge in the Lord of mankind...'",
            reference: "Bukhari: 5017",
            keywords: ["surah", "ikhlas", "falaq", "naas", "three quls", "sleeping"]
          },
          {
            id: "sleep-dua-before-4",
            details: "Sone ki dua padhna:",
            arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
            transliteration: "Allahumma bismika amootu wa ahya",
            translation: "O Allah, in Your name I die and I live",
            reference: "Bukhari: 6314",
            keywords: ["dua", "sleep", "bismika", "die", "live", "sleeping"]
          }
        ]
      },
      sunnah: {
        label: "Sunnahs of Sleeping",
        entries: [
          {
            id: "sleep-sunnah-1",
            transliteration: "Isha ke baad jaldi sone ki fikr karna, dunya ki baat na karna.",
            translation: "Aiming to sleep early after Isha and avoiding worldly talk.",
            reference: "Bukhari: 599",
            keywords: ["early", "isha", "jaldi", "baat", "sleeping"]
          },
          {
            id: "sleep-sunnah-2",
            transliteration: "Sone se pehle kapde tabdeel karna.",
            translation: "Changing clothes before sleeping.",
            reference: "Subulul Huda: 7/359",
            keywords: ["kapde", "clothes", "change", "tabdeel", "sleeping"]
          },
          {
            id: "sleep-sunnah-3",
            transliteration: "Baa wuzu sona.",
            translation: "Sleeping in a state of Wudu (ablution).",
            reference: "Bukhari: 6311",
            keywords: ["wuzu", "wudu", "ablution", "sleeping"]
          },
          {
            id: "sleep-sunnah-4",
            transliteration: "Teen martaba bistar jhaad kar sona.",
            translation: "Dusting the bed three times before lying down.",
            reference: "Bukhari: 7393",
            keywords: ["bistar", "bed", "dust", "jhaad", "sleeping"]
          },
          {
            id: "sleep-sunnah-5",
            transliteration: "Teen teen salaai surma lagaana.",
            translation: "Applying kohl (surma) three times to each eye.",
            reference: "Tirmizi: 2048",
            keywords: ["surma", "kohl", "eye", "salaai", "sleeping"]
          },
          {
            id: "sleep-sunnah-6",
            transliteration: "Daahini karwat qibla rukh let kar haath rukhsaar (gaal) ke neeche rakhna.",
            translation: "Lying on the right side facing the Qibla with the hand under the cheek.",
            reference: "Bukhari: 6315",
            keywords: ["right side", "daahini", "karwat", "qibla", "gaal", "cheek", "sleeping"]
          },
          {
            id: "sleep-sunnah-7",
            transliteration: "Pet ke bal aundha na letna.",
            translation: "Not sleeping on one's stomach.",
            reference: "Tirmizi: 2768",
            keywords: ["stomach", "pet", "aundha", "sleeping"]
          }
        ]
      }
    }
  },
  washroom: {
    label: "Washroom",
    icon: "🚿",
    subcategories: {
      dua_before: {
        label: "Entering Washroom",
        entries: [
          {
            id: "washroom-dua-before-1",
            details: "Dua padh kar andar jaana:",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
            transliteration: "Allahumma inni a'udhu bika minal khubuthi wal khaba'ith",
            translation: "O Allah, I seek refuge in You from the male and female devils",
            reference: "Bukhari: 6322",
            keywords: ["enter", "washroom", "toilet", "bathroom", "dua", "khubuth"]
          }
        ]
      },
      dua_after: {
        label: "Leaving Washroom",
        entries: [
          {
            id: "washroom-dua-after-1",
            details: "Baahar aane ke baad dua padhna:",
            arabic: "غُفْرَانَكَ",
            transliteration: "Ghufranaka",
            translation: "I seek Your forgiveness",
            reference: "Ibne Maaja: 300",
            keywords: ["exit", "leave", "washroom", "toilet", "bathroom", "dua", "forgiveness"]
          }
        ]
      },
      sunnah: {
        label: "Washroom Sunnahs",
        entries: [
          {
            id: "washroom-sunnah-1",
            transliteration: "Sar dhhaank kar jaana.",
            translation: "Covering the head before entering.",
            reference: "Baihaqi: 465",
            keywords: ["head", "cover", "sar", "dhhaank", "washroom", "toilet"]
          },
          {
            id: "washroom-sunnah-2",
            transliteration: "Joota chappal pehan kar jaana.",
            translation: "Wearing footwear before entering.",
            reference: "Baihaqi: 465",
            keywords: ["shoes", "footwear", "joota", "chappal", "washroom", "toilet"]
          },
          {
            id: "washroom-sunnah-3",
            transliteration: "Pehle baayaan paaon andar rakhna.",
            translation: "Entering with the left foot first.",
            reference: "Bukhari: 426",
            keywords: ["left foot", "baayaan", "paaon", "enter", "washroom", "toilet"]
          },
          {
            id: "washroom-sunnah-4",
            transliteration: "Qible ki taraf na munh karna aur na peeth karna.",
            translation: "Not facing nor turning one's back towards the Qibla.",
            reference: "Abu Dawood: 8",
            keywords: ["qibla", "face", "back", "munh", "peeth", "washroom", "toilet"]
          },
          {
            id: "washroom-sunnah-5",
            transliteration: "Bilkul baat na karna.",
            translation: "Remaining completely silent.",
            reference: "Abu Dawood: 15",
            keywords: ["silent", "baat", "speak", "washroom", "toilet"]
          },
          {
            id: "washroom-sunnah-6",
            transliteration: "Khade ho kar peshaab na karna.",
            translation: "Not urinating while standing.",
            reference: "Ibne Maaja: 309",
            keywords: ["stand", "khade", "urinate", "peshaab", "washroom", "toilet"]
          },
          {
            id: "washroom-sunnah-7",
            transliteration: "Baayein haath se istinja karna.",
            translation: "Using the left hand for cleaning.",
            reference: "Bukhari: 154",
            keywords: ["left hand", "baayein", "haath", "clean", "istinja", "washroom", "toilet"]
          },
          {
            id: "washroom-sunnah-8",
            transliteration: "Istinja ke baad saabun wagaira se achhhi tarah haath dho lena.",
            translation: "Washing hands thoroughly with soap after cleaning.",
            reference: "Abu Dawood: 45",
            keywords: ["wash hands", "soap", "saabun", "dho", "washroom", "toilet"]
          },
          {
            id: "washroom-sunnah-9",
            transliteration: "Daayein paaon se baahar aana.",
            translation: "Stepping out with the right foot first.",
            reference: "Bukhari: 426",
            keywords: ["right foot", "daayein", "paaon", "exit", "leave", "washroom", "toilet"]
          }
        ]
      }
    }
  },
  leaving_home: {
    label: "Leaving Home",
    icon: "🚪",
    subcategories: {
      dua_before: {
        label: "Leaving Home Dua",
        entries: [
          {
            id: "home-dua-before-1",
            details: "Ghar se nikalne ki dua padhna:",
            arabic: "بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ، لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ",
            transliteration: "Bismillahi tawakkaltu 'alallahi la hawla wa la quwwata illa billah",
            translation: "In the name of Allah, I place my trust in Allah; there is no power and no strength except with Allah",
            reference: "Tirmizi: 3426",
            keywords: ["leave", "home", "dua", "nikal", "ghar", "trust"]
          }
        ]
      },
      sunnah: {
        label: "Leaving Home Sunnahs",
        entries: [
          {
            id: "home-sunnah-1",
            transliteration: "Ghar waalon ko salaam kar ke nikalna.",
            translation: "Greeting the family with 'Salaam' before leaving.",
            reference: "Sho'bul Imaan: 8845",
            keywords: ["greet", "salaam", "family", "ghar", "leave", "home"]
          },
          {
            id: "home-sunnah-2",
            transliteration: "Pehle baayaan paaon ghar se baahar rakhna.",
            translation: "Stepping out of the house with the left foot first.",
            reference: "Bukhari: 426",
            keywords: ["left foot", "baayaan", "paaon", "leave", "home"]
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
