// ========== ТОВАРЫ ==========
let productsData = [
    { id: 1, name: "iPhone 15 Pro", price: 999, icon: "📱", category: "phones", tag: "новинка", description: "6.1″ Super Retina XDR, чип A17 Pro, 48 МП камера", specs: { "Экран": "6.1″ OLED", "Память": "256GB", "Цвет": "натуральный титан" } },
    { id: 2, name: "Samsung Galaxy S24", price: 849, icon: "📱", category: "phones", tag: "хит", description: "6.2″ Dynamic AMOLED 2X, AI-функции", specs: { "Экран": "6.2″ Dynamic AMOLED", "Память": "256GB" } },
    { id: 3, name: "MacBook Air M3", price: 1499, icon: "💻", category: "laptops", tag: "новинка", description: "13.6″ Liquid Retina, чип M3, до 18 часов работы", specs: { "Экран": "13.6″ Liquid Retina", "Память": "8GB/256GB" } },
    { id: 4, name: "Samsung 55″ 4K", price: 799, icon: "📺", category: "tvs", tag: "QLED", description: "55″ QLED 4K, процессор Neural Quantum", specs: { "Диагональ": "55″", "Разрешение": "4K" } },
    { id: 5, name: "Электрочайник Bosch", price: 65, icon: "🫖", category: "appliances", tag: "хит", description: "1.7л, скрытый нагревательный элемент", specs: { "Объем": "1.7л", "Мощность": "2200W" } },
    { id: 6, name: "Набор кастрюль Tefal", price: 145, icon: "🍳", category: "kitchen", tag: "акция", description: "6 предметов, антипригарное покрытие", specs: { "Количество": "6 шт", "Покрытие": "антипригарное" } },
    { id: 7, name: "LG OLED 65″", price: 1499, icon: "📺", category: "tvs", tag: "OLED", description: "65″ OLED evo 4K, интеллектуальный процессор", specs: { "Диагональ": "65″", "Технология": "OLED" } },
    { id: 8, name: "Google Pixel 8", price: 699, icon: "📱", category: "phones", tag: null, description: "6.2″ OLED, чип Google Tensor G3", specs: { "Экран": "6.2″ OLED", "Чип": "Tensor G3" } },
    { id: 9, name: "ASUS ROG Zephyrus", price: 1299, icon: "💻", category: "laptops", tag: "игровой", description: "16″ 240Hz, RTX 4060, 16GB RAM", specs: { "Экран": "16″ 240Hz", "Видеокарта": "RTX 4060" } },
    { id: 10, name: "Блендер Philips", price: 89, icon: "🥤", category: "kitchen", tag: null, description: "1000W, 2 скорости, измельчитель", specs: { "Мощность": "1000W", "Скорости": "2" } }
];

// ========== ПОЛЬЗОВАТЕЛИ ==========
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let currentPage = 1;
let currentCategory = 'all';
let currentSearch = '';
let currentMinPrice = 0;
let currentMaxPrice = Infinity;

// Создаём админа если нет
if (!users.find(u => u.isAdmin)) {
    users.push({ id: 1, login: 'admin', password: 'admin123', phone: '+70000000000', isAdmin: true, registerDate: new Date().toISOString() });
    localStorage.setItem('users', JSON.stringify(users));
}

function saveData() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('users', JSON.stringify(users));
    if (currentUser) localStorage.setItem('currentUser', JSON.stringify(currentUser));
    else localStorage.removeItem('currentUser');
}

function showNotification(msg, type) {
    const n = document.createElement('div');
    n.textContent = msg;
    n.style.cssText = `position:fixed; bottom:20px; right:20px; background:${type === 'success' ? '#2e7d32' : '#f57c00'}; color:white; padding:12px 24px; border-radius:40px; z-index:2000;`;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
}

function updateCartCount() {
    const count = cart.reduce((s, i) => s + i.quantity, 0);
    document.querySelectorAll('#cartCount').forEach(el => { if (el) el.textContent = count; });
}

