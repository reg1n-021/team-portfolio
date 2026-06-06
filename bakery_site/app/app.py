from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/catalog')
def catalog():
    return render_template('catalog.html')

@app.route('/reviews')
def reviews_page():
    reviews = [
        {'name': 'Мадина Зулаева', 'text': 'Багет французский просто невероятный! Хрустящая корочка, мягкий мякиш. Свежесть с утра — лучшее начало дня. Спасибо вам большое!', 'stars': 5},
        {'name': 'Габриэль Савчи', 'text': 'Круассан с шоколадом — это что-то восхитительное. Нежный, слоёный, начинки в самый раз. Давно не пробовал таких вкусных круассанов. Браво!', 'stars': 5},
        {'name': 'Сулейман Керимов', 'text': 'Бородинский хлеб — настоящая классика. Ароматный, с тмином, домашний вкус. Как в детстве у бабушки. Огромное уважение вашему мастерству!', 'stars': 5},
    ]
    return render_template('reviews.html', reviews=reviews)

@app.route('/order')
def order():
    return render_template('order.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)