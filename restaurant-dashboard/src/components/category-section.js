// Category Section Component - Restaurant Dashboard
// Kategori başlığı ve ürün listesini render eder

import { createProductRow } from './product-row.js';

/**
 * Kategori bölümü oluşturur
 * @param {Object} category - Kategori verisi
 * @param {Array} products - Kategoriye ait ürünler
 * @param {Function} onEditProduct - Ürün düzenle callback
 * @param {Function} onDeleteProduct - Ürün silme callback
 * @returns {HTMLElement} Kategori bölümü elementi
 */
export function createCategorySection(category, products, onEditProduct, onDeleteProduct) {
  const section = document.createElement('div');
  section.className = 'category-section mb-8';
  section.setAttribute('data-category-id', category.id);
  
  // Kategori başlığı
  const header = document.createElement('div');
  header.className = 'flex items-center gap-3 mb-4 pb-3 border-b-2 border-gray-100';
  
  const iconEl = document.createElement('span');
  iconEl.className = 'text-2xl';
  iconEl.textContent = category.icon;
  
  const titleEl = document.createElement('h3');
  titleEl.className = 'text-xl font-semibold text-gray-900';
  titleEl.textContent = category.name;
  
  const countEl = document.createElement('span');
  countEl.className = 'text-sm text-gray-500 ml-2';
  countEl.textContent = `(${products.length})`;
  
  header.appendChild(iconEl);
  header.appendChild(titleEl);
  header.appendChild(countEl);
  
  // Ürün listesi container
  const productsContainer = document.createElement('div');
  productsContainer.className = 'space-y-2';
  
  if (products.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'text-center py-8 text-gray-400';
    emptyState.textContent = 'Bu kategoride henüz ürün yok';
    productsContainer.appendChild(emptyState);
  } else {
    products.forEach(product => {
      const productRow = createProductRow(product, onEditProduct, onDeleteProduct);
      productsContainer.appendChild(productRow);
    });
  }
  
  section.appendChild(header);
  section.appendChild(productsContainer);
  
  return section;
}
