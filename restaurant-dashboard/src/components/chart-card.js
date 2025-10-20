/**
 * Chart Card Component
 * Grafikleri kart içinde gösterir
 * 
 * @param {Object} config - Konfigürasyon objesi
 * @param {string} config.title - Kart başlığı
 * @param {string} config.chartType - Grafik tipi ('line' | 'bar')
 * @param {Object} config.data - Başlangıç chart verisi
 * @param {Array} config.periods - Period seçenekleri ['Monthly', 'Weekly', 'Today']
 * @param {Function} config.onPeriodChange - Period değişim callback
 * @returns {Object} { element: HTMLElement, updateChart: Function }
 */
export function createChartCard(config) {
  const {
    title = '',
    chartType = 'line',
    data = null,
    periods = ['Monthly', 'Weekly', 'Today'],
    onPeriodChange = null
  } = config;

  let activePeriod = periods[0].toLowerCase();
  let chartInstance = null;

  // Card container - proper padding ve spacing
  const card = document.createElement('div');
  card.className = 'bg-background-card rounded-lg p-6 shadow-card relative';
  card.style.zIndex = '1';

  // Header section
  const header = document.createElement('div');
  header.className = 'flex items-center justify-between mb-6';

  // Title
  const titleEl = document.createElement('h3');
  titleEl.className = 'text-lg font-semibold text-gray-900';
  titleEl.textContent = title;

  // Period switcher
  const periodSwitcher = document.createElement('div');
  periodSwitcher.className = 'flex gap-2';

  periods.forEach(period => {
    const button = document.createElement('button');
    const periodKey = period.toLowerCase();
    const isActive = periodKey === activePeriod;

    button.className = isActive
      ? 'px-4 py-2 text-sm font-medium text-white bg-black rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2'
      : 'px-4 py-2 text-sm font-medium text-text-secondary bg-gray-100 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2';

    button.textContent = period;
    button.setAttribute('data-period', periodKey);
    button.setAttribute('type', 'button');
    button.setAttribute('tabindex', '0');
    button.setAttribute('aria-label', `${period} periyodunu göster`);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');

    // Period change handler fonksiyonu
    const handlePeriodChange = () => {
      if (periodKey === activePeriod) return;

      // Update active state
      activePeriod = periodKey;

      // Update button styles ve ARIA attributes
      periodSwitcher.querySelectorAll('button').forEach(btn => {
        const btnPeriod = btn.getAttribute('data-period');
        if (btnPeriod === periodKey) {
          btn.className = 'px-4 py-2 text-sm font-medium text-white bg-black rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2';
          btn.setAttribute('aria-pressed', 'true');
        } else {
          btn.className = 'px-4 py-2 text-sm font-medium text-text-secondary bg-gray-100 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2';
          btn.setAttribute('aria-pressed', 'false');
        }
      });

      // Callback çağır
      if (onPeriodChange && typeof onPeriodChange === 'function') {
        onPeriodChange(periodKey, updateChart);
      }
    };

    // Click event
    button.addEventListener('click', handlePeriodChange);

    // Keyboard event - Enter ve Space tuşları
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePeriodChange();
      }
    });

    periodSwitcher.appendChild(button);
  });

  header.appendChild(titleEl);
  header.appendChild(periodSwitcher);

  // Chart container
  const chartContainer = document.createElement('div');
  chartContainer.className = 'relative';
  chartContainer.style.height = '300px';

  // Canvas
  const canvas = document.createElement('canvas');
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', `${title} grafiği - ${chartType === 'line' ? 'Çizgi grafik' : 'Bar grafik'} gösterimi`);
  chartContainer.appendChild(canvas);

  // Assemble card
  card.appendChild(header);
  card.appendChild(chartContainer);

  /**
   * Chart güncelleme fonksiyonu
   * Period değişiminde veya yeni veri geldiğinde chart'ı günceller
   * Smooth transition ile veri değişimini gösterir
   * 
   * @param {Object} newData - Chart.js formatında yeni veri
   */
  function updateChart(newData) {
    if (!chartInstance) {
      // İlk chart oluşturma - Chart.js import edilmeli
      if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
      }

      chartInstance = new Chart(canvas, {
        type: chartType,
        data: newData,
        options: getChartOptions(chartType)
      });
    } else {
      // Mevcut chart'ı güncelle
      // Labels'ı güncelle
      if (newData.labels) {
        chartInstance.data.labels = newData.labels;
      }

      // Datasets'i güncelle
      if (newData.datasets) {
        // Mevcut dataset sayısı ile yeni dataset sayısı farklıysa
        if (chartInstance.data.datasets.length !== newData.datasets.length) {
          chartInstance.data.datasets = newData.datasets;
        } else {
          // Dataset sayısı aynıysa sadece data'yı güncelle (daha smooth transition)
          newData.datasets.forEach((dataset, index) => {
            if (chartInstance.data.datasets[index]) {
              // Data'yı güncelle
              chartInstance.data.datasets[index].data = dataset.data;

              // Diğer özellikleri de güncelle (renk değişimi vs.)
              Object.keys(dataset).forEach(key => {
                if (key !== 'data') {
                  chartInstance.data.datasets[index][key] = dataset[key];
                }
              });
            }
          });
        }
      }

      // Chart'ı smooth transition ile güncelle
      // 'active' modu animasyonlu güncelleme sağlar
      chartInstance.update('active');
    }
  }

  // İlk veri varsa chart'ı oluştur
  if (data) {
    // DOM'a eklendikten sonra chart oluştur
    setTimeout(() => updateChart(data), 0);
  }

  return {
    element: card,
    updateChart
  };
}

