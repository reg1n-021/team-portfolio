from app import create_app

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        #db.create_all()
        #print("База данных создана (или уже существует)")
        app.run(debug=True)