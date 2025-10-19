/**
 * Pagination Component
 * Sayfalama kontrolü oluşturur
 * 
 * @param {Object} config - Konfigürasyon objesi
 * @param {number} config.currentPage - Mevcut sayfa (1-indexed)
 * @param {number} config.totalPages - Toplam sayfa sayısı
 * @param {number} config.totalItems - Toplam öğe sayısı
 * @param {number} config.itemsPerPage - Sayfa başına öğe sayısı
 * @param {Function} config.onPageChange - Sayfa değişim callback
 * @returns {HTMLElement} Pagination elementi
 */
export function createPagination(config) {
  const { 
    currentPage = 1, 
    totalPages = 1, 
    totalItems = 0,
    itemsPerPage = 10,
    onPageChange 
  } = config;

  // Container
  const container = document.createElement('div');
  container.className = 'flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200';

  // Info text
  const info = document.createElement('div');
  info.className = 'text-sm text-gray-600';
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  info.textContent = `${startItem}-${endItem} / ${totalItems} sonuç gösteriliyor`;

  // Pagination controls
  const controls = document.createElement('div');
  controls.className = 'flex items-center gap-2';

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.className = `px-3 py-2 rounded-lg border transition-all ${
    currentPage === 1
      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
      : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
  }`;
  prevButton.disabled = currentPage === 1;
  prevButton.setAttribute('aria-label', 'Önceki sayfa');
  prevButton.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
    </svg>
  `;
  prevButton.addEventListener('click', () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  });

  // Page numbers
  const pageNumbers = document.createElement('div');
  pageNumbers.className = 'flex items-center gap-1';

  // Sayfa numaralarını oluştur (max 5 sayfa göster)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Tüm sayfaları göster
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Akıllı sayfa gösterimi
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  getPageNumbers().forEach(page => {
    if (page === '...') {
      const dots = document.createElement('span');
      dots.className = 'px-2 text-gray-400';
      dots.textContent = '...';
      pageNumbers.appendChild(dots);
    } else {
      const pageButton = document.createElement('button');
      pageButton.className = `min-w-[40px] px-3 py-2 rounded-lg border transition-all ${
        page === currentPage
          ? 'bg-accent-primary border-accent-primary text-gray-900 font-semibold'
          : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
      }`;
      pageButton.textContent = page;
      pageButton.setAttribute('aria-label', `Sayfa ${page}`);
      pageButton.setAttribute('aria-current', page === currentPage ? 'page' : 'false');
      pageButton.addEventListener('click', () => {
        if (onPageChange && page !== currentPage) {
          onPageChange(page);
        }
      });
      pageNumbers.appendChild(pageButton);
    }
  });

  // Next button
  const nextButton = document.createElement('button');
  nextButton.className = `px-3 py-2 rounded-lg border transition-all ${
    currentPage === totalPages
      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
      : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
  }`;
  nextButton.disabled = currentPage === totalPages;
  nextButton.setAttribute('aria-label', 'Sonraki sayfa');
  nextButton.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
    </svg>
  `;
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  });

  // Assemble controls
  controls.appendChild(prevButton);
  controls.appendChild(pageNumbers);
  controls.appendChild(nextButton);

  // Assemble container
  container.appendChild(info);
  container.appendChild(controls);

  return container;
}
