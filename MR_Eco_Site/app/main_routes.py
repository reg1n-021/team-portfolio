from flask import Blueprint, render_template

bp = Blueprint('main', __name__)

@bp.route('/')
@bp.route('/index')
def index():
    return render_template('index.html')

@bp.route('/catalog')
def catalog():
    return render_template('catalog.html')

@bp.route('/product/<int:id>')
def product(id):
    return render_template('product.html')

@bp.route('/profile')
def profile():
    return render_template('profile.html')