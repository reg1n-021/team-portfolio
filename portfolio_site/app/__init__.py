from flask import Flask

app_var = Flask(__name__, static_folder='../static', static_url_path='/static')

from app import routes