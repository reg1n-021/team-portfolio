from app import app_var
from flask import redirect, render_template, request
from app.models import load_products, load_reviews
from app.forms import Orderform

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
        return 'Заказ принят!'  
    return render_template('order.html', form=form)