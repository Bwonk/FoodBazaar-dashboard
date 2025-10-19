/**
 * Progress Bar Component
 * Yüzdelik ilerleme göstergesi oluşturur
 * 
 * @param {Object} config - Konfigürasyon objesi
 * @param {number} config.percentage - İlerleme yüzdesi (0-100)
 * @param {string} config.color - Renk ('primary' | 'secondary' | 'tertiary' | 'dark')
 * @param {string} config.height - Yükseklik (örn: '4px', '8px')
 * @returns {HTMLElement} Progress bar elementi
 */
export function createProgressBar(config) {
  const { percentage = 0, color = 'primary', height = '6px' } = config;

  // Renk mapping - ana tema renkleri
  const colorMap = {
    primary: 'bg-accent-primary',      // Lime-yeşil (#bde83a)
    secondary: 'bg-accent-secondary',  // Emerald yeşil
    tertiary: 'bg-accent-tertiary',    // Amber
    dark: 'bg-accent-dark'             // Koyu yeşil
  };

  // Container
  const container = document.createElement('div');
  container.className = 'w-full bg-gray-200 rounded-full overflow-hidden';
  container.style.height = height;

  // Progress fill
  const fill = document.createElement('div');
  fill.className = `${colorMap[color] || colorMap.primary} h-full rounded-full transition-all duration-500 ease-out`;
  fill.style.width = '0%';

  container.appendChild(fill);

  // Animasyonlu dolum - DOM'a eklendikten sonra
  setTimeout(() => {
    fill.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  }, 50);

  return container;
}