function openCartModal() {
    const modal = document.getElementById('cartModal');
    const body = document.getElementById('cartModalBody');
    if (!modal || !body) return;
    
    if (cart.length === 0) {
        body.innerHTML = '<p>Корзина пуста</p>';
    } else {
        let html = '', total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `<div class="cart-item">
                <span style="flex:2;">${item.name}</span>
                <span style="flex:1;">$${item.price}</span>
                <span style="flex:1;"><input type="number" class="cart-qty" data-id="${item.id}" value="${item.quantity}" min="1" style="width:60px; padding:5px; border-radius:8px;"></span>
                <span style="flex:1;">$${itemTotal}</span>
                <button class="remove-item" data-id="${item.id}" style="background:#ffebee; border:none; padding:5px 12px; border-radius:20px;">✕</button>
            </div>`;
        });
        html += `<div class="cart-total"><strong>Итого: $${total}</strong></div>`;
        body.innerHTML = html;
        
        document.querySelectorAll('.cart-qty').forEach(input => {
            input.onchange = (e) => {
                const id = parseInt(input.dataset.id);
                const item = cart.find(i => i.id === id);
                if (item) { item.quantity = parseInt(e.target.value); saveData(); updateCartCount(); openCartModal(); }
            };
        });
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.onclick = () => {
                cart = cart.filter(i => i.id !== parseInt(btn.dataset.id));
                saveData(); updateCartCount(); openCartModal();
            };
        });
    }
    modal.style.display = 'flex';
}

function addToCart(productId) {
    if (!currentUser) { showNotification('Сначала войдите в аккаунт!', 'info'); window.location.href = '/login'; return; }
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(i => i.id === productId);
    if (existing) existing.quantity++;
    else cart.push({ id: product.id, name: product.name, price: product.price, icon: product.icon, category: product.category, quantity: 1 });
    saveData();
    updateCartCount();
    showNotification(`${product.name} добавлен в корзину!`, 'success');
}

function checkoutOrder() {
    if (!currentUser) { showNotification('Сначала войдите в аккаунт!', 'info'); return; }
    if (cart.length === 0) { showNotification('Корзина пуста!', 'info'); return; }
    const order = {
        id: Date.now(),
        orderNumber: 'ORD-' + Date.now(),
        userId: currentUser.id,
        userLogin: currentUser.login,
        items: cart.map(i => ({ ...i })),
        totalAmount: cart.reduce((s, i) => s + i.price * i.quantity, 0),
        status: 'new',
        createdAt: new Date().toISOString()
    };
    orders.push(order);
    cart = [];
    saveData();
    updateCartCount();
    document.getElementById('cartModal').style.display = 'none';
    showNotification(`Заказ ${order.orderNumber} оформлен! Ожидайте подтверждения.`, 'success');
}

function renderCatalog() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    let filtered = productsData.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
        const matchCategory = currentCategory === 'all' || p.category === currentCategory;
        const matchPrice = p.price >= currentMinPrice && p.price <= currentMaxPrice;
        return matchSearch && matchCategory && matchPrice;
    });
    
    const totalPages = Math.ceil(filtered.length / 6);
    const start = (currentPage - 1) * 6;
    const paginated = filtered.slice(start, start + 6);
    
    grid.innerHTML = paginated.map(p => `
        <div class="product-card" onclick="window.location.href='/product?id=${p.id}'">
            <div class="product-img">${p.icon}</div>
            <div class="product-info">
                ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
                <div class="product-title">${p.name}</div>
                <div class="product-price">$${p.price}</div>
                <button class="add-to-cart" data-id="${p.id}" onclick="event.stopPropagation(); addToCart(${p.id})">В корзину</button>
            </div>
        </div>
    `).join('');
    
    const pagDiv = document.getElementById('pagination');
    if (pagDiv) {
        pagDiv.innerHTML = `
            <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">←</button>
            <span>Страница ${currentPage} из ${totalPages || 1}</span>
            <button ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">→</button>
        `;
    }
}

function changePage(page) { currentPage = page; renderCatalog(); window.scrollTo({ top: 0 }); }

function renderProductPage() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const p = productsData.find(p => p.id === id);
    if (!p) return;
    document.getElementById('productName').textContent = p.name;
    document.getElementById('productImage').textContent = p.icon;
    document.getElementById('productPrice').textContent = `$${p.price}`;
    document.getElementById('productDescription').textContent = p.description;
    const specs = p.specs || {};
    document.getElementById('productSpecs').innerHTML = Object.entries(specs).map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('') || '<li>Нет данных</li>';
    document.getElementById('addToCartBtn').onclick = () => addToCart(p.id);
}

