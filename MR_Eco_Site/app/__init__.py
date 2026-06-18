from flask import Flask
from models import db
from config import Config

def create_app():
    app_var = Flask(__name__)
    app_var.config.from_object(Config)
    
    db.init_app(app_var)
    
    from app.main_routes import main_bp
    from app.admin_routes import admin_bp
    app_var.register_blueprint(main_bp)
    app_var.register_blueprint(admin_bp)
    return app_var