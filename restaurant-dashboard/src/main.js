import './styles.css';
import { renderDashboard } from './views/dashboard.js';
import { renderProducts } from './views/products.js';

// Ana uygulama başlangıç noktası
console.log('Restaurant Dashboard başlatıldı');

// Basit routing sistemi
let currentView = 'dashboard';

const views = {
  dashboard: renderDashboard,
  products: renderProducts
};

/**
 * View'ı değiştirir
 * @param {string} viewName - Gösterilecek view adı
 */
function navigateTo(viewName) {
  const appContainer = document.querySelector('#app');
  if (!appContainer) {
    console.error('App container bulunamadı');
    return;
  }
  
  if (views[viewName]) {
    currentView = viewName;
    // URL hash'i güncelle (sayfa yenileme olmadan)
    window.location.hash = viewName;
    views[viewName](appContainer);
    updateNavigation();
  } else {
    console.error(`View bulunamadı: ${viewName}`);
  }
}

/**
 * URL hash'den view adını alır
 * @returns {string} View adı
 */
function getViewFromHash() {
  const hash = window.location.hash.slice(1); // # işaretini kaldır
  return hash && views[hash] ? hash : 'dashboard';
}

/**
 * Navigation butonlarını günceller
 */
function updateNavigation() {
  // Tüm nav butonlarından active class'ını kaldır
  document.querySelectorAll('.nav-icon').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Aktif view'a göre ilgili butonu işaretle
  const navButtons = document.querySelectorAll('.nav-icon');
  if (currentView === 'dashboard' && navButtons[0]) {
    navButtons[0].classList.add('active');
  } else if (currentView === 'products' && navButtons[3]) {
    navButtons[3].classList.add('active');
  }
}

/**
 * Navigation event listener'larını ekler
 */
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-icon');
  
  // Ana sayfa / Dashboard
  if (navButtons[0]) {
    navButtons[0].addEventListener('click', () => navigateTo('dashboard'));
  }
  
  // Dashboard (ikinci buton)
  if (navButtons[1]) {
    navButtons[1].addEventListener('click', () => navigateTo('dashboard'));
  }
  
  // Orders (üçüncü buton) - henüz yok
  if (navButtons[2]) {
    navButtons[2].addEventListener('click', () => {
      console.log('Orders view henüz hazır değil');
    });
  }
  
  // Menu / Products (dördüncü buton)
  if (navButtons[3]) {
    navButtons[3].addEventListener('click', () => navigateTo('products'));
  }
}

// Hash değişikliklerini dinle (geri/ileri butonları için)
window.addEventListener('hashchange', () => {
  const viewName = getViewFromHash();
  const appContainer = document.querySelector('#app');
  if (appContainer && views[viewName]) {
    currentView = viewName;
    views[viewName](appContainer);
    updateNavigation();
  }
});

// Uygulamayı başlat
const appContainer = document.querySelector('#app');
if (appContainer) {
  setupNavigation();
  // URL hash'den başlangıç view'ını al
  const initialView = getViewFromHash();
  navigateTo(initialView);
} else {
  console.error('App container bulunamadı');
}
