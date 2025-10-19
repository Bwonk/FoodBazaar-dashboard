// New Product Modal Component - Restaurant Dashboard
// Yeni ürün ekleme modalı

/**
 * Yeni ürün ekleme modalı oluşturur
 * @param {Array} categories - Kategori listesi
 * @param {Function} onSave - Kaydet callback
 * @param {Function} onCancel - İptal callback
 * @returns {HTMLElement} Modal elementi
 */
export function createNewProductModal(categories, onSave, onCancel) {
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 id="modal-title" class="text-2xl font-semibold text-gray-900">Yeni Ürün Ekle</h2>
          </div>
          <button type="button" class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" data-close aria-label="Kapat">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Form Container (Scrollable) -->
        <div class="flex-1 overflow-y-auto p-6">
          <form id="product-form" class="space-y-5">
            
            <!-- Ürün Adı -->
            <div>
              <label for="product-name" class="block text-sm font-medium text-gray-700 mb-2">
                Ürün Adı <span class="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="product-name" 
                name="name" 
                required 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="Örn: Margherita Pizza"
              />
            </div>
            
            <!-- Kategori -->
            <div>
              <label for="product-category" class="block text-sm font-medium text-gray-700 mb-2">
                Kategori <span class="text-red-500">*</span>
              </label>
              <select 
                id="product-category" 
                name="categoryId" 
                required 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              >
                <option value="" disabled selected>Kategori seçiniz...</option>
              </select>
            </div>
            
            <!-- Açıklama -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label for="product-description" class="block text-sm font-medium text-gray-700">
                  Açıklama
                </label>
                <span class="text-xs text-gray-500" id="char-counter">0/200</span>
              </div>
              <textarea 
                id="product-description" 
                name="description" 
                rows="3" 
                maxlength="200"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                placeholder="Ürün açıklaması (opsiyonel)"
              ></textarea>
            </div>
            
            <!-- Fiyat ve Para Birimi -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="product-price" class="block text-sm font-medium text-gray-700 mb-2">
                  Fiyat <span class="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  id="product-price" 
                  name="price" 
                  required 
                  min="0" 
                  step="0.01"
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="0.00"
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
                  <option value="TRY" selected>₺ TRY</option>
                  <option value="USD">$ USD</option>
                  <option value="EUR">€ EUR</option>
                  <option value="GBP">£ GBP</option>
                </select>
              </div>
            </div>
            
            <!-- Görsel URL -->
            <div>
              <label for="product-image" class="block text-sm font-medium text-gray-700 mb-2">
                Görsel URL
              </label>
              <input 
                type="url" 
                id="product-image" 
                name="image" 
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
              />
              <p class="text-xs text-gray-500 mt-1">Opsiyonel: Ürün görseli için URL girin</p>
            </div>
            
            <!-- Hata Mesajı -->
            <div id="error-container" class="hidden p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-800" id="error-text"></p>
            </div>
            
            <!-- Başarı Mesajı -->
            <div id="success-container" class="hidden p-4 bg-green-50 border border-green-200 rounded-lg">
              <p class="text-sm text-green-800" id="success-text"></p>
            </div>
            
          </form>
        </div>
        
        <!-- Footer -->
        <div class="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button 
            type="button" 
            class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            data-cancel
          >
            Vazgeç
          </button>
          <div class="flex gap-3">
            <button 
              type="button" 
              class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              data-save-and-new
            >
              Kaydet ve Yeni Oluştur
            </button>
            <button 
              type="submit" 
              form="product-form"
              class="px-6 py-2.5 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
              data-save
            >
              Kaydet
            </button>
          </div>
        </div>
        
      </div>
  `;
  
  // DOM elementlerini al
  const backdrop = modalContainer.querySelector('[data-backdrop]');
  const modal = modalContainer.querySelector('[data-modal]');
  const form = modalContainer.querySelector('#product-form');
  const categorySelect = modalContainer.querySelector('#product-category');
  const descriptionTextarea = modalContainer.querySelector('#product-description');
  const charCounter = modalContainer.querySelector('#char-counter');
  const errorContainer = modalContainer.querySelector('#error-container');
  const errorText = modalContainer.querySelector('#error-text');
  const successContainer = modalContainer.querySelector('#success-container');
  const successText = modalContainer.querySelector('#success-text');
  
  // Kategorileri doldur
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = `${cat.icon} ${cat.name}`;
    categorySelect.appendChild(option);
  });
  
  // Karakter sayacı
  descriptionTextarea.addEventListener('input', () => {
    charCounter.textContent = `${descriptionTextarea.value.length}/200`;
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
    successContainer.classList.add('hidden');
  }
  
  function hideError() {
    errorContainer.classList.add('hidden');
  }
  
  function showSuccess(message) {
    successText.textContent = message;
    successContainer.classList.remove('hidden');
    errorContainer.classList.add('hidden');
    
    setTimeout(() => {
      successContainer.classList.add('hidden');
    }, 3000);
  }
  
  function validateAndGetData() {
    const formData = new FormData(form);
    const productData = {
      name: formData.get('name').trim(),
      categoryId: parseInt(formData.get('categoryId')),
      description: formData.get('description').trim(),
      price: parseFloat(formData.get('price')),
      currency: formData.get('currency'),
      image: formData.get('image').trim(),
      active: true
    };
    
    // Validasyon
    const errors = [];
    
    if (!productData.name) {
      errors.push('Ürün adı zorunludur');
    }
    
    if (!productData.categoryId || isNaN(productData.categoryId)) {
      errors.push('Kategori seçimi zorunludur');
    }
    
    if (isNaN(productData.price) || productData.price < 0) {
      errors.push('Geçerli bir fiyat giriniz');
    }
    
    if (productData.description && productData.description.length > 200) {
      errors.push('Açıklama 200 karakterden uzun olamaz');
    }
    
    if (errors.length > 0) {
      showError(errors.join(', '));
      return null;
    }
    
    return productData;
  }
  
  function handleSave(createAnother = false) {
    const productData = validateAndGetData();
    
    if (!productData) {
      return;
    }
    
    hideError();
    
    if (createAnother) {
      // Formu temizle ve yeni ürün için hazırla
      form.reset();
      charCounter.textContent = '0/200';
      onSave(productData, true);
      showSuccess('Ürün başarıyla eklendi! Yeni ürün ekleyebilirsiniz.');
    } else {
      // Modalı kapat
      closeModal();
      onSave(productData, false);
    }
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
  
  modalContainer.querySelector('[data-save-and-new]').addEventListener('click', () => {
    handleSave(true);
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSave(false);
  });
  
  document.addEventListener('keydown', handleEscape);
  
  // İlk input'a focus
  setTimeout(() => {
    modalContainer.querySelector('#product-name').focus();
  }, 350);
  
  return modalContainer;
}
