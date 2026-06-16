// ============================================================
// script.js — ТОЛЬКО КАТАЛОГ, ТОВАР, ПРОФИЛЬ
// ============================================================

var productsData = [
    { id: 1, name: "iPhone 15 Pro", price: 999, icon: "📱", category: "phones", tag: "новинка" },
    { id: 2, name: "Samsung Galaxy S24", price: 849, icon: "📱", category: "phones", tag: "хит" },
    { id: 3, name: "MacBook Air M3", price: 1499, icon: "💻", category: "laptops", tag: "новинка" },
    { id: 4, name: "Samsung 55″ 4K", price: 799, icon: "📺", category: "tvs", tag: "QLED" },
    { id: 5, name: "Электрочайник Bosch", price: 65, icon: "🫖", category: "appliances", tag: "хит" },
    { id: 6, name: "Набор кастрюль Tefal", price: 145, icon: "🍳", category: "kitchen", tag: "акция" },
    { id: 7, name: "LG OLED 65″", price: 1499, icon: "📺", category: "tvs", tag: "OLED" },
    { id: 8, name: "Google Pixel 8", price: 699, icon: "📱", category: "phones", tag: null },
    { id: 9, name: "ASUS ROG Zephyrus", price: 1299, icon: "💻", category: "laptops", tag: "игровой" },
    { id: 10, name: "Блендер Philips", price: 89, icon: "🥤", category: "kitchen", tag: null }
];

var currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
var users = JSON.parse(localStorage.getItem('users')) || [];
var orders = JSON.parse(localStorage.getItem('orders')) || [];
var currentPage = 1;
var currentCategory = 'all';
var currentSearch = '';
var currentMinPrice = 0;
var currentMaxPrice = Infinity;

if (!users.find(function(u) { return u.isAdmin; })) {
    users.push({ id: 1, login: 'admin', password: 'admin123', phone: '+70000000000', isAdmin: true, registerDate: new Date().toISOString() });
    localStorage.setItem('users', JSON.stringify(users));
}

function renderCatalog() {
    var grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    var filtered = productsData.filter(function(p) {
        var matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
        var matchCategory = currentCategory === 'all' || p.category === currentCategory;
        var matchPrice = p.price >= currentMinPrice && p.price <= currentMaxPrice;
        return matchSearch && matchCategory && matchPrice;
    });
    
    var totalPages = Math.ceil(filtered.length / 6);
    var start = (currentPage - 1) * 6;
    var paginated = filtered.slice(start, start + 6);
    
    grid.innerHTML = paginated.map(function(p) {
        return '<div class="product-card" onclick="window.location.href=\'/product?id=' + p.id + '\'">' +
            '<div class="product-img">' + p.icon + '</div>' +
            '<div class="product-info">' +
            (p.tag ? '<span class="product-tag">' + p.tag + '</span>' : '') +
            '<div class="product-title">' + p.name + '</div>' +
            '<div class="product-price">$' + p.price + '</div>' +
            '<button class="add-to-cart" data-id="' + p.id + '" onclick="event.stopPropagation(); window.addToCart(' + p.id + ', \'' + p.name + '\', ' + p.price + ')">В корзину</button>' +
            '</div>' +
        '</div>';
    }).join('');
    
    var pagDiv = document.getElementById('pagination');
    if (pagDiv) {
        pagDiv.innerHTML = 
            '<button ' + (currentPage === 1 ? 'disabled' : '') + ' onclick="changePage(' + (currentPage - 1) + ')">←</button>' +
            '<span>Страница ' + currentPage + ' из ' + (totalPages || 1) + '</span>' +
            '<button ' + (currentPage === totalPages || totalPages === 0 ? 'disabled' : '') + ' onclick="changePage(' + (currentPage + 1) + ')">→</button>';
    }
}

function changePage(page) {
    currentPage = page;
    renderCatalog();
    window.scrollTo({ top: 0 });
}

document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');
    var catFilter = document.getElementById('categoryFilter');
    var minPrice = document.getElementById('minPrice');
    var maxPrice = document.getElementById('maxPrice');
    var resetBtn = document.getElementById('resetFiltersBtn');
    
    if (searchInput) searchInput.oninput = function() {
        currentSearch = this.value;
        currentPage = 1;
        renderCatalog();
    };
    
    if (catFilter) catFilter.onchange = function() {
        currentCategory = this.value;
        currentPage = 1;
        renderCatalog();
    };
    
    if (minPrice) minPrice.oninput = function() {
        currentMinPrice = parseInt(this.value) || 0;
        currentPage = 1;
        renderCatalog();
    };
    
    if (maxPrice) maxPrice.oninput = function() {
        currentMaxPrice = parseInt(this.value) || Infinity;
        currentPage = 1;
        renderCatalog();
    };
    
    if (resetBtn) resetBtn.onclick = function() {
        if (searchInput) searchInput.value = '';
        if (catFilter) catFilter.value = 'all';
        if (minPrice) minPrice.value = '';
        if (maxPrice) maxPrice.value = '';
        currentSearch = '';
        currentCategory = 'all';
        currentMinPrice = 0;
        currentMaxPrice = Infinity;
        currentPage = 1;
        renderCatalog();
    };
    
    if (document.getElementById('productsGrid')) renderCatalog();
});

window.changePage = changePage;