// ТОВАРЫ С ПЕРЕВОДАМИ
const productsData = [
    { id: 1, name: { ru: "iPhone 15 Pro", en: "iPhone 15 Pro", kz: "iPhone 15 Pro" }, price: { ru: 99990, en: 1100, kz: 99990 }, icon: "📱", category: "phones", tag: { ru: "новинка", en: "new", kz: "жаңа" } },
    { id: 2, name: { ru: "Samsung Galaxy S24", en: "Samsung Galaxy S24", kz: "Samsung Galaxy S24" }, price: { ru: 84990, en: 950, kz: 84990 }, icon: "📱", category: "phones", tag: { ru: "хит", en: "hit", kz: "хит" } },
    { id: 3, name: { ru: "Google Pixel 8", en: "Google Pixel 8", kz: "Google Pixel 8" }, price: { ru: 69990, en: 780, kz: 69990 }, icon: "📱", category: "phones", tag: null },
    { id: 4, name: { ru: "MacBook Air M3", en: "MacBook Air M3", kz: "MacBook Air M3" }, price: { ru: 149990, en: 1700, kz: 149990 }, icon: "💻", category: "laptops", tag: { ru: "новинка", en: "new", kz: "жаңа" } },
    { id: 5, name: { ru: "ASUS ROG Zephyrus", en: "ASUS ROG Zephyrus", kz: "ASUS ROG Zephyrus" }, price: { ru: 129990, en: 1450, kz: 129990 }, icon: "💻", category: "laptops", tag: { ru: "игровой", en: "gaming", kz: "ойын" } },
    { id: 6, name: { ru: "Lenovo ThinkPad", en: "Lenovo ThinkPad", kz: "Lenovo ThinkPad" }, price: { ru: 89990, en: 1000, kz: 89990 }, icon: "💻", category: "laptops", tag: { ru: "офисный", en: "office", kz: "кеңсе" } },
    { id: 7, name: { ru: "Samsung 55\" 4K", en: "Samsung 55\" 4K", kz: "Samsung 55\" 4K" }, price: { ru: 79990, en: 890, kz: 79990 }, icon: "📺", category: "tvs", tag: { ru: "QLED", en: "QLED", kz: "QLED" } },
    { id: 8, name: { ru: "LG OLED 65\"", en: "LG OLED 65\"", kz: "LG OLED 65\"" }, price: { ru: 149990, en: 1700, kz: 149990 }, icon: "📺", category: "tvs", tag: { ru: "OLED", en: "OLED", kz: "OLED" } },
    { id: 9, name: { ru: "Xiaomi TV A2 43\"", en: "Xiaomi TV A2 43\"", kz: "Xiaomi TV A2 43\"" }, price: { ru: 39990, en: 450, kz: 39990 }, icon: "📺", category: "tvs", tag: { ru: "бюджетный", en: "budget", kz: "бюджеттік" } },
    { id: 10, name: { ru: "Электрочайник Bosch", en: "Bosch Kettle", kz: "Bosch шәугім" }, price: { ru: 5490, en: 65, kz: 5490 }, icon: "🫖", category: "appliances", tag: { ru: "хит", en: "hit", kz: "хит" } },
    { id: 11, name: { ru: "Набор кастрюль Tefal", en: "Tefal Pots Set", kz: "Tefal кастрюльдер" }, price: { ru: 12990, en: 145, kz: 12990 }, icon: "🍳", category: "kitchen", tag: { ru: "акция", en: "sale", kz: "акция" } },
    { id: 12, name: { ru: "Блендер Philips", en: "Philips Blender", kz: "Philips блендер" }, price: { ru: 8990, en: 100, kz: 8990 }, icon: "🥤", category: "kitchen", tag: null },
    { id: 13, name: { ru: "Мультиварка Redmond", en: "Redmond Multicooker", kz: "Redmond мультипісіргіш" }, price: { ru: 15990, en: 180, kz: 15990 }, icon: "🍲", category: "kitchen", tag: { ru: "хит", en: "hit", kz: "хит" } },
    { id: 14, name: { ru: "Кофеварка De'Longhi", en: "De'Longhi Coffee", kz: "De'Longhi кофеқайнатқыш" }, price: { ru: 24990, en: 280, kz: 24990 }, icon: "☕", category: "appliances", tag: { ru: "премиум", en: "premium", kz: "премиум" } },
    { id: 15, name: { ru: "Эко-бутылка Bamboo", en: "Bamboo Bottle", kz: "Бамбук бөтелке" }, price: { ru: 2490, en: 30, kz: 2490 }, icon: "🚰", category: "eco", tag: { ru: "эко", en: "eco", kz: "эко" } },
    { id: 16, name: { ru: "Смарт-лампа Xiaomi", en: "Xiaomi Smart Lamp", kz: "Xiaomi Smart шам" }, price: { ru: 3490, en: 40, kz: 3490 }, icon: "💡", category: "eco", tag: { ru: "умный дом", en: "smart home", kz: "ақылды үй" } }
];

