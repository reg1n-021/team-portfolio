from flask import Blueprint, render_template, request, abort
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

@bp.route('/check-db')
def check_db():
    try:
        count = Products.query.count()
        products = Products.query.all()
        product_list = "<br>".join([f"{p.id}: {p.name} - {p.price}₽" for p in products])
        return f"✅ БД работает! Всего товаров: {count}<br><br>Список товаров:<br>{product_list}"
    except Exception as e:
        return f"❌ Ошибка БД: {str(e)}"