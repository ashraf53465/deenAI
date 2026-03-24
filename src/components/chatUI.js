/**
 * Deen AI — Chat UI Component
 * Handles message rendering, typing indicators, welcome screen, and user input
 */

import { search, getSuggestions } from '../engine/searchEngine.js';

let messagesContainer = null;
let inputElement = null;
let isTyping = false;

/**
 * Create the welcome screen with category cards
 */
function createWelcomeScreen() {
  const suggestions = getSuggestions();
  
  return `
    <div class="welcome-screen" id="welcome-screen">
      <svg class="geometric-decoration" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="#1B4332" stroke-width="1"/>
        <circle cx="50" cy="50" r="35" stroke="#1B4332" stroke-width="0.5"/>
        <path d="M50 5 L50 95 M5 50 L95 50" stroke="#1B4332" stroke-width="0.5"/>
        <path d="M50 15 L85 50 L50 85 L15 50 Z" stroke="#C9A227" stroke-width="0.8" fill="none"/>
        <circle cx="50" cy="50" r="20" stroke="#C9A227" stroke-width="0.5"/>
        <path d="M50 5 L61 30 L89 30 L67 48 L74 75 L50 58 L26 75 L33 48 L11 30 L39 30 Z" stroke="#1B4332" stroke-width="0.3" fill="none"/>
      </svg>
      <div class="welcome-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
      <h1 class="welcome-title">Deen AI</h1>
      <p class="welcome-subtitle">
        Your companion for learning authentic Islamic duas. 
        Ask away about any sunnah practices...
      </p>
    </div>
  `;
}

/**
 * Format timestamp
 */
function getTimeString() {
  return new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}

/**
 * Create a user message bubble
 */
function createUserMessage(text) {
  return `
    <div class="message user" style="animation-delay: 0ms">
      <div class="message-avatar">👤</div>
      <div class="message-content">
        <div class="message-bubble">${escapeHtml(text)}</div>
        <div class="message-time">${getTimeString()}</div>
      </div>
    </div>
  `;
}

/**
 * Create a bot message bubble
 */
function createBotMessage(html) {
  return `
    <div class="message bot" style="animation-delay: 0ms">
      <div class="message-avatar">🌙</div>
      <div class="message-content">
        <div class="message-bubble">${html}</div>
        <div class="message-time">${getTimeString()}</div>
      </div>
    </div>
  `;
}

/**
 * Create typing indicator
 */
function createTypingIndicator() {
  return `
    <div class="typing-indicator" id="typing-indicator">
      <div class="message-avatar" style="background: linear-gradient(135deg, #1B4332, #2D6A4F); color: #FEFAE0; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem;">🌙</div>
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Scroll chat to bottom smoothly
 */
function scrollToBottom() {
  if (messagesContainer) {
    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 50);
  }
}

/**
 * Remove welcome screen
 */
function removeWelcomeScreen() {
  const welcome = document.getElementById('welcome-screen');
  if (welcome) {
    welcome.style.transition = 'opacity 300ms ease-out, transform 300ms ease-out';
    welcome.style.opacity = '0';
    welcome.style.transform = 'translateY(-20px)';
    setTimeout(() => welcome.remove(), 300);
  }
}

/**
 * Handle sending a message
 */
async function handleSend(text) {
  if (!text || text.trim().length === 0 || isTyping) return;
  
  const query = text.trim();
  
  // Remove welcome screen if visible
  removeWelcomeScreen();
  
  // Add user message
  messagesContainer.insertAdjacentHTML('beforeend', createUserMessage(query));
  scrollToBottom();
  
  // Clear input
  if (inputElement) {
    inputElement.value = '';
    inputElement.focus();
  }
  
  // Show typing indicator
  isTyping = true;
  messagesContainer.insertAdjacentHTML('beforeend', createTypingIndicator());
  scrollToBottom();
  
  // Simulate thinking delay (300-800ms based on query length)
  const delay = Math.min(300 + query.length * 20, 800);
  await new Promise(r => setTimeout(r, delay));
  
  // Remove typing indicator
  const typingEl = document.getElementById('typing-indicator');
  if (typingEl) typingEl.remove();
  
  // Search the database
  const result = search(query);
  
  // Format the response based on type
  let responseHtml = '';
  
  if (result.type === 'greeting') {
    responseHtml = result.message.replace(/\n/g, '<br>');
  } else if (result.type === 'result') {
    responseHtml = result.message;
  } else if (result.type === 'no_data' || result.type === 'out_of_scope' || result.type === 'empty') {
    responseHtml = result.message.replace(/\n/g, '<br>');
  }
  
  // Add bot message
  messagesContainer.insertAdjacentHTML('beforeend', createBotMessage(responseHtml));
  scrollToBottom();
  
  isTyping = false;
  
  // Save to chat history
  saveToChatHistory(query, responseHtml);
}

/**
 * Save message to localStorage chat history
 */
function saveToChatHistory(query, response) {
  try {
    const history = JSON.parse(localStorage.getItem('deen-ai-history') || '[]');
    history.push({
      query,
      response,
      timestamp: Date.now()
    });
    // Keep last 50 messages
    if (history.length > 50) history.splice(0, history.length - 50);
    localStorage.setItem('deen-ai-history', JSON.stringify(history));
  } catch (e) {
    // Silently fail — not critical
  }
}

/**
 * Clear chat and show welcome screen
 */
export function clearChat() {
  if (messagesContainer) {
    messagesContainer.innerHTML = createWelcomeScreen();
  }
}

/**
 * Initialize the chat UI
 */
export function initChatUI(container) {
  container.innerHTML = `
    <!-- Chat Header -->
    <div class="chat-header">
      <div class="header-left">
        <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu">☰</button>
        <span class="header-title">Deen AI</span>
      </div>
    </div>
    
    <!-- Chat Messages -->
    <div class="chat-messages" id="chat-messages">
      ${createWelcomeScreen()}
    </div>
    
    <!-- Input Area -->
    <div class="chat-input-area">
      <div class="chat-input-wrapper">
        <input 
          type="text" 
          class="chat-input" 
          id="chat-input"
          placeholder="Ask about duas & sunnah..."
          autocomplete="off"
          aria-label="Type your question"
        />
        <button class="send-btn" id="send-btn" aria-label="Send message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      <div class="input-hint">Responses strictly from <strong>authenticated hadith sources</strong></div>
    </div>
  `;
  
  // Get references
  messagesContainer = document.getElementById('chat-messages');
  inputElement = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const menuToggle = document.getElementById('menu-toggle');
  
  // Event listeners
  sendBtn.addEventListener('click', () => {
    handleSend(inputElement.value);
  });
  
  inputElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputElement.value);
    }
  });
  
  // Menu toggle for mobile
  menuToggle.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('visible');
  });
  
  // Global function for suggestion card clicks
  window.handleSuggestionClick = (text) => {
    handleSend(text);
  };
}
