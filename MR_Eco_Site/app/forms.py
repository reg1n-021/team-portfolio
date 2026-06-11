from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, EqualTo, Regexp

class RegistrationForm(FlaskForm):
    login = StringField('Логин', validators=[
        DataRequired(message='Обязательное поле'),
        Length(min=3, max=80, message='От 3 до 80 символов')
    ])
    password = PasswordField('Пароль', validators=[
        DataRequired(message='Обязательное поле'),
        Length(min=6, message='Минимум 6 символов')
    ])
    confirm = PasswordField('Подтвердите пароль', validators=[
        DataRequired(),
        EqualTo('password', message='Пароли не совпадают')
    ])
    phone = StringField('Телефон', validators=[
        DataRequired(message='Обязательное поле'),
        Regexp(r'^\+?[0-9]{10,15}$', message='Введите корректный номер телефона')
    ])
    submit = SubmitField('Зарегистрироваться')

class LoginForm(FlaskForm):
    login = StringField('Логин', validators=[DataRequired()])
    password = PasswordField('Пароль', validators=[DataRequired()])
    submit = SubmitField('Войти')