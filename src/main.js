/**
 * Deen AI — Main Entry Point
 * Initializes the app, sidebar, and chat UI
 */

import './styles/index.css';
import { initChatUI } from './components/chatUI.js';
import { initSidebar } from './components/sidebar.js';

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
