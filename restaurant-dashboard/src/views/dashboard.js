// Dashboard View - Restaurant Dashboard
// Ana dashboard sayfasını oluşturur ve tüm bileşenleri entegre eder

// Component imports
import { createKpiCard } from '../components/kpi-card.js';
import { createChartCard } from '../components/chart-card.js';
import { createDataTable } from '../components/data-table.js';
import { createStatusBadge } from '../components/status-badge.js';
import { createPagination } from '../components/pagination.js';

// API imports
import { getKpis, getRevenue, getOrdersSummary, getOrders } from '../api/api.adapter.js';

/**
 * Dashboard'u render eder
 * Tüm dashboard bileşenlerini oluşturur ve container'a ekler
 * 
 * @param {HTMLElement} container - Dashboard'un render edileceği container
 */
export async function renderDashboard(container) {
  // Ana container temizle
  container.innerHTML = '';
  container.className = '';

  // Main content wrapper
  const mainContent = document.createElement('div');
  mainContent.className = 'max-w-7xl mx-auto space-y-6 w-full';

  // KPI Cards Section
  // Mobile (< 768px): 1-column
  // Tablet (768px - 1023px): 2x2 grid
  // Desktop (>= 1024px): 4-column
  const kpiSection = document.createElement('div');
  kpiSection.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
  kpiSection.id = 'kpi-section';

  // Chart Cards Section
  // Mobile (< 768px): 1-column
  // Tablet and Desktop (>= 768px): 2-column
  const chartSection = document.createElement('div');
  chartSection.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';
  chartSection.id = 'chart-section';

  // Order List Section
  const orderSection = document.createElement('div');
  orderSection.className = 'w-full';
  orderSection.id = 'order-section';

  // Assemble main content
  mainContent.appendChild(kpiSection);
  mainContent.appendChild(chartSection);
  mainContent.appendChild(orderSection);
  container.appendChild(mainContent);

  // Load ve render tüm bileşenler
  await loadKpiCards(kpiSection);
  await loadRevenueChart(chartSection);
  await loadOrdersSummaryChart(chartSection);
  await loadOrderList(orderSection);
}

/**
 * KPI kartlarını yükler ve render eder
 * Total Menus (dark), Total Orders Today, Total Client Today, Revenue Day Ratio (light)
 * 
 * @param {HTMLElement} container - KPI kartlarının ekleneceği container
 */
async function loadKpiCards(container) {
  try {
    // API'den KPI verilerini al
    const kpis = await getKpis();

    // Total Menus Card (Light variant)
    const totalMenusCard = createKpiCard({
      title: 'Toplam Menü',
      value: kpis.totalMenus.value,
      percentage: kpis.totalMenus.percentage,
      progress: kpis.totalMenus.progress,
      variant: 'light'
    });

    // Total Orders Today Card (Light variant)
    const totalOrdersCard = createKpiCard({
      title: 'Bugünkü Siparişler',
      value: kpis.totalOrdersToday.value,
      percentage: kpis.totalOrdersToday.percentage,
      progress: kpis.totalOrdersToday.progress,
      variant: 'light'
    });

    // Total Client Today Card (Light variant)
    const totalClientsCard = createKpiCard({
      title: 'Bugünkü Müşteriler',
      value: kpis.totalClientsToday.value,
      percentage: kpis.totalClientsToday.percentage,
      progress: kpis.totalClientsToday.progress,
      variant: 'light'
    });

    // Revenue Day Ratio Card (Light variant)
    const revenueDayRatioCard = createKpiCard({
      title: 'Günlük Gelir Oranı',
      value: kpis.revenueDayRatio.value,
      percentage: kpis.revenueDayRatio.percentage,
      progress: kpis.revenueDayRatio.progress,
      variant: 'light'
    });

    // Container'a ekle
    container.appendChild(totalMenusCard);
    container.appendChild(totalOrdersCard);
    container.appendChild(totalClientsCard);
    container.appendChild(revenueDayRatioCard);

  } catch (error) {
    console.error('KPI kartları yüklenirken hata oluştu:', error);
    // Fallback göster
    container.innerHTML = '<p class="text-red-500">KPI verileri yüklenemedi.</p>';
  }
}

