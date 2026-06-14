# check_users.py
from app import create_app
from models import User

app = create_app()

with app.app_context():
    users = User.query.all()
    print("Все пользователи:")
    for u in users:
        print(f"{u.id}: {u.login} (admin={u.is_admin})")
    
    print(f"\nВсего пользователей: {User.query.count()}")