let currentLang = "ru";
let cart = [];

const productsGrid = document.getElementById("productsGrid");
const cartCountSpan = document.getElementById("cartCount");
const cartIcon = document.getElementById("cartIcon");
const cartModal = document.getElementById("cartModal");
const cartClose = document.getElementById("cartClose");
const cartModalBody = document.getElementById("cartModalBody");
const langBtns = document.querySelectorAll(".lang-btn");
const mobileBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.querySelector(".nav");
const shopNowBtn = document.getElementById("shopNowBtn");
const categoryCards = document.querySelectorAll(".category-card");
const checkoutBtn = document.getElementById("checkoutBtn");
const infoPanel = document.getElementById("infoPanel");
const infoCard = document.getElementById("infoCard");

// ПЕРЕВОДЫ ВСЕХ ЭЛЕМЕНТОВ
const translations = {
    ru: {
        brand: "MR Eco", nav_home: "Главная", nav_shop: "Товары", nav_deals: "Акции", nav_about: "О нас",
        hero_title: "Техника, которая <span class='highlight'>не вредит природе</span>",
        hero_desc: "Ноутбуки, телефоны, телевизоры, чайники и кухонные принадлежности. Доставка за 1 день.",
        categories_title: "Категории", cat_phones: "Смартфоны", cat_laptops: "Ноутбуки", cat_tvs: "Телевизоры",
        cat_kitchen: "Кухня", cat_appliances: "Техника", cat_eco: "Эко",
        products_title: "Хиты продаж", add_to_cart: "В корзину",
        footer_slogan: "техника с заботой о планете",
        cart_title: "Корзина", cart_empty: "Корзина пуста", checkout: "Оформить заказ", total: "Итого"
    },
    en: {
        brand: "MR Eco", nav_home: "Home", nav_shop: "Shop", nav_deals: "Deals", nav_about: "About",
        hero_title: "Tech that <span class='highlight'>doesn't harm nature</span>",
        hero_desc: "Laptops, phones, TVs, kettles & kitchenware. Next-day delivery.",
        categories_title: "Categories", cat_phones: "Phones", cat_laptops: "Laptops", cat_tvs: "TVs",
        cat_kitchen: "Kitchen", cat_appliances: "Appliances", cat_eco: "Eco",
        products_title: "Bestsellers", add_to_cart: "Add to cart",
        footer_slogan: "tech that cares for the planet",
        cart_title: "Cart", cart_empty: "Cart is empty", checkout: "Checkout", total: "Total"
    },
    kz: {
        brand: "MR Eco", nav_home: "Басты", nav_shop: "Тауарлар", nav_deals: "Жеңілдіктер", nav_about: "Біз туралы",
        hero_title: "Табиғатқа <span class='highlight'>зиян келтірмейтін</span> техника",
        hero_desc: "Ноутбуктер, телефондар, теледидарлар, шәугімдер және ас үй жабдықтары. 1 күнде жеткізу.",
        categories_title: "Санаттар", cat_phones: "Смартфондар", cat_laptops: "Ноутбуктер", cat_tvs: "Теледидарлар",
        cat_kitchen: "Ас үй", cat_appliances: "Техника", cat_eco: "Эко",
        products_title: "Үздік сату", add_to_cart: "Себетке",
        footer_slogan: "планетаға қамқорлық жасайтын техника",
        cart_title: "Себет", cart_empty: "Себет бос", checkout: "Тапсырыс беру", total: "Барлығы"
    }
};

