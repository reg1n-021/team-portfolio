from app import app_var
from flask import redirect, render_template, request
from models import load_products, load_reviews

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