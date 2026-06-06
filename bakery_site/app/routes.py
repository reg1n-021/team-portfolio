from flask import render_template
from app import app

@app.route('/')
def index():
    products = [
        {'id': 1, 'name': 'Багет французский', 'price': 120, 'weight': '300г'},
        {'id': 2, 'name': 'Круассан с шоколадом', 'price': 85, 'weight': '110г'},
        {'id': 3, 'name': 'Бородинский хлеб', 'price': 95, 'weight': '500г'},
        {'id': 4, 'name': 'Синнабон', 'price': 150, 'weight': '180г'},
    ]
    return render_template('index.html', products=products)

@app.route('/catalog')
def catalog():
    products = [
        {'id': 1, 'name': 'Багет французский', 'price': 120, 'weight': '300г'},
        {'id': 2, 'name': 'Круассан с шоколадом', 'price': 85, 'weight': '110г'},
        {'id': 3, 'name': 'Бородинский хлеб', 'price': 95, 'weight': '500г'},
        {'id': 4, 'name': 'Синнабон', 'price': 150, 'weight': '180г'},
    ]
    return render_template('catalog.html', products=products)

@app.route('/reviews')
def reviews():
    reviews_list = [
        {'name': 'Мадина Зулаева', 'text': 'Оформила подписку на хлебную неделю и теперь каждое утро балую себя свежим хлебом!', 'stars': 5},
        {'name': 'Габриэль Савчи', 'text': 'В этой пекарне самые восхитительные булочки! Каждое утро сэндвич из ароматного хлеба', 'stars': 5},
        {'name': 'Сулейман Керимов', 'text': 'Если вы не пробовали местный Синнабон, то упустили многое! Обязательно попробуйте!', 'stars': 5},
    ]
    return render_template('reviews.html', reviews=reviews_list)

@app.route('/order')
def order():
    return render_template('order.html')

@app.route('/product/<int:product_id>')
def product(product_id):
    products = {
        1: {'name': 'Багет французский', 'price': 120, 'weight': '300г'},
        2: {'name': 'Круассан с шоколадом', 'price': 85, 'weight': '110г'},
        3: {'name': 'Бородинский хлеб', 'price': 95, 'weight': '500г'},
        4: {'name': 'Синнабон', 'price': 150, 'weight': '180г'},
    }
    return render_template('product.html', product=products.get(product_id))