/**
 * Revenue chart'ı yükler ve render eder
 * Line chart ile Income ve Expenses gösterir
 * Period switcher ile monthly/weekly/today arasında geçiş yapar
 * 
 * @param {HTMLElement} container - Chart'ın ekleneceği container
 */
async function loadRevenueChart(container) {
  try {
    // İlk veriyi al (monthly)
    const initialData = await getRevenue('monthly');

    // Chart card oluştur
    const { element: chartCard } = createChartCard({
      title: 'Gelir',
      chartType: 'line',
      data: initialData,
      periods: ['Aylık', 'Haftalık', 'Bugün'],
      onPeriodChange: async (period, updateFn) => {
        // Period değiştiğinde yeni veriyi al ve chart'ı güncelle
        try {
          const newData = await getRevenue(period);
          updateFn(newData);
        } catch (error) {
          console.error('Revenue verisi güncellenirken hata:', error);
        }
      }
    });

    // Container'a ekle
    container.appendChild(chartCard);

  } catch (error) {
    console.error('Revenue chart yüklenirken hata oluştu:', error);
    // Fallback göster
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-white rounded-xl p-6 shadow-sm';
    errorDiv.innerHTML = '<p class="text-red-500">Revenue chart yüklenemedi.</p>';
    container.appendChild(errorDiv);
  }
}

/**
 * Orders Summary chart'ı yükler ve render eder
 * Bar chart ile sipariş özetlerini gösterir
 * Period switcher ile monthly/weekly/today arasında geçiş yapar
 * 
 * @param {HTMLElement} container - Chart'ın ekleneceği container
 */
async function loadOrdersSummaryChart(container) {
  try {
    // İlk veriyi al (monthly)
    const initialData = await getOrdersSummary('monthly');

    // Chart card oluştur
    const { element: chartCard } = createChartCard({
      title: 'Sipariş Özeti',
      chartType: 'bar',
      data: initialData,
      periods: ['Aylık', 'Haftalık', 'Bugün'],
      onPeriodChange: async (period, updateFn) => {
        // Period değiştiğinde yeni veriyi al ve chart'ı güncelle
        try {
          const newData = await getOrdersSummary(period);
          updateFn(newData);
        } catch (error) {
          console.error('Orders Summary verisi güncellenirken hata:', error);
        }
      }
    });

    // Container'a ekle
    container.appendChild(chartCard);

  } catch (error) {
    console.error('Orders Summary chart yüklenirken hata oluştu:', error);
    // Fallback göster
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-white rounded-xl p-6 shadow-sm';
    errorDiv.innerHTML = '<p class="text-red-500">Orders Summary chart yüklenemedi.</p>';
    container.appendChild(errorDiv);
  }
}

/**
 * Order List tablosunu yükler ve render eder
 * Sipariş listesini tablo formatında gösterir
 * Arama, sıralama ve pagination özellikleri içerir
 * 
 * @param {HTMLElement} container - Tablonun ekleneceği container
 */
