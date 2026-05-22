from flask import Flask, render_template
import json
import os

app = Flask(__name__)

def get_products():
    path = os.path.join('products.json')
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def index():
    products = get_products()
    return render_template('index.html', products=products[:3])

@app.route('/catalog')
def catalog():
    products = get_products()
    return render_template('catalog.html', products=products)

if __name__ == '__main__':
    app.run(debug=True)