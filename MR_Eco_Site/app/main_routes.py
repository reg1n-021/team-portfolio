from flask import Blueprint, request, redirect, url_for, flash, render_template, session, jsonify
from models import db, User, Products, Categories
from werkzeug.security import generate_password_hash, check_password_hash
import re

bp = Blueprint('main', __name__)

# ============================================================
# ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
# ============================================================

def validate_phone(phone):
    """Проверка номера телефона (только цифры и +)"""
    cleaned = re.sub(r'[^\d+]', '', phone)
    return len(cleaned) >= 10 and len(cleaned) <= 15

def validate_password(password):
    """Проверка пароля (минимум 6 символов)"""
    return len(password) >= 6

# ============================================================
# ОСНОВНЫЕ МАРШРУТЫ
# ============================================================

@bp.route('/')
@bp.route('/index')
def index():
    """Главная страница"""
    return render_template('index.html')

@bp.route('/catalog')
def catalog():
    """Каталог товаров"""
    products = Products.query.all()
    categories = Categories.query.all()
    return render_template('catalog.html', products=products, categories=categories)

@bp.route('/product/<int:product_id>')
def product(product_id):
    """Страница товара"""
    product = Products.query.get_or_404(product_id)
    return render_template('product.html', product=product)

@bp.route('/admin')
def admin():
    """Админ-панель"""
    if not session.get('user_id'):
        flash('Сначала войдите в систему', 'error')
        return redirect(url_for('main.login'))
    
    user = User.query.get(session['user_id'])
    if not user or not user.is_admin:
        flash('Доступ запрещён', 'error')
        return redirect(url_for('main.index'))
    
    return render_template('admin.html')

@bp.route('/cart')
def cart():
    """Корзина"""
    return render_template('cart.html')

@bp.route('/checkout')
def checkout():
    """Оформление заказа"""
    if not session.get('user_id'):
        flash('Сначала войдите в систему', 'error')
        return redirect(url_for('main.login'))
    return render_template('checkout.html')

# ============================================================
# АВТОРИЗАЦИЯ И РЕГИСТРАЦИЯ
# ============================================================

@bp.route('/login', methods=['GET', 'POST'])
def login():
    """Вход в систему"""
    if request.method == 'POST':
        login = request.form.get('login', '').strip()
        password = request.form.get('password', '').strip()
        
        if not login or not password:
            flash('Заполните все поля', 'error')
            return render_template('login.html')
        
        user = User.query.filter_by(login=login).first()
        
        if user and check_password_hash(user.password_hash, password):
            session['user_id'] = user.id
            session['user_login'] = user.login
            session['is_admin'] = user.is_admin
            flash(f'Добро пожаловать, {user.login}!', 'success')
            return redirect(url_for('main.index'))
        else:
            flash('Неверный логин или пароль', 'error')
    
    return render_template('login.html')

@bp.route('/register', methods=['GET', 'POST'])
def register():
    """Регистрация нового пользователя"""
    if request.method == 'POST':
        login = request.form.get('login', '').strip()
        phone = request.form.get('phone', '').strip()
        password = request.form.get('password', '')
        confirm = request.form.get('confirm', '')
        
        # ========== ПРОВЕРКИ ==========
        
        # 1. Пустые поля
        if not all([login, phone, password, confirm]):
            flash('Заполните все обязательные поля', 'error')
            return render_template('register.html')
        
        # 2. Логин (минимум 3 символа)
        if len(login) < 3:
            flash('Логин должен содержать минимум 3 символа', 'error')
            return render_template('register.html')
        
        # 3. Проверка телефона
        if not validate_phone(phone):
            flash('Введите корректный номер телефона (10-15 цифр)', 'error')
            return render_template('register.html')
        
        # 4. Проверка пароля
        if not validate_password(password):
            flash('Пароль должен содержать минимум 6 символов', 'error')
            return render_template('register.html')
        
        # 5. Совпадение паролей
        if password != confirm:
            flash('Пароли не совпадают', 'error')
            return render_template('register.html')
        
        # 6. Проверка на существующий логин
        if User.query.filter_by(login=login).first():
            flash('Логин уже занят', 'error')
            return render_template('register.html')
        
        # 7. Проверка на существующий телефон
        if User.query.filter_by(phone=phone).first():
            flash('Этот номер телефона уже зарегистрирован', 'error')
            return render_template('register.html')
        
        # ========== СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ ==========
        try:
            hashed = generate_password_hash(password, method='pbkdf2:sha256')
            user = User(
                login=login,
                password_hash=hashed,
                phone=phone,
                is_admin=False
            )
            db.session.add(user)
            db.session.commit()
            
            flash('Регистрация успешна! Теперь войдите в систему', 'success')
            return redirect(url_for('main.login'))
            
        except Exception as e:
            db.session.rollback()
            print(f"Ошибка регистрации: {e}")
            flash('Произошла ошибка при регистрации. Попробуйте ещё раз.', 'error')
            return render_template('register.html')
    
    return render_template('register.html')

@bp.route('/profile')
def profile():
    """Профиль пользователя"""
    user = None
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
    return render_template('profile.html', user=user)

@bp.route('/logout')
def logout():
    """Выход из системы"""
    session.clear()
    flash('Вы вышли из системы', 'info')
    return redirect(url_for('main.index'))

@bp.route('/order_success')
def order_success():
    """Страница успешного заказа"""
    return render_template('order_success.html')

# ============================================================
# API ДЛЯ МОБИЛЬНОГО МЕНЮ И КОРЗИНЫ
# ============================================================

@bp.route('/api/check-auth')
def check_auth():
    """Проверка авторизации (для мобильного меню)"""
    return jsonify({
        'is_authenticated': 'user_id' in session,
        'user_login': session.get('user_login'),
        'is_admin': session.get('is_admin', False)
    })

@bp.route('/api/cart-count')
def cart_count():
    """Получение количества товаров в корзине (из localStorage не работает на сервере)"""
    return jsonify({'count': 0})  # Корзина хранится в localStorage

# ============================================================
# ДОПОЛНИТЕЛЬНЫЕ МАРШРУТЫ
# ============================================================

@bp.route('/check-db')
def check_db():
    """Проверка подключения к БД"""
    try:
        count = Products.query.count()
        products = Products.query.all()
        product_list = "<br>".join([f"{p.id}: {p.name} - {p.price}₽" for p in products])
        return f"✅ БД работает! Всего товаров: {count}<br><br>Список товаров:<br>{product_list}"
    except Exception as e:
        return f"❌ Ошибка БД: {str(e)}"

@bp.route('/api/categories')
def get_categories():
    """Получение категорий для фильтрации"""
    categories = Categories.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'slug': c.slug} for c in categories])