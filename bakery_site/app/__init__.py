from flask import Flask

app_var = Flask(__name__,  template_folder='../templates', static_folder='../static')

from app import routes