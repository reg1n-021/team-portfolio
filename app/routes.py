from app import app_var
from flask import redirect, render_template

@app_var.route("/")
@app_var.route("/index")
def index():
    projects = {'name_of_project' : 'Сайт для пекарни'}, {'name_of_project' : 'Сайт для авиокомпании'}
    return render_template('index.html', title = 'Home',projects=projects)
    