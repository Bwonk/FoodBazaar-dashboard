// Product Row Component - Restaurant Dashboard
// Ürün satırı komponenti

import { createStatusBadge } from './status-badge.js';

/**
 * Ürün satırı oluşturur
 * @param {Object} product - Ürün verisi
 * @param {Function} onEdit - Düzenle callback
 * @param {Function} onDelete - Sil callback
 * @returns {HTMLElement} Ürün satırı elementi
 */
export function createProductRow(product, onEdit, onDelete) {
  const row = document.createElement('div');
  row.className = 'product-row group flex items-center gap-4 p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 transition-all duration-200';
  row.setAttribute('data-product-id', product.id);
  
  // Ürün görseli
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100';
  
  if (product.image) {
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.className = 'w-full h-full object-cover';
    img.loading = 'lazy';
    imageWrapper.appendChild(img);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'w-full h-full flex items-center justify-center text-gray-400';
    placeholder.innerHTML = `
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    `;
    imageWrapper.appendChild(placeholder);
  }
  
  // Ürün bilgileri
  const infoWrapper = document.createElement('div');
  infoWrapper.className = 'flex-1 min-w-0';
  
  const nameEl = document.createElement('h4');
  nameEl.className = 'text-sm font-semibold text-gray-900 truncate';
  nameEl.textContent = product.name;
  
  const descEl = document.createElement('p');
  descEl.className = 'text-xs text-gray-500 truncate mt-1';
  descEl.textContent = product.description || 'Açıklama yok';
  
  infoWrapper.appendChild(nameEl);
  infoWrapper.appendChild(descEl);
  
  // Fiyat
  const priceWrapper = document.createElement('div');
  priceWrapper.className = 'flex-shrink-0 text-right';
  
  const priceEl = document.createElement('div');
  priceEl.className = 'text-sm font-bold text-gray-900';
  priceEl.textContent = formatPrice(product.price, product.currency);
  
  priceWrapper.appendChild(priceEl);
  
  // Durum badge
  const statusWrapper = document.createElement('div');
  statusWrapper.className = 'flex-shrink-0';
  const statusBadge = createStatusBadge(product.active ? 'active' : 'inactive');
  statusWrapper.appendChild(statusBadge);
  
  // Aksiyon butonları
  const actionsWrapper = document.createElement('div');
  actionsWrapper.className = 'flex-shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity';
  
  // Düzenle butonu
  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.className = 'p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors';
  editButton.setAttribute('aria-label', 'Düzenle');
  editButton.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  `;
  editButton.addEventListener('click', (e) => {
    e.stopPropagation();
    onEdit(product);
  });
  
  // Sil butonu
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors';
  deleteButton.setAttribute('aria-label', 'Sil');
  deleteButton.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  `;
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    onDelete(product);
  });
  
  actionsWrapper.appendChild(editButton);
  actionsWrapper.appendChild(deleteButton);
  
  // Tüm elemanları birleştir
  row.appendChild(imageWrapper);
  row.appendChild(infoWrapper);
  row.appendChild(priceWrapper);
  row.appendChild(statusWrapper);
  row.appendChild(actionsWrapper);
  
  return row;
}

/**
 * Fiyatı formatlar
 * @param {number} price - Fiyat
 * @param {string} currency - Para birimi
 * @returns {string} Formatlanmış fiyat
 */
function formatPrice(price, currency) {
  const symbols = {
    TRY: '₺',
    USD: '$',
    EUR: '€',
    GBP: '£'
  };
  
  const symbol = symbols[currency] || currency;
  return `${symbol}${price.toFixed(2)}`;
}