// КОНТЕНТ ДЛЯ ИНФО ПАНЕЛИ (АКЦИИ, О НАС)
const infoContent = {
    ru: {
        about: { title: "О MR Eco", text: "MR Eco — маркетплейс новой формации. Продаём технику с заботой об экологии.", extra: "1500+ довольных клиентов" },
        deals: { title: "Акции", text: "• iPhone 15 Pro — скидка 10%\n• Бесплатная доставка от 10 000₸\n• Кэшбэк 10% на первую покупку", extra: "До конца месяца!" },
        learn: { title: "Почему мы", text: "✅ Гарантия на технику\n✅ Экологичная упаковка\n✅ Быстрая доставка", extra: "Присоединяйся!" }
    },
    en: {
        about: { title: "About MR Eco", text: "MR Eco — a new generation marketplace. Selling tech with eco-care.", extra: "1500+ happy customers" },
        deals: { title: "Deals", text: "• iPhone 15 Pro — 10% off\n• Free shipping over $120\n• 10% cashback on first purchase", extra: "Until end of month!" },
        learn: { title: "Why us", text: "✅ Warranty on tech\n✅ Eco packaging\n✅ Fast delivery", extra: "Join us!" }
    },
    kz: {
        about: { title: "MR Eco туралы", text: "MR Eco — жаңа буын маркетплейсі. Экологияны ойлайтын техника.", extra: "1500+ риза клиент" },
        deals: { title: "Жеңілдіктер", text: "• iPhone 15 Pro — 10% жеңілдік\n• 10 000₸-ден тегін жеткізу\n• Бірінші сатып алуға 10% кэшбэк", extra: "Ай соңына дейін!" },
        learn: { title: "Неліктен біз", text: "✅ Кепілдік\n✅ Эко орау\n✅ Жылдам жеткізу", extra: "Қосыл!" }
    }
};

function showInfoPanel(type) {
    const content = infoContent[currentLang][type];
    infoCard.innerHTML = `<h3>${content.title}</h3><p>${content.text.replace(/\n/g, '<br>')}</p><div class="highlight-text">✨ ${content.extra}</div>`;
    infoPanel.style.display = "block";
    infoPanel.scrollIntoView({ behavior: "smooth" });
}

// ПРИМЕНЕНИЕ ЯЗЫКА КО ВСЕМУ САЙТУ
function applyLanguage() {
    const t = translations[currentLang];
    document.getElementById("brandName").innerText = t.brand;
    document.getElementById("navHome").innerText = t.nav_home;
    document.getElementById("navShop").innerText = t.nav_shop;
    document.getElementById("navDeals").innerText = t.nav_deals;
    document.getElementById("navAbout").innerText = t.nav_about;
    document.getElementById("heroTitle").innerHTML = t.hero_title;
    document.getElementById("heroDesc").innerText = t.hero_desc;
    document.getElementById("categoriesTitle").innerText = t.categories_title;
    document.getElementById("catPhones").innerText = t.cat_phones;
    document.getElementById("catLaptops").innerText = t.cat_laptops;
    document.getElementById("catTvs").innerText = t.cat_tvs;
    document.getElementById("catKitchen").innerText = t.cat_kitchen;
    document.getElementById("catAppliances").innerText = t.cat_appliances;
    document.getElementById("catEco").innerText = t.cat_eco;
    document.getElementById("productsTitle").innerText = t.products_title;
    document.getElementById("footerSlogan").innerText = t.footer_slogan;
    document.getElementById("cartTitle").innerText = t.cart_title;
    document.getElementById("cartEmpty").innerText = t.cart_empty;
    document.getElementById("checkoutBtn").innerText = t.checkout;
    
    renderProducts();
    
    langBtns.forEach(btn => {
        if (btn.dataset.lang === currentLang) btn.classList.add("active");
        else btn.classList.remove("active");
    });
}

