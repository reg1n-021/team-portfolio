// ========== АВТОРИЗАЦИЯ (отдельные страницы) ==========

// Форматирование телефона
function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length === 0) {
        input.value = '';
        return;
    }
    
    if (value.length <= 10) {
        if (value.startsWith('7') || value.startsWith('8')) {
            value = value.substring(1);
        }
        let formatted = '+7 ';
        if (value.length > 0) formatted += '(' + value.substring(0, 3);
        if (value.length > 3) formatted += ') ' + value.substring(3, 6);
        if (value.length > 6) formatted += '-' + value.substring(6, 8);
        if (value.length > 8) formatted += '-' + value.substring(8, 10);
        input.value = formatted;
    }
}

// Валидация телефона
function validatePhone(phone) {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    const digits = cleaned.replace(/[^0-9]/g, '');
    return digits.length === 11 || digits.length === 10;
}

// Сила пароля
function checkPasswordStrength(password) {
    let strength = 0;
    let message = '';
    
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const bar = document.querySelector('#passwordStrength .strength-bar');
    const textSpan = document.querySelector('#passwordStrength span');
    
    if (!bar) return;
    
    if (password.length === 0) {
        bar.className = 'strength-bar';
        if (textSpan) textSpan.innerHTML = 'Надёжность пароля:';
        return;
    }
    
    if (strength <= 2) {
        bar.className = 'strength-bar weak';
        message = 'Слабый пароль 😟';
    } else if (strength <= 4) {
        bar.className = 'strength-bar medium';
        message = 'Средний пароль 🙂';
    } else {
        bar.className = 'strength-bar strong';
        message = 'Сильный пароль! 💪';
    }
    
    if (textSpan) textSpan.innerHTML = `Надёжность пароля: ${message}`;
}

// Проверка логина
let loginCheckTimeout;
function checkLoginAvailability(login) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loginField = document.getElementById('regLogin');
    const errorSpan = document.getElementById('regLoginError');
    
    if (login.length < 3) {
        errorSpan.textContent = 'Логин должен быть минимум 3 символа';
        errorSpan.style.color = '#f57c00';
        loginField.classList.add('error');
        return false;
    }
    
    if (users.find(u => u.login === login)) {
        errorSpan.textContent = '❌ Этот логин уже занят';
        errorSpan.style.color = '#f57c00';
        loginField.classList.add('error');
        return false;
    } else if (login.length >= 3) {
        errorSpan.textContent = '✅ Логин свободен';
        errorSpan.style.color = '#2e7d32';
        loginField.classList.remove('error');
        return true;
    }
}

// Уведомления
function showNotification(msg, type, duration = 3000) {
    const notification = document.createElement('div');
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    notification.innerHTML = `${icon} ${msg}`;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2e7d32' : type === 'error' ? '#f57c00' : '#2196f3'};
        color: white;
        padding: 14px 24px;
        border-radius: 50px;
        z-index: 9999;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-size: 0.9rem;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Добавление кнопок показа пароля
function addPasswordToggles() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.parentElement.querySelector('.toggle-password')) return;
        
        const toggle = document.createElement('i');
        toggle.className = 'fas fa-eye toggle-password';
        
        toggle.addEventListener('click', () => {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            toggle.classList.toggle('fa-eye');
            toggle.classList.toggle('fa-eye-slash');
        });
        
        input.parentElement.appendChild(toggle);
    });
}

// ========== ЛОГИН ==========
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const login = document.getElementById('loginLogin').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        if (!login || !password) {
            showNotification('Заполните все поля!', 'error');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.login === login && u.password === password);
        
        if (user) {
            const currentUser = { ...user };
            delete currentUser.password;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showNotification(`Добро пожаловать, ${login}! 🎉`, 'success');
            
            setTimeout(() => {
                window.location.href = user.isAdmin ? '/admin' : '/';
            }, 800);
        } else {
            showNotification('Неверный логин или пароль 😔', 'error');
            document.getElementById('loginPassword').value = '';
            document.getElementById('loginPassword').focus();
        }
    });
}

