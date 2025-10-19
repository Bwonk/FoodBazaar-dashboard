// Products View - Restaurant Dashboard
// Ürün yönetimi sayfası

import {
    getCategories,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
} from '../api/api.adapter.js';
import { createCategorySection } from '../components/category-section.js';
import { createNewProductModal } from '../components/new-product-modal.js';
import { createProductDrawer } from '../components/product-drawer.js';
import { showToast } from '../components/toast.js';

let categories = [];
let allProducts = [];
let filteredProducts = [];
let selectedCategoryId = null;
let searchQuery = '';

/**
 * Products view'ını render eder
 * @param {HTMLElement} container - Render edilecek container
 */
export async function renderProducts(container) {
    container.innerHTML = '';
    container.className = '';

    // Verileri yükle
    await loadData();

    // Ana container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'max-w-7xl mx-auto w-full';

    // Header
    const header = createHeader();
    mainContainer.appendChild(header);

    // Filter bar
    const filterBar = createFilterBar();
    mainContainer.appendChild(filterBar);

    // Products container
    const productsContainer = document.createElement('div');
    productsContainer.id = 'products-container';
    productsContainer.className = 'mt-6';

    renderProductsList(productsContainer);

    mainContainer.appendChild(productsContainer);
    container.appendChild(mainContainer);
}

/**
 * Verileri yükler
 */
async function loadData() {
    categories = await getCategories();
    allProducts = await getProductsByCategory();
    applyFilters();
}

/**
 * Filtreleri uygular
 */
function applyFilters() {
    filteredProducts = [...allProducts];

    // Kategori filtresi
    if (selectedCategoryId !== null) {
        filteredProducts = filteredProducts.filter(p => p.categoryId === selectedCategoryId);
    }

    // Arama filtresi
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(query) ||
            (p.description && p.description.toLowerCase().includes(query))
        );
    }
}

/**
 * Header oluşturur
 */
function createHeader() {
    const header = document.createElement('div');
    header.className = 'mb-8';

    const title = document.createElement('h1');
    title.className = 'text-3xl font-bold text-gray-900';
    title.textContent = 'Ürün Yönetimi';

    const subtitle = document.createElement('p');
    subtitle.className = 'text-gray-500 mt-1';
    subtitle.textContent = 'Menü ürünlerinizi yönetin';

    header.appendChild(title);
    header.appendChild(subtitle);

    return header;
}

/**
 * Filter bar oluşturur
 */
function createFilterBar() {
    const filterBar = document.createElement('div');
    filterBar.className = 'bg-white rounded-xl p-6 shadow-sm space-y-4';

    const filterRow = document.createElement('div');
    filterRow.className = 'flex flex-col md:flex-row gap-4';

    // Arama kutusu
    const searchContainer = document.createElement('div');
    searchContainer.className = 'flex-1';

    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'relative';

    const searchIcon = document.createElement('div');
    searchIcon.className = 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400';
    searchIcon.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  `;

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Ürün adı veya açıklama ile ara...';
    searchInput.className = 'w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all';
    searchInput.value = searchQuery;
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        applyFilters();
        refreshProductsList();
    });

    searchWrapper.appendChild(searchIcon);
    searchWrapper.appendChild(searchInput);
    searchContainer.appendChild(searchWrapper);

    // Kategori filtresi
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'md:w-64';

    const categorySelect = document.createElement('select');
    categorySelect.className = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all';

    const allOption = document.createElement('option');
    allOption.value = '';
    allOption.textContent = 'Tüm Kategoriler';
    categorySelect.appendChild(allOption);

    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = `${cat.icon} ${cat.name}`;
        if (cat.id === selectedCategoryId) {
            option.selected = true;
        }
        categorySelect.appendChild(option);
    });

    categorySelect.addEventListener('change', (e) => {
        selectedCategoryId = e.target.value ? parseInt(e.target.value) : null;
        applyFilters();
        refreshProductsList();
    });

    categoryContainer.appendChild(categorySelect);

    // Stats
    const statsContainer = document.createElement('div');
    statsContainer.className = 'flex items-center gap-2 text-sm text-gray-600';
    statsContainer.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    <span id="product-count">${filteredProducts.length} ürün</span>
  `;

    filterRow.appendChild(searchContainer);
    filterRow.appendChild(categoryContainer);
    filterRow.appendChild(statsContainer);

    filterBar.appendChild(filterRow);

    // Yeni ürün ekle butonu
    const addButton = document.createElement('button');
    addButton.className = 'w-full md:w-auto group relative flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden';
    addButton.setAttribute('aria-label', 'Yeni ürün ekle');
    addButton.setAttribute('type', 'button');
    
    // Animasyonlu arka plan efekti
    const bgEffect = document.createElement('div');
    bgEffect.className = 'absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300';
    addButton.appendChild(bgEffect);
    
    // İçerik
    const content = document.createElement('div');
    content.className = 'relative flex items-center gap-2';
    content.innerHTML = `
      <svg class="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      <span class="font-semibold">Yeni Ürün Ekle</span>
    `;
    addButton.appendChild(content);
    
    addButton.addEventListener('click', handleNewProduct);

    filterBar.appendChild(addButton);

    return filterBar;
}