async function loadOrderList(container) {
  try {
    // API'den sipariş verilerini al
    const allOrders = await getOrders();

    // State management
    let filteredOrders = [...allOrders];
    let currentPage = 1;
    const itemsPerPage = 6;
    let sortState = null; // { column: 'id', direction: 'asc' }
    let searchQuery = '';

    // Table wrapper card
    const tableCard = document.createElement('div');
    tableCard.className = 'bg-white rounded-xl p-6 shadow-sm';

    // Table ve pagination container'ları
    const tableContainer = document.createElement('div');
    const paginationContainer = document.createElement('div');

    // Table columns tanımı
    const columns = [
      {
        key: 'no',
        label: 'No',
        sortable: true
      },
      {
        key: 'id',
        label: 'ID',
        sortable: true
      },
      {
        key: 'date',
        label: 'Date',
        sortable: true
      },
      {
        key: 'customerName',
        label: 'Customer Name',
        sortable: true
      },
      {
        key: 'location',
        label: 'Location',
        sortable: false
      },
      {
        key: 'amount',
        label: 'Amount',
        sortable: true,
        render: (value) => {
          return `$${value.toFixed(2)}`;
        }
      },
      {
        key: 'status',
        label: 'Status Order',
        sortable: true,
        render: (value) => {
          // Status Badge component kullan
          return createStatusBadge(value);
        }
      },
      {
        key: 'action',
        label: 'İşlem',
        sortable: false,
        render: () => {
          // Action button
          const button = document.createElement('button');
          button.className = 'text-gray-400 hover:text-gray-600 transition-colors';
          button.setAttribute('aria-label', 'İşlemler');
          button.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          `;
          return button;
        }
      }
    ];

    // Filtreleme ve sıralama fonksiyonu
    const applyFiltersAndRender = () => {
      // 1. Arama filtresi
      filteredOrders = allOrders.filter(order => {
        if (!searchQuery) return true;
        
        const searchableText = `${order.customerName} ${order.id}`.toLowerCase();
        return searchableText.includes(searchQuery);
      });

      // 2. Sıralama
      if (sortState) {
        filteredOrders.sort((a, b) => {
          let aVal = a[sortState.column];
          let bVal = b[sortState.column];

          // Özel sıralama kuralları
          if (sortState.column === 'amount') {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
          } else if (sortState.column === 'date') {
            aVal = new Date(aVal).getTime();
            bVal = new Date(bVal).getTime();
          } else if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
          }

          if (sortState.direction === 'asc') {
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
          } else {
            return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
          }
        });
      }

      // 3. Pagination
      const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

      // 4. Table render
      tableContainer.innerHTML = '';
      const table = createDataTable({
        columns,
        data: paginatedOrders,
        sortState,
        onSort: (columnKey) => {
          // Sıralama toggle
          if (sortState && sortState.column === columnKey) {
            // Aynı kolona tıklandı, direction değiştir
            sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
          } else {
            // Yeni kolon, ascending başlat
            sortState = { column: columnKey, direction: 'asc' };
          }
          applyFiltersAndRender();
        },
        onRowClick: (row) => {
          console.log('Sipariş tıklandı:', row);
          // Gelecekte modal veya detay sayfası açılabilir
        }
      });
      tableContainer.appendChild(table);

      // 5. Pagination render
      paginationContainer.innerHTML = '';
      if (totalPages > 1) {
        const pagination = createPagination({
          currentPage,
          totalPages,
          totalItems: filteredOrders.length,
          itemsPerPage,
          onPageChange: (page) => {
            currentPage = page;
            applyFiltersAndRender();
            // Scroll to top of table
            tableCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
        paginationContainer.appendChild(pagination);
      }
    };

    // Header section (title + search)
    const headerSection = document.createElement('div');
    headerSection.className = 'flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6';

    // Table title
    const title = document.createElement('h3');
    title.className = 'text-lg font-semibold text-gray-900';
    title.textContent = 'Sipariş Listesi';

    // Search input - basit input elementi
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'relative w-full md:w-64';
    
    const searchIcon = document.createElement('div');
    searchIcon.className = 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400';
    searchIcon.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Müşteri adı veya ID ile ara...';
    searchInput.className = 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all';
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase();
      currentPage = 1; // Reset to first page
      applyFiltersAndRender();
    });
    
    searchWrapper.appendChild(searchIcon);
    searchWrapper.appendChild(searchInput);

    headerSection.appendChild(title);
    headerSection.appendChild(searchWrapper);
    tableCard.appendChild(headerSection);

    // İlk render
    tableCard.appendChild(tableContainer);
    tableCard.appendChild(paginationContainer);
    applyFiltersAndRender();

    container.appendChild(tableCard);

  } catch (error) {
    console.error('Order List yüklenirken hata oluştu:', error);
    // Fallback göster
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-white rounded-xl p-6 shadow-sm';
    errorDiv.innerHTML = '<p class="text-red-500">Sipariş listesi yüklenemedi.</p>';
    container.appendChild(errorDiv);
  }
}
