from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, Optional

class OrderForm(FlaskForm):
    name = StringField('Имя',  validators=[DataRequired(message='Обязательное поле')])
    phone = StringField('Номер',  validators=[DataRequired(message='Обязательное поле')])
    product = StringField('Товар',  validators=[DataRequired(message='Обязательное поле')])
    comment = StringField('Коментарий',  validators=[Optional()])
    submit = SubmitField('Sign in')