/**
 * Chart.js global defaults ayarları
 * Revenue line chart için gerekli global konfigürasyonlar
 */
function setupChartDefaults() {
  if (typeof Chart !== 'undefined' && !Chart.defaults._customized) {
    // Font ayarları
    Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    Chart.defaults.font.size = 12;

    // Renk ayarları
    Chart.defaults.color = '#6B7280';

    // Legend ayarları
    Chart.defaults.plugins.legend.display = true;
    Chart.defaults.plugins.legend.position = 'top';

    // Bir kere ayarlandı işareti
    Chart.defaults._customized = true;
  }
}

/**
 * Revenue line chart için özel konfigürasyon
 * @returns {Object} Chart.js line chart options
 */
function getRevenueLineChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          },
          color: '#6B7280'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 13,
          weight: '600'
        },
        bodyFont: {
          size: 12
        },
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y >= 1000
                ? (context.parsed.y / 1000).toFixed(1) + 'k'
                : context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value >= 1000 ? (value / 1000) + 'k' : value;
          },
          font: {
            size: 11,
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          },
          color: '#6B7280'
        },
        grid: {
          color: '#F3F4F6',
          drawBorder: false
        }
      },
      x: {
        ticks: {
          font: {
            size: 11,
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          },
          color: '#6B7280'
        },
        grid: {
          display: false,
          drawBorder: false
        }
      }
    },
    elements: {
      line: {
        tension: 0.4, // Smooth curve tension
        borderWidth: 2
      },
      point: {
        radius: 3,
        hoverRadius: 5,
        hitRadius: 10
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };
}

/**
 * Orders Summary bar chart için özel konfigürasyon
 * @returns {Object} Chart.js bar chart options
 */
function getOrdersSummaryBarChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Bar chart için legend gizli
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 13,
          weight: '600'
        },
        bodyFont: {
          size: 12
        },
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y >= 1000
                ? (context.parsed.y / 1000).toFixed(1) + 'k'
                : context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value >= 1000 ? (value / 1000) + 'k' : value;
          },
          font: {
            size: 11,
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          },
          color: '#6B7280'
        },
        grid: {
          color: '#F3F4F6',
          drawBorder: false
        }
      },
      x: {
        ticks: {
          font: {
            size: 11,
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          },
          color: '#6B7280'
        },
        grid: {
          display: false,
          drawBorder: false
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };
}

/**
 * Chart.js options helper
 * @param {string} type - Chart tipi
 * @returns {Object} Chart options
 */
function getChartOptions(type) {
  // Global defaults'u ayarla
  setupChartDefaults();

  // Chart tipine göre özel konfigürasyon döndür
  if (type === 'line') {
    return getRevenueLineChartOptions();
  } else if (type === 'bar') {
    return getOrdersSummaryBarChartOptions();
  }

  // Fallback - genel konfigürasyon
  return {
    responsive: true,
    maintainAspectRatio: false
  };
}
