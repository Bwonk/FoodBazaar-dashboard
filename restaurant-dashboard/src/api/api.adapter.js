// API Adapter Layer - Restaurant Dashboard
// Bu katman veri kaynağını soyutlar ve backend entegrasyonunu kolaylaştırır
// Backend hazır olduğunda sadece bu dosyayı değiştirerek gerçek API'ye bağlanabilirsiniz

import * as mockData from './api.mock.js';

/**
 * KPI verilerini getirir
 * @returns {Promise<Object>} KPI metrikleri
 */
export async function getKpis() {
  // Mock data kullanımı
  return mockData.kpis;
  
  // Backend hazır olduğunda aşağıdaki gibi kullanın:
  // const response = await fetch(`${API_BASE_URL}/kpis`);
  // return response.json();
}

/**
 * Gelir grafiği verilerini getirir
 * @param {string} period - Zaman periyodu: 'aylık', 'haftalık', 'bugün'
 * @returns {Promise<Object>} Chart.js formatında grafik verisi
 */
export async function getRevenue(period = 'aylık') {
  // Türkçe period'u İngilizce'ye çevir
  const periodMap = {
    'aylık': 'monthly',
    'haftalık': 'weekly',
    'bugün': 'today'
  };
  
  const mappedPeriod = periodMap[period.toLowerCase()] || 'monthly';
  
  // Mock data kullanımı
  return mockData.revenue[mappedPeriod];
  
  // Backend hazır olduğunda aşağıdaki gibi kullanın:
  // const response = await fetch(`${API_BASE_URL}/revenue?period=${mappedPeriod}`);
  // return response.json();
}

/**
 * Sipariş özeti grafiği verilerini getirir
 * @param {string} period - Zaman periyodu: 'aylık', 'haftalık', 'bugün'
 * @returns {Promise<Object>} Chart.js formatında grafik verisi
 */
export async function getOrdersSummary(period = 'aylık') {
  // Türkçe period'u İngilizce'ye çevir
  const periodMap = {
    'aylık': 'monthly',
    'haftalık': 'weekly',
    'bugün': 'today'
  };
  
  const mappedPeriod = periodMap[period.toLowerCase()] || 'monthly';
  
  // Mock data kullanımı
  return mockData.ordersSummary[mappedPeriod];
  
  // Backend hazır olduğunda aşağıdaki gibi kullanın:
  // const response = await fetch(`${API_BASE_URL}/orders-summary?period=${mappedPeriod}`);
  // return response.json();
}

/**
 * Sipariş listesini getirir
 * @returns {Promise<Array>} Sipariş kayıtları dizisi
 */
export async function getOrders() {
  // Mock data kullanımı
  return mockData.orders;
  
  // Backend hazır olduğunda aşağıdaki gibi kullanın:
  // const response = await fetch(`${API_BASE_URL}/orders`);
  // return response.json();
}

/**
 * Tüm kategorileri getirir
 * @returns {Promise<Array>} Kategori listesi
 */
export async function getCategories() {
  // Mock data kullanımı
  return mockData.categories;
  
  // Backend hazır olduğunda:
  // const response = await fetch(`${API_BASE_URL}/categories`);
  // return response.json();
}

/**
 * Belirli bir kategoriye ait ürünleri getirir
 * @param {number|null} categoryId - Kategori ID (null ise tüm ürünler)
 * @param {string} searchQuery - Arama sorgusu (opsiyonel)
 * @returns {Promise<Array>} Ürün listesi
 */
export async function getProductsByCategory(categoryId = null, searchQuery = '') {
  // Mock data kullanımı
  let filteredProducts = [...mockData.products];
  
  // Kategori filtresi
  if (categoryId !== null) {
    filteredProducts = filteredProducts.filter(p => p.categoryId === categoryId);
  }
  
  // Arama filtresi
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      (p.description && p.description.toLowerCase().includes(query))
    );
  }
  
  return filteredProducts;
  
  // Backend hazır olduğunda:
  // const params = new URLSearchParams();
  // if (categoryId) params.append('categoryId', categoryId);
  // if (searchQuery) params.append('q', searchQuery);
  // const response = await fetch(`${API_BASE_URL}/products?${params}`);
  // return response.json();
}

/**
 * Yeni ürün oluşturur
 * @param {Object} productData - Ürün bilgileri
 * @returns {Promise<Object>} Oluşturulan ürün
 */
export async function createProduct(productData) {
  // Mock data kullanımı
  const newProduct = {
    id: mockData.getNextProductId(),
    name: productData.name,
    description: productData.description || '',
    price: parseFloat(productData.price),
    currency: productData.currency || 'TRY',
    image: productData.image || '',
    categoryId: parseInt(productData.categoryId),
    active: productData.active !== undefined ? productData.active : true
  };
  
  mockData.products.unshift(newProduct); // Listenin başına ekle
  return newProduct;
  
  // Backend hazır olduğunda:
  // const response = await fetch(`${API_BASE_URL}/products`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(productData)
  // });
  // return response.json();
}

/**
 * Ürün bilgilerini günceller
 * @param {number} productId - Ürün ID
 * @param {Object} updates - Güncellenecek alanlar
 * @returns {Promise<Object>} Güncellenmiş ürün
 */
export async function updateProduct(productId, updates) {
  // Mock data kullanımı
  const productIndex = mockData.products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    throw new Error('Ürün bulunamadı');
  }
  
  // Güncelleme yap
  mockData.products[productIndex] = {
    ...mockData.products[productIndex],
    ...updates,
    id: productId // ID değişmemeli
  };
  
  return mockData.products[productIndex];
  
  // Backend hazır olduğunda:
  // const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(updates)
  // });
  // return response.json();
}

/**
 * Ürünü siler
 * @param {number} productId - Ürün ID
 * @returns {Promise<boolean>} Başarı durumu
 */
export async function deleteProduct(productId) {
  // Mock data kullanımı
  const productIndex = mockData.products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    throw new Error('Ürün bulunamadı');
  }
  
  mockData.products.splice(productIndex, 1);
  return true;
  
  // Backend hazır olduğunda:
  // const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
  //   method: 'DELETE'
  // });
  // return response.ok;
}

// Backend entegrasyonu için örnek yapılandırma:
// const API_BASE_URL = 'https://api.restaurant.com';
// 
// Gerçek API kullanımı için yukarıdaki fonksiyonlardaki yorum satırlarını açın
// ve mock data satırlarını kaldırın
