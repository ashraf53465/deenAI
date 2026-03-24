/**
 * Deen AI — TTS Engine
 * Zero-byte audio system using native Web Speech API
 */

let synth = window.speechSynthesis;
let currentUtterance = null;
let isPlaying = false;

export function playAudio(arabicText, englishText, buttonElement) {
  if (isPlaying && currentUtterance) {
    synth.cancel();
    isPlaying = false;
    resetAllButtons();
    return;
  }
  
  // Try to find Arabic voice
  let voices = synth.getVoices();
  let arabicVoice = voices.find(v => v.lang.startsWith('ar'));
  let englishVoice = voices.find(v => v.lang.startsWith('en'));
  
  resetAllButtons();
  
  // Set button to playing state
  if (buttonElement) {
    buttonElement.classList.add('playing');
    buttonElement.innerHTML = `<span class="icon">■</span> Stop`;
  }
  
  if (arabicText) {
    currentUtterance = new SpeechSynthesisUtterance(arabicText);
    currentUtterance.lang = 'ar-SA';
    currentUtterance.rate = 0.8; // Slower for clarity
    if (arabicVoice) currentUtterance.voice = arabicVoice;
    
    currentUtterance.onend = () => {
      if (englishText) {
        let engUtterance = new SpeechSynthesisUtterance(englishText);
        engUtterance.lang = 'en-US';
        engUtterance.rate = 0.9;
        if (englishVoice) engUtterance.voice = englishVoice;
        engUtterance.onend = () => {
          isPlaying = false;
          resetAllButtons();
        };
        synth.speak(engUtterance);
        currentUtterance = engUtterance;
      } else {
        isPlaying = false;
        resetAllButtons();
      }
    };
    
    isPlaying = true;
    synth.speak(currentUtterance);
  } else if (englishText) {
    currentUtterance = new SpeechSynthesisUtterance(englishText);
    currentUtterance.lang = 'en-US';
    currentUtterance.rate = 0.9;
    if (englishVoice) currentUtterance.voice = englishVoice;
    
    currentUtterance.onend = () => {
      isPlaying = false;
      resetAllButtons();
    };
    
    isPlaying = true;
    synth.speak(currentUtterance);
  }
}

function resetAllButtons() {
  document.querySelectorAll('.play-btn').forEach(btn => {
    btn.classList.remove('playing');
    btn.innerHTML = `<span class="icon">▶</span> Play Audio`;
  });
}

// Ensure voices are loaded
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = () => { synth.getVoices(); };
}

// Expose globally for inline onclick handlers
window.playDeenAudio = (arabic, english, btnId) => {
  const btn = document.getElementById(btnId);
  playAudio(arabic, english, btn);
};
