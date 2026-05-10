// Переключение темы
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    themeToggle.textContent = '☀️';
} else {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Модальное окно
const modal = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('modalClose');
const cancelBtn = document.getElementById('modalCancel');
const sendBtn = document.getElementById('modalSendBtn');

function openModal() {
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

const navBtn = document.getElementById('navBtn');
if (navBtn) navBtn.addEventListener('click', openModal);

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

// Прямая ссылка на Яндекс.Почту с заполненным адресатом
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        window.open('https://mail.yandex.ru/compose?to=mrdevzm@gmail.com', '_blank');
        closeModal();
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}