// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
            window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
        }
    });
});

// Форма обратной связи
const form = document.getElementById('feedback-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        const status = document.getElementById('form-status');
        
        if (!name || !phone || !message) {
            if (status) status.innerHTML = '<span style="color:#e74c3c;">❌ Заполните все поля</span>';
            return;
        }
        
        if (status) {
            status.innerHTML = '<span style="color:#27ae60;">✓ Спасибо, ' + name + '! Мы свяжемся с вами.</span>';
        }
        form.reset();
        setTimeout(() => { if (status) status.innerHTML = ''; }, 5000);
    });
}

// Анимация при скролле
const animateOnScroll = () => {
    document.querySelectorAll('.feature-box, .product-card, .price-card, .review-card').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Подсветка активного меню
const highlightNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    let current = '';
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
};

// Фиксация шапки
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) navbar.classList.add('navbar-scrolled');
        else navbar.classList.remove('navbar-scrolled');
    }
    animateOnScroll();
    highlightNav();
});

// Закрытие мобильного меню
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const collapse = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.navbar-toggler');
        if (collapse?.classList.contains('show')) toggler?.click();
    });
});

// Установка начальных стилей для анимации
document.querySelectorAll('.feature-box, .product-card, .price-card, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});
animateOnScroll();
highlightNav();