/**
 * Deen AI — Sidebar Component
 * Navigation, category quick links, new chat button
 */

import { getCategoryStructure, getEntriesByCategory } from '../data/deenDatabase.js';
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
  
  // Inject Quick View Modal into body if it doesn't exist
  if (!document.getElementById('quick-view-overlay')) {
    const modalHTML = `
      <div class="quick-view-overlay" id="quick-view-overlay">
        <div class="quick-view-modal">
          <div class="quick-view-header">
            <div class="quick-view-title" id="quick-view-title">Quick Read</div>
            <button class="quick-view-close" id="quick-view-close">&times;</button>
          </div>
          <div class="quick-view-content" id="quick-view-content"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    document.getElementById('quick-view-close').addEventListener('click', () => {
      document.getElementById('quick-view-overlay').classList.remove('visible');
    });
    
    document.getElementById('quick-view-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'quick-view-overlay') {
        document.getElementById('quick-view-overlay').classList.remove('visible');
      }
    });
  }
  
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
  
  // Subcategory nav clicks — show Quick View Modal
  const subcategoryItems = container.querySelectorAll('.subcategory-item');
  subcategoryItems.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      const subcategory = item.dataset.subcategory;
      
      const subLabel = structure[category]?.subcategories?.[subcategory]?.label || '';
      
      if (subLabel) {
        showQuickView(category, subcategory, subLabel);
      }
      
      closeSidebar(); // Close sidebar on mobile when opening modal
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

// ═══════════════════════════════════════════════
// QUICK VIEW MODAL LOGIC
// ═══════════════════════════════════════════════

function formatEntry(entry) {
  let response = '<div class="dua-card">';
  
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
  
  if (entry.details) {
    response += `<div class="details">${entry.details}</div>\n`;
  }
  
  if (entry.reference) {
    response += `<div class="reference">📖 ${entry.reference}</div>\n`;
  }
  
  response += '</div>';
  return response;
}

function showQuickView(category, subcategory, title) {
  const entries = getEntriesByCategory(category);
  const filterKey = subcategory.replace('dua_', '');
  
  // Find entries that match the subcategory (e.g., 'before', 'after', 'sunnah')
  const filtered = entries.filter(e => e.id && e.id.includes(filterKey));
  
  const contentEl = document.getElementById('quick-view-content');
  document.getElementById('quick-view-title').textContent = title;
  
  if (filtered.length > 0) {
    contentEl.innerHTML = filtered.map(e => formatEntry(e)).join('');
  } else {
    contentEl.innerHTML = '<div class="details">No specific entries found for this category yet.</div>';
  }
  
  // Show modal
  document.getElementById('quick-view-overlay').classList.add('visible');
}
