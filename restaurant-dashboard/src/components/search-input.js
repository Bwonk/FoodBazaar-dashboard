/**
 * Search Input Component
 * Arama input'u oluşturur
 * 
 * @param {Object} config - Konfigürasyon objesi
 * @param {string} config.placeholder - Placeholder metni
 * @param {Function} config.onSearch - Arama callback fonksiyonu
 * @returns {HTMLElement} Search input elementi
 */
export function createSearchInput(config) {
  const { placeholder = 'Ara...', onSearch } = config;

  // Container
  const container = document.createElement('div');
  container.className = 'relative w-full md:w-96';

  // Search icon
  const icon = document.createElement('div');
  icon.className = 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none';
  icon.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
  `;

  // Input
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholder;
  input.className = 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all';
  input.setAttribute('aria-label', 'Arama');

  // Debounce için timer
  let debounceTimer;

  // Input event - debounced search
  input.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (onSearch) {
        onSearch(e.target.value.trim().toLowerCase());
      }
    }, 300); // 300ms debounce
  });

  container.appendChild(icon);
  container.appendChild(input);

  return container;
}
