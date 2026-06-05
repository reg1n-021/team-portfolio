from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from dotenv import load_dotenv
from config import Config


db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app_var = Flask(__name__,
                template_folder='app/templates',
                static_folder='app/static')
    
    app_var.config.from_object(Config)
    
    db.init_app(app_var)
    migrate.init_app(app_var, db)
    
    from . import routes
    app_var.register_blueprint(routes.bp)
    
    return app_var

