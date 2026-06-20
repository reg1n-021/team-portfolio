from flask import Blueprint, request, redirect, url_for, flash, render_template
from models import db, User, Products
from werkzeug.security import generate_password_hash, check_password_hash
from flask import session

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
@main_bp.route('/index')
def index():
    return render_template('index.html')

@main_bp.route('/catalog')
def catalog():
    products = Products.query.all()
    return render_template('catalog.html', products=products)

@main_bp.route('/product/<int:product_id>')
def product(product_id):
    product = Products.query.get_or_404(product_id)
    return render_template('product.html', product=product)

@main_bp.route('/admin')
def admin():
    return render_template('admin.html')

@main_bp.route('/cart')
def cart():
    return render_template('cart.html')

@main_bp.route('/checkout')
def checkout():
    return render_template('checkout.html')

@main_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        
        user = User.query.filter_by(login=login).first()
        
        if user and check_password_hash(user.password_hash, password):
            # сохраняем пользователя в сессии
            session['user_id'] = user.id
            flash('Вы вошли')
            return redirect(url_for('main.index'))
        else:
            flash('Неверный логин или пароль')
            
        if user.is_admin:
            return redirect(url_for('main.admin_panel'))  
        else:
            return redirect(url_for('main.index'))
    
    return render_template('login.html')

@main_bp.route('/order_success')
def order_success():
    return render_template('order_success.html')

@main_bp.route('/profile')
def profile():
    user_id = session.get('user_id')
    if not user_id:
        flash('Сначала войдите')
        return redirect(url_for('main.login'))
    
    user = User.query.get(user_id)
    return render_template('profile.html', user=user)

@main_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        phone = request.form.get('phone')
        
        # проверяем, нет ли такого пользователя
        if User.query.filter_by(login=login).first():
            flash('Логин уже занят')
            return redirect(url_for('main.register'))
        
        # создаём нового пользователя
        hashed = generate_password_hash(password)
        user = User(login=login, password_hash=hashed, phone=phone)
        db.session.add(user)
        db.session.commit()
        
        flash('Регистрация успешна! Теперь войдите')
        return redirect(url_for('main.login'))
    
    return render_template('register.html')

@main_bp.route('/check-db')
def check_db():
    try:
        count = Products.query.count()
        products = Products.query.all()
        product_list = "<br>".join([f"{p.id}: {p.name} - {p.price}₽" for p in products])
        return f"✅ БД работает! Всего товаров: {count}<br><br>Список товаров:<br>{product_list}"
    except Exception as e:
        return f"❌ Ошибка БД: {str(e)}"
    

@main_bp.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('Вы вышли')
    return redirect(url_for('main.index'))