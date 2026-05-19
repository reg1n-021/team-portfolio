from app import app_var
from flask import redirect, render_template, request
from app.models import load_products, load_reviews
from app.forms import Orderform
from flask import url_for

@app_var.route("/")
@app_var.route("/index")
def index():
    products = load_products()[:4]  # топ-4
    reviews = load_reviews()
    return render_template('index.html', products=products, reviews=reviews)

@app_var.route("/catalog")
def catalog():
    products = load_products()
    return render_template('catalog.html', products=products)

@app_var.route('/order')
def order():
    form = Orderform
    
    if request.method == 'GET':
        product_name = request.args.get('product')
        if product_name:
            form.product.data = product_name
    
    if form.validate_on_submit():
        order_data = {
        'name': form.name.data,
        'phone': form.phone.data,
        'product': form.product.data,
        'comment': form.comment.data
        }  
        return redirect( url_for('thanks'))
    return render_template('order.html', form=form)

@app_var.route('/product/<int:product_id>')
def product_detail(product_id):
    products = load_products()
    
    product = next((p for p in products if p['id'] == product_id), None)
    
    if not product:
        return "Товар не найден", 404
    
    return render_template('product.html', product=product)