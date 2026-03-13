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
          <div class="sidebar-category-group" id="group-${key}">
            <div class="sidebar-nav-item category-toggle" data-category="${key}">
              <div class="nav-item-left">
                <span class="nav-icon">${cat.icon}</span>
                <span class="nav-label">${cat.label}</span>
              </div>
              <span class="nav-chevron">▼</span>
            </div>
            <div class="sidebar-subcategories">
              ${Object.entries(cat.subcategories).map(([subKey, sub]) => `
                <div class="sidebar-nav-item subcategory-item" data-category="${key}" data-subcategory="${subKey}">
                  <span class="nav-icon" style="font-size: 0.7rem;">●</span>
                  <span class="nav-label" style="font-size: 0.95rem;">${sub.label}</span>
                </div>
              `).join('')}
            </div>
          </div>
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
  
  // Category toggles (show/hide subcategories)
  const categoryToggles = container.querySelectorAll('.category-toggle');
  categoryToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const category = toggle.dataset.category;
      const group = document.getElementById(`group-${category}`);
      if (group) {
        group.classList.toggle('open');
      }
    });
  });
  
  // Subcategory nav clicks — trigger a search
  const subcategoryItems = container.querySelectorAll('.subcategory-item');
  subcategoryItems.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      const subcategory = item.dataset.subcategory;
      
      const subLabel = structure[category]?.subcategories?.[subcategory]?.label || '';
      
      if (subLabel && window.handleSuggestionClick) {
        window.handleSuggestionClick(subLabel);
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