function renderProfile() {
    if (!currentUser) { window.location.href = '/login'; return; }
    document.getElementById('profileLogin').textContent = currentUser.login;
    document.getElementById('profilePhone').textContent = currentUser.phone;
    const regDate = currentUser.registerDate ? new Date(currentUser.registerDate) : new Date();
    document.getElementById('memberDays').textContent = Math.floor((new Date() - regDate) / (1000 * 60 * 60 * 24)) || 1;
    const userOrders = orders.filter(o => o.userId === currentUser.id);
    document.getElementById('totalOrders').textContent = userOrders.length;
    document.getElementById('totalSpent').textContent = `$${userOrders.reduce((s, o) => s + o.totalAmount, 0)}`;
    const container = document.getElementById('userOrders');
    if (container) {
        if (userOrders.length === 0) {
            container.innerHTML = `<div class="empty-orders"><i class="fas fa-shopping-bag"></i><p>У вас пока нет заказов</p><a href="/catalog" class="shop-link">Перейти в каталог →</a></div>`;
        } else {
            container.innerHTML = userOrders.map(o => `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-number">${o.orderNumber}</span>
                        <span>${new Date(o.createdAt).toLocaleDateString()}</span>
                        <span class="order-status status-${o.status}">${o.status === 'new' ? 'Новый' : o.status === 'processing' ? 'В процессе' : o.status === 'ready' ? 'Готов' : 'Отменён'}</span>
                    </div>
                    <div class="order-total">Итого: $${o.totalAmount}</div>
                </div>
            `).join('');
        }
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Закрытие модалки
    document.querySelectorAll('#cartClose').forEach(btn => {
        btn.onclick = () => document.getElementById('cartModal').style.display = 'none';
    });
    window.onclick = (e) => { if (e.target === document.getElementById('cartModal')) document.getElementById('cartModal').style.display = 'none'; };
    
    // Кнопки оформления заказа
    document.querySelectorAll('#checkoutBtnModal, #checkoutBtn').forEach(btn => {
        if (btn) btn.onclick = checkoutOrder;
    });
    
    // Кнопки выхода
    document.querySelectorAll('#logoutBtnMain, #logoutBtnCatalog, #logoutBtnProduct, #logoutBtnProfile').forEach(btn => {
        if (btn) btn.onclick = (e) => { e.preventDefault(); currentUser = null; localStorage.removeItem('currentUser'); window.location.href = '/'; };
    });
    
    // Кнопки корзины в навигации
    document.querySelectorAll('#cartIconMain, #cartIconCatalog, #cartIconProduct, #cartIconProfile, #cartIconNav').forEach(btn => {
        if (btn) btn.onclick = (e) => { e.preventDefault(); openCartModal(); };
    });
    
    // Фильтры для каталога
    const searchInput = document.getElementById('searchInput');
    const catFilter = document.getElementById('categoryFilter');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const resetBtn = document.getElementById('resetFiltersBtn');
    
    if (searchInput) searchInput.oninput = () => { currentSearch = searchInput.value; currentPage = 1; renderCatalog(); };
    if (catFilter) catFilter.onchange = () => { currentCategory = catFilter.value; currentPage = 1; renderCatalog(); };
    if (minPrice) minPrice.oninput = () => { currentMinPrice = parseInt(minPrice.value) || 0; currentPage = 1; renderCatalog(); };
    if (maxPrice) maxPrice.oninput = () => { currentMaxPrice = parseInt(maxPrice.value) || Infinity; currentPage = 1; renderCatalog(); };
    if (resetBtn) resetBtn.onclick = () => {
        if (searchInput) searchInput.value = '';
        if (catFilter) catFilter.value = 'all';
        if (minPrice) minPrice.value = '';
        if (maxPrice) maxPrice.value = '';
        currentSearch = ''; currentCategory = 'all'; currentMinPrice = 0; currentMaxPrice = Infinity; currentPage = 1;
        renderCatalog();
    };
    
    // Мобильное меню
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    if (mobileBtn && nav) mobileBtn.onclick = () => nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    
    // Рендер страниц
    if (document.getElementById('productsGrid')) renderCatalog();
    if (document.getElementById('productName')) renderProductPage();
    if (document.getElementById('profileLogin')) renderProfile();
    
    // Логин
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            const login = document.getElementById('loginLogin').value;
            const pwd = document.getElementById('loginPassword').value;
            const user = users.find(u => u.login === login && u.password === pwd);
            if (user) {
                currentUser = { ...user };
                delete currentUser.password;
                saveData();
                window.location.href = user.isAdmin ? '/admin' : '/';
            } else alert('Неверный логин или пароль');
        };
    }
    
    // Регистрация
    const regForm = document.getElementById('registerForm');
    if (regForm) {
        regForm.onsubmit = (e) => {
            e.preventDefault();
            const login = document.getElementById('regLogin').value;
            const pwd = document.getElementById('regPassword').value;
            const phone = document.getElementById('regPhone').value;
            if (users.find(u => u.login === login)) alert('Логин уже существует');
            else {
                users.push({ id: Date.now(), login, password: pwd, phone, isAdmin: false, registerDate: new Date().toISOString() });
                saveData();
                alert('Регистрация успешна! Теперь войдите.');
                window.location.href = '/login';
            }
        };
    }
});

window.addToCart = addToCart;
window.changePage = changePage;
window.openCartModal = openCartModal;
window.checkoutOrder = checkoutOrder;