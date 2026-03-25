/**
 * Deen AI — Main Entry Point
 * Initializes the app, sidebar, and chat UI
 */

import './styles/index.css';
import './engine/ttsEngine.js';
import { registerSW } from 'virtual:pwa-register';
import { initChatUI } from './components/chatUI.js';
import { initSidebar } from './components/sidebar.js';

// Initialize Theme early to prevent flash
const savedTheme = localStorage.getItem('deen-ai-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

function init() {
  const app = document.getElementById('app');
  
  // Create the layout structure
  const sidebarContainer = document.createElement('div');
  sidebarContainer.id = 'sidebar-container';
  
  const mainContent = document.createElement('div');
  mainContent.className = 'main-content';
  mainContent.id = 'main-content';
  
  app.appendChild(sidebarContainer);
  app.appendChild(mainContent);
  
  // Initialize components
  initSidebar(sidebarContainer);
  initChatUI(mainContent);
}

// Boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  registerSW({
    immediate: true,
    onOfflineReady() {
      console.log('Deen AI is ready for offline use.');
    }
  });
}
