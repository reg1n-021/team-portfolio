from flask import Blueprint, render_template
from models import db, User, Products

bp = Blueprint('main', __name__)

@bp.route('/')
@bp.route('/index')
def index():
    return render_template('index.html')

@bp.route('/catalog')
def catalog():
    products = Products.query.all()
    return render_template('catalog.html', products=products)

@bp.route('/admin')
def admin():
    return render_template('admin.html')

@bp.route('/cart')
def cart():
    return render_template('cart.html')

@bp.route('/chekout')
def chekout():
    return render_template('chekout.html')

@bp.route('/login')
def login():
    return render_template('login.html')

@bp.route('/order_success')
def order_success():
    return render_template('order_success.html')

@bp.route('/profile')
def profile():
    return render_template('profile.html')

@bp.route('/register')
def register():
    return render_template('register.html')

@bp.route('/product')
def product():
    return render_template('product.html')

@bp.route('/check-db')
def check_db():
    try:
        # Пытаемся создать тестового пользователя
        test_user = User(login="test", password_hash="hash", phone="123", is_admin=False)
        db.session.add(test_user)
        db.session.commit()
        
        # Считаем сколько пользователей
        count = User.query.count()
        
        return f"✅ БД работает! Создан тестовый пользователь. Всего пользователей: {count}"
    except Exception as e:
        return f"❌ Ошибка БД: {str(e)}"