function renderProducts(filterCategory = null) {
    let filtered = filterCategory ? productsData.filter(p => p.category === filterCategory) : productsData;
    productsGrid.innerHTML = "";
    filtered.forEach(product => {
        const productName = product.name[currentLang];
        const productPrice = product.price[currentLang];
        const priceUnit = currentLang === 'en' ? '$' : '₸';
        const tagText = product.tag ? product.tag[currentLang] : null;
        const tagHtml = tagText ? `<span style="background:#f57c00;color:white;padding:2px 10px;border-radius:20px;font-size:0.7rem;display:inline-block;margin-bottom:8px;">${tagText}</span>` : "";
        productsGrid.innerHTML += `
            <div class="product-card">
                <div class="product-img">${product.icon}</div>
                <div class="product-info">
                    ${tagHtml}
                    <div class="product-title">${productName}</div>
                    <div class="product-price">${productPrice.toLocaleString()} ${priceUnit}</div>
                    <button class="add-to-cart" data-id="${product.id}">${translations[currentLang].add_to_cart}</button>
                </div>
            </div>
        `;
    });
    document.querySelectorAll(".add-to-cart").forEach(btn => btn.addEventListener("click", (e) => addToCart(parseInt(btn.dataset.id))));
}

function addToCart(id) { cart.push(id); updateCartUI(); }
function updateCartUI() { cartCountSpan.innerText = cart.length; }

function openCartModal() {
    const t = translations[currentLang];
    const priceUnit = currentLang === 'en' ? '$' : '₸';
    if (cart.length === 0) {
        cartModalBody.innerHTML = `<p style='text-align:center;padding:30px;'>${t.cart_empty}</p>`;
    } else {
        let itemsHtml = "", total = 0;
        cart.forEach(id => {
            const product = productsData.find(p => p.id === id);
            if (product) {
                const productName = product.name[currentLang];
                const productPrice = product.price[currentLang];
                itemsHtml += `<div class="cart-item"><span>${productName}</span><span>${productPrice.toLocaleString()} ${priceUnit}</span><button class="remove-item" data-id="${id}">✕</button></div>`;
                total += productPrice;
            }
        });
        itemsHtml += `<div class="cart-total">${t.total}: ${total.toLocaleString()} ${priceUnit}</div>`;
        cartModalBody.innerHTML = itemsHtml;
        document.querySelectorAll(".remove-item").forEach(btn => btn.addEventListener("click", (e) => { const id = parseInt(btn.dataset.id); const idx = cart.indexOf(id); if (idx !== -1) cart.splice(idx, 1); updateCartUI(); openCartModal(); }));
    }
    cartModal.style.display = "flex";
}

// СОБЫТИЯ
shopNowBtn.onclick = () => { infoPanel.style.display = "none"; document.getElementById("productsSection").scrollIntoView({ behavior: "smooth" }); };
cartIcon.onclick = () => { infoPanel.style.display = "none"; openCartModal(); };
cartClose.onclick = () => cartModal.style.display = "none";
window.onclick = (e) => { if (e.target === cartModal) cartModal.style.display = "none"; };
checkoutBtn.onclick = () => { if (cart.length === 0) showInfoPanel("learn"); else { cart = []; updateCartUI(); cartModal.style.display = "none"; showInfoPanel("about"); } };
document.getElementById("navHome").onclick = () => { window.scrollTo({ top: 0, behavior: "smooth" }); infoPanel.style.display = "none"; };
document.getElementById("navShop").onclick = () => { infoPanel.style.display = "none"; document.getElementById("productsSection").scrollIntoView({ behavior: "smooth" }); };
document.getElementById("navDeals").onclick = () => showInfoPanel("deals");
document.getElementById("navAbout").onclick = () => showInfoPanel("about");

categoryCards.forEach(card => card.onclick = () => { const cat = card.dataset.category; if (cat) { infoPanel.style.display = "none"; renderProducts(cat); document.getElementById("productsSection").scrollIntoView({ behavior: "smooth" }); } });

mobileBtn.onclick = () => navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
window.onresize = () => { if (window.innerWidth > 750) navMenu.style.display = "flex"; };

langBtns.forEach(btn => btn.onclick = () => { currentLang = btn.dataset.lang; applyLanguage(); if (infoPanel.style.display === "block") { const activeType = infoCard.innerHTML.includes("О MR Eco") || infoCard.innerHTML.includes("About") ? "about" : infoCard.innerHTML.includes("Акции") ? "deals" : "learn"; showInfoPanel(activeType); } });

renderProducts();
applyLanguage();
updateCartUI();