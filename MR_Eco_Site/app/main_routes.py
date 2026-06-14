from flask import Blueprint, request, redirect, url_for, flash, render_template, session
from models import db, User, Products
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint('main', __name__)

@bp.route('/')
@bp.route('/index')
def index():
    return render_template('index.html')

@bp.route('/catalog')
def catalog():
    products = Products.query.all()
    return render_template('catalog.html', products=products)

@bp.route('/product/<int:product_id>')
def product(product_id):
    product = Products.query.get_or_404(product_id)
    return render_template('product.html', product=product)

@bp.route('/admin')
def admin():
    return render_template('admin.html')

@bp.route('/cart')
def cart():
    return render_template('cart.html')

@bp.route('/checkout')
def checkout():
    return render_template('checkout.html')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        
        user = User.query.filter_by(login=login).first()
        
        if user and check_password_hash(user.password_hash, password):
            session['user_id'] = user.id
            flash('Вы вошли', 'success')
            return redirect(url_for('main.index'))
        else:
            flash('Неверный логин или пароль', 'error')
    
    return render_template('login.html')

@bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        phone = request.form.get('phone')
        
        if User.query.filter_by(login=login).first():
            flash('Логин уже занят', 'error')
            return redirect(url_for('main.register'))
        
        hashed = generate_password_hash(password)
        user = User(login=login, password_hash=hashed, phone=phone)
        db.session.add(user)
        db.session.commit()
        
        flash('Регистрация успешна! Теперь войдите', 'success')
        return redirect(url_for('main.login'))
    
    return render_template('register.html')

@bp.route('/profile')
def profile():
    user = None
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
    return render_template('profile.html', user=user)

@bp.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('Вы вышли', 'info')
    return redirect(url_for('main.index'))

@bp.route('/order_success')
def order_success():
    return render_template('order_success.html')

@bp.route('/check-db')
def check_db():
    try:
        count = Products.query.count()
        products = Products.query.all()
        product_list = "<br>".join([f"{p.id}: {p.name} - {p.price}₽" for p in products])
        return f"✅ БД работает! Всего товаров: {count}<br><br>Список товаров:<br>{product_list}"
    except Exception as e:
        return f"❌ Ошибка БД: {str(e)}"