from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from models import db, User, Products, Order
from app import admin_bp

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/')
def admin_panel():
    if not session.get('is_admin'):
        flash('Доступ запрещён')
        return redirect(url_for('main.index'))
    
    users = User.query.all()
    orders = Order.query.all()
    products = Products.query.all()
    return render_template('admin.html', users=users, orders=orders, products=products)

@admin_bp.route('/user/<int:user_id>/toggle')
def toggle_user(user_id):
    if not session.get('is_admin'):
        flash('Нет прав')
        return redirect(url_for('main.index'))
    
    user = User.query.get_or_404(user_id)
    user.is_admin = not user.is_admin
    db.session.commit()
    flash(f'Права пользователя {user.login} обновлены')
    return redirect(url_for('admin.admin_panel'))

@admin_bp.route('/order/<int:order_id>/delete')
def delete_order(order_id):
    if not session.get('is_admin'):
        flash('Нет прав')
        return redirect(url_for('main.index'))
    
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    flash(f'Заказ #{order.id} удалён')
    return redirect(url_for('admin.admin_panel'))

@admin_bp.route('/product/<int:product_id>/delete')
def delete_product(product_id):
    if not session.get('is_admin'):
        flash('Нет прав')
        return redirect(url_for('main.index'))
    
    product = Products.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    flash(f'Товар "{product.name}" удалён')
    return redirect(url_for('admin.admin_panel'))

@admin_bp.route('/admin/product/add', methods=['GET', 'POST'])
def admin_add_product():
    if not session.get('is_admin'):
        flash('Нет прав')
        return redirect(url_for('main.index'))
    
    if request.method == 'POST':
        name = request.form.get('name')
        price = request.form.get('price')
        description = request.form.get('description')
        image_url = request.form.get('image_url')
        category_id = request.form.get('category_id')
        
        product = Products(
            name=name,
            price=price,
            description=description,
            image_url=image_url,
            category_id=category_id
        )
        db.session.add(product)
        db.session.commit()
        flash('Товар добавлен')
        return redirect(url_for('main.admin_panel'))
    
    return render_template('admin_add_product.html')