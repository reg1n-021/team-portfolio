from app import app_var
from flask import redirect, render_template

@app_var.route("/")
@app_var.route("/index")
def index():
    projects = [
    {'name_of_project' : 'Сайт для пекарни', 'link': 'http/чтото там'},
    {'name_of_project' : 'Сайт для авиокомпании', 'link': 'http/чтото там'}
    ]
    return render_template('index.html', title = 'Home',projects=projects)

@app_var.errorhandler(404)
def page_not_found(error):
    return render_template('index.html'), 404