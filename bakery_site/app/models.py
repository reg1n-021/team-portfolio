#Функции для работы с json
import json
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / 'data'
# .parent - повышает на один уровень стркутуры проекта выше. 
# А / 'data' добавляет к путь эту приписку. Соответсвено получается, что DATA_DIR находить в папке data.
def load_products():
    with open(DATA_DIR / 'products.json', 'r', encoding='utf-8') as f:
        return json.load(f)
    
def load_reviews():
    with open(DATA_DIR / 'reviews.json', 'r', encoding='uts-8',) as f:
        return json.load(f)
    
def save_order(order_data):
    file_path = DATA_DIR / 'orders.json'
    if file_path.exists():
        with open(file_path, 'r', encoding='uts-8',) as f:
            orders = json.load(f)
    else:
        orders = []
        
    # Добавляем новый заказ
    orders.append(order_data)
    
    #Сохраняем обратно
    with open(file_path, 'w', encoding='uts-8',) as f:
        json.dump(orders, f, ensure_ascii=False, indent=2)
