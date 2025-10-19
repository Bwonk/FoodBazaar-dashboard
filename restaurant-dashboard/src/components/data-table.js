/**
 * Data Table Component
 * Tablo formatında veri gösterir
 * 
 * @param {Object} config - Konfigürasyon objesi
 * @param {Array} config.columns - Kolon tanımları [{ key, label, sortable, render }]
 * @param {Array} config.data - Tablo verisi
 * @param {Object} config.sortState - Sıralama durumu { column, direction } (opsiyonel)
 * @param {Function} config.onSort - Sıralama callback (opsiyonel)
 * @param {Function} config.onRowClick - Satır tıklama callback (opsiyonel)
 * @returns {HTMLElement} Data table elementi
 */
export function createDataTable(config) {
  const { columns = [], data = [], sortState = null, onSort = null, onRowClick } = config;

  // Table container - horizontal scroll için
  // Mobil cihazlarda horizontal scroll aktif
  const container = document.createElement('div');
  container.className = 'w-full overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0';

  // Table
  // min-w-max: Mobilde tablo layout'u bozulmasın, scroll edilebilir olsun
  const table = document.createElement('table');
  table.className = 'w-full min-w-[800px] border-collapse';

  // Table header - clean borders
  const thead = document.createElement('thead');
  thead.className = 'bg-gray-50 border-b border-accent-gray';

  const headerRow = document.createElement('tr');

  columns.forEach(column => {
    const th = document.createElement('th');
    th.className = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';

    // Header content container
    const headerContent = document.createElement('div');
    headerContent.className = 'flex items-center gap-2';

    // Sortable ise button yap
    if (column.sortable) {
      headerContent.classList.add('cursor-pointer', 'select-none', 'hover:text-gray-700', 'transition-colors');
      headerContent.setAttribute('role', 'button');
      headerContent.setAttribute('tabindex', '0');
      headerContent.setAttribute('aria-label', `${column.label} sütununa göre sırala`);

      // Click event
      headerContent.addEventListener('click', () => {
        if (onSort) {
          onSort(column.key);
        }
      });

      // Keyboard event
      headerContent.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onSort) {
            onSort(column.key);
          }
        }
      });
    }

    // Label
    const label = document.createElement('span');
    label.textContent = column.label;
    headerContent.appendChild(label);

    // Sort icon (aktif)
    if (column.sortable) {
      const sortIcon = document.createElement('span');
      const isActive = sortState && sortState.column === column.key;
      const isAsc = isActive && sortState.direction === 'asc';
      const isDesc = isActive && sortState.direction === 'desc';

      sortIcon.className = isActive ? 'text-accent-primary' : 'text-gray-400';

      if (isAsc) {
        // Ascending arrow
        sortIcon.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
          </svg>
        `;
      } else if (isDesc) {
        // Descending arrow
        sortIcon.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        `;
      } else {
        // Default both arrows
        sortIcon.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
          </svg>
        `;
      }

      headerContent.appendChild(sortIcon);
    }

    th.appendChild(headerContent);
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Table body - clean borders ve hover effects
  const tbody = document.createElement('tbody');
  tbody.className = 'bg-background-card divide-y divide-accent-gray';

  data.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50 transition-colors duration-150 cursor-pointer focus-within:bg-gray-50';

    // Klavye erişilebilirliği için tabindex ve role
    tr.setAttribute('tabindex', '0');
    tr.setAttribute('role', 'button');
    tr.setAttribute('aria-label', `Sipariş satırı ${rowIndex + 1}`);

    // Row click handler fonksiyonu
    const handleRowAction = () => {
      if (onRowClick) {
        onRowClick(row, rowIndex);
      }
    };

    // Click event
    tr.addEventListener('click', handleRowAction);

    // Keyboard event - Enter ve Space tuşları
    tr.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleRowAction();
      }
    });

    // Focus ring için outline ekleme
    tr.addEventListener('focus', () => {
      tr.style.outline = '2px solid #bde83a';
      tr.style.outlineOffset = '-2px';
    });

    tr.addEventListener('blur', () => {
      tr.style.outline = 'none';
    });

    columns.forEach(column => {
      const td = document.createElement('td');
      td.className = 'px-6 py-4 whitespace-nowrap text-sm text-gray-900';

      // Custom render fonksiyonu varsa kullan
      if (column.render && typeof column.render === 'function') {
        const rendered = column.render(row[column.key], row, rowIndex);
        if (rendered instanceof HTMLElement) {
          td.appendChild(rendered);
        } else {
          td.textContent = rendered;
        }
      } else {
        td.textContent = row[column.key] || '';
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);

  return container;
}
