import { createProgressBar } from './progress-bar.js';

/**
 * KPI Card Component
 * Anahtar performans göstergelerini görselleştirir
 * 
 * @param {Object} config - Konfigürasyon objesi
 * @param {string} config.title - Kart başlığı
 * @param {number} config.value - Ana değer
 * @param {number} config.percentage - Yüzde değeri
 * @param {number} config.progress - Progress bar için ilerleme yüzdesi
 * @param {string} config.variant - Varyant ('dark' | 'light')
 * @returns {HTMLElement} KPI card elementi
 */
export function createKpiCard(config) {
  const {
    title = '',
    value = 0,
    percentage = 0,
    progress = 0,
    variant = 'light'
  } = config;

  // Card container
  const card = document.createElement('div');
  
  // Variant'a göre stil - rounded corners ve shadows
  if (variant === 'dark') {
    card.className = 'bg-background-dark text-white rounded-lg p-6 shadow-card';
  } else {
    card.className = 'bg-background-card rounded-lg p-6 shadow-card';
  }

  // Title - WCAG AA uyumlu renkler
  // Gray-300 (#D1D5DB) on dark (#1F1F1F): 9.8:1 kontrast oranı ✓
  // Gray-600 (#4B5563) on white (#FFFFFF): 7.5:1 kontrast oranı ✓
  const titleEl = document.createElement('h3');
  titleEl.className = variant === 'dark' ? 'text-sm text-gray-300 mb-4' : 'text-sm text-gray-600 mb-4';
  titleEl.textContent = title;

  // Value container
  const valueContainer = document.createElement('div');
  valueContainer.className = 'flex items-end gap-2 mb-4';

  // Main value
  const valueEl = document.createElement('div');
  valueEl.className = 'text-3xl font-bold';
  valueEl.textContent = value;

  // Percentage badge - WCAG AA uyumlu renkler
  // Gray-400 (#9CA3AF) on dark (#1F1F1F): 6.4:1 kontrast oranı ✓
  // Gray-600 (#4B5563) on white (#FFFFFF): 7.5:1 kontrast oranı ✓
  const percentageEl = document.createElement('span');
  percentageEl.className = variant === 'dark' 
    ? 'text-sm text-gray-400 mb-1' 
    : 'text-sm text-gray-600 mb-1';
  percentageEl.textContent = `${percentage}%`;

  valueContainer.appendChild(valueEl);
  valueContainer.appendChild(percentageEl);

  // Progress bar - her zaman primary renk (#bde83a)
  const progressBar = createProgressBar({
    percentage: progress,
    color: 'primary',
    height: '6px'
  });

  // Assemble card
  card.appendChild(titleEl);
  card.appendChild(valueContainer);
  card.appendChild(progressBar);

  return card;
}