// ========== РЕГИСТРАЦИЯ ==========
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    const regLogin = document.getElementById('regLogin');
    const regPhone = document.getElementById('regPhone');
    const regPassword = document.getElementById('regPassword');
    const regConfirm = document.getElementById('regConfirmPassword');
    
    if (regLogin) {
        regLogin.addEventListener('input', (e) => {
            const login = e.target.value.trim();
            if (login.length >= 3) {
                clearTimeout(loginCheckTimeout);
                loginCheckTimeout = setTimeout(() => {
                    checkLoginAvailability(login);
                }, 300);
            } else {
                const errorSpan = document.getElementById('regLoginError');
                errorSpan.textContent = login.length > 0 ? 'Логин должен быть минимум 3 символа' : '';
                errorSpan.style.color = '#f57c00';
                regLogin.classList.toggle('error', login.length > 0 && login.length < 3);
            }
        });
    }
    
    if (regPhone) {
        regPhone.addEventListener('input', (e) => {
            formatPhone(e.target);
            const phone = e.target.value.trim();
            const errorSpan = document.getElementById('regPhoneError');
            if (phone && !validatePhone(phone)) {
                errorSpan.textContent = 'Введите корректный номер телефона';
                errorSpan.style.color = '#f57c00';
                regPhone.classList.add('error');
            } else {
                errorSpan.textContent = '';
                regPhone.classList.remove('error');
            }
        });
    }
    
    if (regPassword) {
        regPassword.addEventListener('input', (e) => {
            checkPasswordStrength(e.target.value);
            if (regConfirm && regConfirm.value && e.target.value !== regConfirm.value) {
                document.getElementById('regConfirmError').textContent = 'Пароли не совпадают';
                document.getElementById('regConfirmError').style.color = '#f57c00';
                regConfirm.classList.add('error');
            } else if (regConfirm && regConfirm.value) {
                document.getElementById('regConfirmError').textContent = '✅ Пароли совпадают';
                document.getElementById('regConfirmError').style.color = '#2e7d32';
                regConfirm.classList.remove('error');
            }
        });
    }
    
    if (regConfirm) {
        regConfirm.addEventListener('input', (e) => {
            const password = regPassword ? regPassword.value : '';
            if (e.target.value !== password) {
                document.getElementById('regConfirmError').textContent = 'Пароли не совпадают';
                document.getElementById('regConfirmError').style.color = '#f57c00';
                regConfirm.classList.add('error');
            } else {
                document.getElementById('regConfirmError').textContent = '✅ Пароли совпадают';
                document.getElementById('regConfirmError').style.color = '#2e7d32';
                regConfirm.classList.remove('error');
            }
        });
    }
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const login = document.getElementById('regLogin').value.trim();
        const phone = document.getElementById('regPhone').value.trim();
        const email = document.getElementById('regEmail')?.value.trim() || '';
        const password = document.getElementById('regPassword').value;
        const confirm = document.getElementById('regConfirmPassword').value;
        
        let isValid = true;
        
        if (login.length < 3) {
            document.getElementById('regLoginError').textContent = 'Логин должен быть минимум 3 символа';
            document.getElementById('regLoginError').style.color = '#f57c00';
            document.getElementById('regLogin').classList.add('error');
            isValid = false;
        }
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.login === login)) {
            document.getElementById('regLoginError').textContent = '❌ Пользователь с таким логином уже существует';
            document.getElementById('regLoginError').style.color = '#f57c00';
            document.getElementById('regLogin').classList.add('error');
            isValid = false;
        }
        
        if (!validatePhone(phone)) {
            document.getElementById('regPhoneError').textContent = 'Введите корректный номер телефона';
            document.getElementById('regPhoneError').style.color = '#f57c00';
            document.getElementById('regPhone').classList.add('error');
            isValid = false;
        }
        
        if (password.length < 6) {
            document.getElementById('regPasswordError').textContent = 'Пароль должен быть минимум 6 символов';
            document.getElementById('regPasswordError').style.color = '#f57c00';
            document.getElementById('regPassword').classList.add('error');
            isValid = false;
        }
        
        if (password !== confirm) {
            document.getElementById('regConfirmError').textContent = 'Пароли не совпадают';
            document.getElementById('regConfirmError').style.color = '#f57c00';
            document.getElementById('regConfirmPassword').classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            const newUser = {
                id: Date.now(),
                login: login,
                password: password,
                phone: phone,
                email: email || `${login}@mreco.ru`,
                isAdmin: false,
                registerDate: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            showNotification(`🎉 Регистрация успешна! Добро пожаловать, ${login}!`, 'success', 2000);
            
            const savedUser = { ...newUser };
            delete savedUser.password;
            localStorage.setItem('currentUser', JSON.stringify(savedUser));
            
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        } else {
            showNotification('Пожалуйста, исправьте ошибки в форме', 'error');
        }
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    addPasswordToggles();
    
    // Автофокус
    const firstInput = document.querySelector('.login-card input, .register-card input');
    if (firstInput) firstInput.focus();
});