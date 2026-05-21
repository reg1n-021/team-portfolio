from app import app_var
from flask import redirect, render_template, request, url_for
from app.models import load_products, load_reviews, save_order
from app.forms import OrderForm


@app_var.route("/")
@app_var.route("/index")
def index():
    products = load_products()[:3]  # топ-4
    reviews = load_reviews()
    return render_template('index.html', products=products, reviews=reviews)

@app_var.route("/catalog")
def catalog():
    products = load_products()
    return render_template('catalog.html', products=products)

@app_var.route('/order', methods=['GET', 'POST'])
def order():
    form = OrderForm()
    
    if request.method == 'GET':
        product_name = request.args.get('product')
        if product_name:
            form.product.data = product_name
        else:
             form.product.data = "Не указано"
             
    if request.method == 'POST':
        print("=== ОТЛАДКА ===")
        print("Данные из формы:", request.form)
        print("Валидация прошла?", form.validate_on_submit())
        print("Ошибки валидации:", form.errors)
    
    if form.validate_on_submit():
        order_data = {
        'name': form.name.data,
        'phone': form.phone.data,
        'product': form.product.data,
        'comment': form.comment.data
        }  
        save_order(order_data)
        return redirect( url_for('thanks'))
    return render_template('order.html', form=form)

@app_var.route('/product/<int:product_id>')
def product(product_id):
    
    products = load_products()
    
    product = next((p for p in products if p['id'] == product_id), None)
    
    if not product:
        return "Товар не найден", 404
    
    return render_template('product.html', product=product)

@app_var.route('/thanks')
def thanks():
    return render_template('thanks.html')