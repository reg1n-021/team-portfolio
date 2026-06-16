// ============================================================
// cart.js — ТОЛЬКО КОРЗИНА
// ============================================================

var cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    var count = 0;
    for (var i = 0; i < cart.length; i++) {
        count += cart[i].quantity;
    }
    var el = document.getElementById('cartCount');
    if (el) el.textContent = count;
}

function openCartModal() {
    var modal = document.getElementById('cartModal');
    var body = document.getElementById('cartModalBody');
    if (!modal || !body) return;
    
    if (cart.length === 0) {
        body.innerHTML = '<p style="text-align:center;padding:20px;">🛒 Корзина пуста</p>';
    } else {
        var html = '', total = 0;
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            var itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += '<div class="cart-item">' +
                '<span style="flex:2;"><strong>' + item.name + '</strong></span>' +
                '<span>' + item.price + ' ₽</span>' +
                '<span>× ' + item.quantity + '</span>' +
                '<span style="color:#2e7d32;font-weight:700;">' + itemTotal + ' ₽</span>' +
                '<button onclick="removeFromCart(' + item.id + ')" style="background:#ff4444;color:white;border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:14px;">✕</button>' +
            '</div>';
        }
        html += '<div class="cart-total">💰 Итого: ' + total + ' ₽</div>';
        body.innerHTML = html;
    }
    modal.style.display = 'flex';
}

function removeFromCart(id) {
    var newCart = [];
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id !== id) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    openCartModal();
}

function addToCart(id, name, price) {
    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity += 1;
            found = true;
            break;
        }
    }
    if (!found) {
        cart.push({ id: id, name: name, price: price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    var n = document.createElement('div');
    n.textContent = name + ' добавлен в корзину!';
    n.style.cssText = 'position:fixed; bottom:20px; right:20px; background:#2e7d32; color:white; padding:12px 24px; border-radius:40px; z-index:2000; font-weight:600; box-shadow:0 5px 15px rgba(0,0,0,0.2);';
    document.body.appendChild(n);
    setTimeout(function() { n.remove(); }, 3000);
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    document.getElementById('cartClose').onclick = function() {
        document.getElementById('cartModal').style.display = 'none';
    };
    
    window.onclick = function(e) {
        if (e.target === document.getElementById('cartModal')) {
            document.getElementById('cartModal').style.display = 'none';
        }
    };
    
    document.getElementById('cartIconMain').onclick = function(e) {
        e.preventDefault();
        openCartModal();
    };
    
    document.getElementById('checkoutBtnModal').onclick = function() {
        if (cart.length === 0) {
            alert('Корзина пуста');
        } else {
            alert('✅ Заказ оформлен! Спасибо за покупку!');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            document.getElementById('cartModal').style.display = 'none';
        }
    };
});

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.openCartModal = openCartModal;