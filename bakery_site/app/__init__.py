from flask import Flask
from config import Config
from flask_wtf.csrf import CSRFProtect

app_var = Flask(__name__)
app_var.config.from_object(Config)

csrf = CSRFProtect()
csrf.init_app(app_var)

from app import routes