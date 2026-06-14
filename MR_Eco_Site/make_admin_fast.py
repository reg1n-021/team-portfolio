# make_admin_fast.py
from app import create_app, db
from models import User

app = create_app()

with app.app_context():
    user = User.query.filter_by(login="Reg1n").first()
    if user:
        user.is_admin = True
        db.session.commit()
        print("✅ Пользователь 'admin' теперь администратор")
    else:
        print("❌ Пользователь с логином 'admin' не найден")