/**
 * Ürün listesini render eder
 */
function renderProductsList(container) {
    container.innerHTML = '';

    if (filteredProducts.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'text-center py-20';
        
        // Animasyonlu icon container
        const iconContainer = document.createElement('div');
        iconContainer.className = 'relative inline-block mb-6';
        
        const mainIcon = document.createElement('div');
        mainIcon.className = 'inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 animate-bounce';
        mainIcon.style.animationDuration = '3s';
        mainIcon.innerHTML = `
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        `;
        
        iconContainer.appendChild(mainIcon);
        
        const title = document.createElement('h3');
        title.className = 'text-xl font-semibold text-gray-900 mb-2';
        title.textContent = searchQuery || selectedCategoryId ? 'Ürün bulunamadı' : 'Henüz ürün yok';
        
        const description = document.createElement('p');
        description.className = 'text-gray-500 mb-6';
        description.textContent = searchQuery || selectedCategoryId 
          ? 'Arama kriterlerinize uygun ürün yok' 
          : 'İlk ürününüzü ekleyerek başlayın';
        
        emptyState.appendChild(iconContainer);
        emptyState.appendChild(title);
        emptyState.appendChild(description);
        
        container.appendChild(emptyState);
        return;
    }

    // Kategorilere göre grupla
    const productsByCategory = {};

    filteredProducts.forEach(product => {
        if (!productsByCategory[product.categoryId]) {
            productsByCategory[product.categoryId] = [];
        }
        productsByCategory[product.categoryId].push(product);
    });

    // Her kategori için section oluştur
    categories.forEach(category => {
        const categoryProducts = productsByCategory[category.id] || [];

        if (categoryProducts.length > 0) {
            const section = createCategorySection(category, categoryProducts, handleEditProduct, handleDeleteProduct);
            container.appendChild(section);
        }
    });
}

/**
 * Ürün listesini yeniler
 */
function refreshProductsList() {
    const container = document.getElementById('products-container');
    if (container) {
        renderProductsList(container);

        // Stats güncelle
        const countEl = document.getElementById('product-count');
        if (countEl) {
            countEl.textContent = `${filteredProducts.length} ürün`;
        }
    }
}

/**
 * Yeni ürün ekleme handler'ı
 */
function handleNewProduct() {
    const modal = createNewProductModal(
        categories,
        async (productData, createAnother) => {
            try {
                const newProduct = await createProduct(productData);
                allProducts.unshift(newProduct);
                applyFilters();

                if (!createAnother) {
                    refreshProductsList();
                    showToast('Ürün başarıyla eklendi', 'success');
                }
            } catch (error) {
                console.error('Ürün ekleme hatası:', error);
                showToast('Ürün eklenirken bir hata oluştu', 'error');
            }
        },
        () => {
            // Modal kapatıldı
        }
    );

    document.body.appendChild(modal);
}

/**
 * Ürün düzenleme handler'ı
 */
function handleEditProduct(product) {
    const drawer = createProductDrawer(
        product,
        categories,
        async (productId, updates) => {
            try {
                const updatedProduct = await updateProduct(productId, updates);

                // Listeyi güncelle
                const index = allProducts.findIndex(p => p.id === productId);
                if (index !== -1) {
                    allProducts[index] = updatedProduct;
                }

                applyFilters();
                refreshProductsList();
                showToast('Ürün başarıyla güncellendi', 'success');
            } catch (error) {
                console.error('Ürün güncelleme hatası:', error);
                showToast('Ürün güncellenirken bir hata oluştu', 'error');
            }
        },
        () => {
            // Drawer kapatıldı
        }
    );

    document.body.appendChild(drawer);
}

/**
 * Ürün silme handler'ı
 */
function handleDeleteProduct(product) {
    // Onay dialogu göster
    const confirmed = confirm(`"${product.name}" ürününü silmek istediğinizden emin misiniz?`);

    if (!confirmed) {
        return;
    }

    try {
        deleteProduct(product.id);

        // Listeyi güncelle
        const index = allProducts.findIndex(p => p.id === product.id);
        if (index !== -1) {
            allProducts.splice(index, 1);
        }

        applyFilters();
        refreshProductsList();
        showToast('Ürün başarıyla silindi', 'success');
    } catch (error) {
        console.error('Ürün silme hatası:', error);
        showToast('Ürün silinirken bir hata oluştu', 'error');
    }
}


