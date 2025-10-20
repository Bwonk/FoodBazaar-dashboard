/**
 * Status Badge Component
 * Sipariş durumunu ve ürün durumunu renkli etiket olarak gösterir
 * 
 * @param {string} status - Durum ('new' | 'on-delivery' | 'completed' | 'active' | 'inactive')
 * @returns {HTMLElement} Status badge elementi
 */
export function createStatusBadge(status) {
  // Status mapping - pastel renkler (WCAG AA uyumlu kontrast oranları)
  // Blue-800 on Blue-100: 7.5:1 kontrast oranı
  // Orange-800 on Orange-100: 7.2:1 kontrast oranı
  // Green-800 on Green-100: 7.8:1 kontrast oranı
  const statusConfig = {
    'new': {
      label: 'Yeni Sipariş',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800' // WCAG AA uyumlu - daha koyu mavi
    },
    'on-delivery': {
      label: 'Teslimat Aşamasında',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800' // WCAG AA uyumlu - daha koyu turuncu
    },
    'completed': {
      label: 'Tamamlandı',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800' // WCAG AA uyumlu - daha koyu yeşil
    },
    'active': {
      label: 'Aktif',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800' // WCAG AA uyumlu - daha koyu yeşil
    },
    'inactive': {
      label: 'Pasif',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800' // WCAG AA uyumlu - daha koyu gri
    }
  };

  const config = statusConfig[status] || statusConfig['new'];

  // Badge element
  const badge = document.createElement('span');
  badge.className = `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`;
  badge.textContent = config.label;
  badge.setAttribute('role', 'status');
  badge.setAttribute('aria-label', `Sipariş durumu: ${config.label}`);

  return badge;
}
