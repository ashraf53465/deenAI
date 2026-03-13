/**
 * Deen AI — Sidebar Component
 * Navigation, category quick links, new chat button
 */

import { getCategoryStructure } from '../data/deenDatabase.js';
import { clearChat } from './chatUI.js';

/**
 * Initialize the sidebar
 */
export function initSidebar(container) {
  const structure = getCategoryStructure();
  
  container.innerHTML = `
    <div class="sidebar">
      <!-- Logo -->
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="sidebar-logo-icon">🌙</div>
          <div>
            <div class="sidebar-logo-text">Deen AI</div>
            <div class="sidebar-logo-sub">Islamic Companion</div>
          </div>
        </div>
      </div>
      
      <!-- New Chat -->
      <button class="new-chat-btn" id="new-chat-btn">
        <span class="plus-icon">+</span>
        New Conversation
      </button>
      
      <!-- Categories -->
      <div class="sidebar-section-title">Topics</div>
      <nav class="sidebar-nav">
        ${Object.entries(structure).map(([key, cat]) => `
          <div class="sidebar-nav-item" data-category="${key}">
            <span class="nav-icon">${cat.icon}</span>
            <span class="nav-label">${cat.label}</span>
          </div>
          ${Object.entries(cat.subcategories).map(([subKey, sub]) => `
            <div class="sidebar-nav-item" data-category="${key}" data-subcategory="${subKey}" style="padding-left: 2.5rem; font-size: 0.85rem;">
              <span class="nav-icon" style="font-size: 0.7rem;">●</span>
              <span class="nav-label" style="font-size: 0.95rem;">${sub.label}</span>
            </div>
          `).join('')}
        `).join('')}
      </nav>
      
      <!-- Footer -->
      <div class="sidebar-footer">
        <div class="sidebar-footer-text">
          All content from verified<br>Sahih hadith sources
        </div>
      </div>
    </div>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
  `;
  
  // New chat button
  const newChatBtn = document.getElementById('new-chat-btn');
  newChatBtn.addEventListener('click', () => {
    clearChat();
    closeSidebar();
  });
  
  // Category nav clicks — trigger a search via the global handler
  const navItems = container.querySelectorAll('.sidebar-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      const subcategory = item.dataset.subcategory;
      
      let query = '';
      if (subcategory) {
        const subLabel = structure[category]?.subcategories?.[subcategory]?.label || '';
        query = subLabel;
      } else {
        query = `${structure[category]?.label || ''} duas and sunnah`;
      }
      
      if (query && window.handleSuggestionClick) {
        window.handleSuggestionClick(query);
      }
      closeSidebar();
    });
  });
  
  // Overlay click closes sidebar
  const overlay = document.getElementById('sidebar-overlay');
  overlay.addEventListener('click', closeSidebar);
}

function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('visible');
}
