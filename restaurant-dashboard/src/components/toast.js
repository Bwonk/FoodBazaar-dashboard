// Toast Notification Component - Restaurant Dashboard
// Kısa bildirim mesajları gösterir

/**
 * Toast bildirimi gösterir
 * @param {string} message - Gösterilecek mesaj
 * @param {string} type - Bildirim tipi: 'success', 'error', 'info'
 * @param {number} duration - Gösterim süresi (ms)
 */
export function showToast(message, type = 'success', duration = 3000) {
  // Toast container'ı kontrol et veya oluştur
  let container = document.getElementById('toast-container');
  
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-20 right-8 z-50 flex flex-col gap-2';
    document.body.appendChild(container);
  }
  
  // Toast elementi
  const toast = document.createElement('div');
  toast.className = 'flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg transform translate-x-full transition-all duration-300 min-w-[320px]';
  
  // Tip'e göre stil
  const styles = {
    success: {
      bg: 'bg-green-50 border border-green-200',
      icon: `
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
      textColor: 'text-green-800'
    },
    error: {
      bg: 'bg-red-50 border border-red-200',
      icon: `
        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
      textColor: 'text-red-800'
    },
    info: {
      bg: 'bg-blue-50 border border-blue-200',
      icon: `
        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
      textColor: 'text-blue-800'
    }
  };
  
  const style = styles[type] || styles.info;
  toast.className += ` ${style.bg}`;
  
  // Icon
  const iconWrapper = document.createElement('div');
  iconWrapper.className = 'flex-shrink-0';
  iconWrapper.innerHTML = style.icon;
  
  // Message
  const messageEl = document.createElement('p');
  messageEl.className = `flex-1 text-sm font-medium ${style.textColor}`;
  messageEl.textContent = message;
  
  // Close button
  const closeButton = document.createElement('button');
  closeButton.className = 'flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors';
  closeButton.setAttribute('aria-label', 'Kapat');
  closeButton.innerHTML = `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;
  closeButton.addEventListener('click', () => removeToast(toast));
  
  toast.appendChild(iconWrapper);
  toast.appendChild(messageEl);
  toast.appendChild(closeButton);
  
  container.appendChild(toast);
  
  // Animasyon
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 10);
  
  // Otomatik kaldırma
  if (duration > 0) {
    setTimeout(() => {
      removeToast(toast);
    }, duration);
  }
}

/**
 * Toast'u kaldırır
 * @param {HTMLElement} toast - Kaldırılacak toast elementi
 */
function removeToast(toast) {
  toast.style.transform = 'translateX(100%)';
  toast.style.opacity = '0';
  
  setTimeout(() => {
    toast.remove();
    
    // Container boşsa kaldır
    const container = document.getElementById('toast-container');
    if (container && container.children.length === 0) {
      container.remove();
    }
  }, 300);
}
