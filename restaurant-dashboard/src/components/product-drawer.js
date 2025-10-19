// Product Edit Modal Component - Restaurant Dashboard
// Ürün düzenleme modalı

/**
 * Ürün düzenleme modalı oluşturur
 * @param {Object} product - Düzenlenecek ürün
 * @param {Array} _categories - Kategori listesi (şu an kullanılmıyor)
 * @param {Function} onSave - Kaydet callback
 * @param {Function} onCancel - İptal callback
 * @returns {HTMLElement} Modal elementi
 */
export function createProductDrawer(product, _categories, onSave, onCancel) {
  // Modal container oluştur
  const modalContainer = document.createElement('div');
  modalContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  `;
  modalContainer.setAttribute('role', 'dialog');
  modalContainer.setAttribute('aria-modal', 'true');
  modalContainer.setAttribute('aria-labelledby', 'modal-title');
  
  // HTML template kullanarak modal içeriğini oluştur
  modalContainer.innerHTML = `
    <!-- Backdrop -->
    <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px);" data-backdrop></div>
    
    <!-- Modal -->
    <div class="relative bg-white rounded-2xl shadow-2xl flex flex-col transform transition-all" style="z-index: 10000; width: 100%; max-width: 42rem; max-height: 90vh;" data-modal>
        
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-t-2xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 id="modal-title" class="text-2xl font-semibold text-gray-900">Ürünü Düzenle</h2>
          </div>
          <button type="button" class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" data-close aria-label="Kapat">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Form Container (Scrollable) -->
        <div class="flex-1 overflow-y-auto p-6">
          <form id="edit-product-form" class="space-y-5">
            
            <!-- Ürün Görseli Preview -->
            <div class="flex justify-center">
              <div class="w-32 h-32 rounded-xl overflow-hidden bg-gray-100" id="image-preview">
                ${product.image ? 
                  `<img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" />` :
                  `<div class="w-full h-full flex items-center justify-center text-gray-400">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>`
                }
              </div>
            </div>
            
            <!-- Ürün Adı (Sadece Görüntüleme) -->
            <div>
              <label for="product-name" class="block text-sm font-medium text-gray-700 mb-2">
                Ürün Adı
              </label>
              <input 
                type="text" 
                id="product-name" 
                name="name" 
                value="${product.name}"
                readonly
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
            
            <!-- Açıklama -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label for="product-description" class="block text-sm font-medium text-gray-700">
                  Açıklama
                </label>
                <span class="text-xs text-gray-500" id="char-counter">${(product.description || '').length}/200</span>
              </div>
              <textarea 
                id="product-description" 
                name="description" 
                rows="3" 
                maxlength="200"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                placeholder="Ürün açıklaması"
              >${product.description || ''}</textarea>
            </div>
            
            <!-- Fiyat ve Para Birimi -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="product-price" class="block text-sm font-medium text-gray-700 mb-2">
                  Fiyat
                </label>
                <input 
                  type="number" 
                  id="product-price" 
                  name="price" 
                  value="${product.price}"
                  min="0" 
                  step="0.01"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label for="product-currency" class="block text-sm font-medium text-gray-700 mb-2">
                  Para Birimi
                </label>
                <select 
                  id="product-currency" 
                  name="currency" 
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                >
                  <option value="TRY" ${product.currency === 'TRY' ? 'selected' : ''}>₺ TRY</option>
                  <option value="USD" ${product.currency === 'USD' ? 'selected' : ''}>$ USD</option>
                  <option value="EUR" ${product.currency === 'EUR' ? 'selected' : ''}>€ EUR</option>
                  <option value="GBP" ${product.currency === 'GBP' ? 'selected' : ''}>£ GBP</option>
                </select>
              </div>
            </div>
            
            <!-- Aktif/Pasif Toggle -->
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <label class="text-sm font-medium text-gray-700">Durum</label>
              <div class="relative">
                <input 
                  type="checkbox" 
                  id="product-active" 
                  name="active" 
                  ${product.active ? 'checked' : ''}
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black cursor-pointer" data-toggle></div>
              </div>
            </div>
            
            <!-- Hata Mesajı -->
            <div id="error-container" class="hidden p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-800" id="error-text"></p>
            </div>
            
          </form>
        </div>
        
        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button 
            type="button" 
            class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            data-cancel
          >
            İptal
          </button>
          <button 
            type="submit" 
            form="edit-product-form"
            class="px-6 py-2.5 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
            data-save
          >
            Kaydet
          </button>
        </div>
        
      </div>
  `;
  
  // DOM elementlerini al
  const backdrop = modalContainer.querySelector('[data-backdrop]');
  const modal = modalContainer.querySelector('[data-modal]');
  const form = modalContainer.querySelector('#edit-product-form');
  const descriptionTextarea = modalContainer.querySelector('#product-description');
  const charCounter = modalContainer.querySelector('#char-counter');
  const toggleDiv = modalContainer.querySelector('[data-toggle]');
  const toggleCheckbox = modalContainer.querySelector('#product-active');
  const errorContainer = modalContainer.querySelector('#error-container');
  const errorText = modalContainer.querySelector('#error-text');
  
  // Karakter sayacı
  descriptionTextarea.addEventListener('input', () => {
    charCounter.textContent = `${descriptionTextarea.value.length}/200`;
  });
  
  // Toggle click handler
  toggleDiv.addEventListener('click', () => {
    toggleCheckbox.checked = !toggleCheckbox.checked;
  });
  
  // Animasyon için başlangıç durumu
  backdrop.style.opacity = '0';
  modal.style.opacity = '0';
  modal.style.transform = 'scale(0.95) translateY(-20px)';
  
  // Animasyonu başlat
  requestAnimationFrame(() => {
    backdrop.style.transition = 'opacity 0.3s ease-out';
    modal.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    backdrop.style.opacity = '1';
    modal.style.opacity = '1';
    modal.style.transform = 'scale(1) translateY(0)';
  });
  
  // Event handlers
  function closeModal() {
    backdrop.style.opacity = '0';
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95) translateY(-20px)';
    
    setTimeout(() => {
      modalContainer.remove();
      document.removeEventListener('keydown', handleEscape);
      onCancel();
    }, 300);
  }
  
  function showError(message) {
    errorText.textContent = message;
    errorContainer.classList.remove('hidden');
  }
  
  function hideError() {
    errorContainer.classList.add('hidden');
  }
  
  function validateAndGetData() {
    const formData = new FormData(form);
    const updates = {
      description: formData.get('description').trim(),
      price: parseFloat(formData.get('price')),
      currency: formData.get('currency'),
      active: formData.get('active') === 'on'
    };
    
    // Validasyon
    const errors = [];
    
    if (updates.description && updates.description.length > 200) {
      errors.push('Açıklama 200 karakterden uzun olamaz');
    }
    
    if (isNaN(updates.price) || updates.price < 0) {
      errors.push('Geçerli bir fiyat giriniz');
    }
    
    if (errors.length > 0) {
      showError(errors.join(', '));
      return null;
    }
    
    return updates;
  }
  
  function handleSave() {
    const updates = validateAndGetData();
    
    if (!updates) {
      return;
    }
    
    hideError();
    closeModal();
    onSave(product.id, updates);
  }
  
  function handleEscape(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
  
  // Event listeners
  modalContainer.querySelector('[data-close]').addEventListener('click', closeModal);
  modalContainer.querySelector('[data-cancel]').addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSave();
  });
  
  document.addEventListener('keydown', handleEscape);
  
  // İlk input'a focus (açıklama alanı)
  setTimeout(() => {
    descriptionTextarea.focus();
  }, 350);
  
  return modalContainer;
}
