from flask import Blueprint, request, redirect, url_for, flash, render_template, session
from models import db, User, Products
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint('cart', __name__)

@bp.route('/cart')
def cart():
    # корзина в сессии — не в БД
    cart = session.get('cart', [])
    # можно подгрузить товары из БД, но тут упрощённо
    return render_template('cart.html', cart=cart)

@bp.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    cart = session.get('cart', [])
    cart.append(product_id)
    session['cart'] = cart
    flash('Товар добавлен в корзину')
    return redirect(request.referrer or url_for('main.catalog'))

@bp.route('/remove_from_cart/<int:product_id>')
def remove_from_cart(product_id):
    cart = session.get('cart', [])
    if product_id in cart:
        cart.remove(product_id)
        session['cart'] = cart
        flash('Товар удалён из корзины')
    return redirect(url_for('main.cart'))

@bp.route('/clear_cart')
def clear_cart():
    session.pop('cart', None)
    flash('Корзина очищена')
    return redirect(url_for('main.cart'))