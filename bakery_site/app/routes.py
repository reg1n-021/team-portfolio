from app import app_var
from flask import redirect, render_template

@app_var.route("/")
@app_var.route("/index")
def index():
    return render_template('index.html')