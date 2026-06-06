$(document).ready(function() {
    $('.quick-order-btn').click(function() {
        $('#quick-product').val($(this).data('name'));
        $('#quickOrderModal').modal('show');
    });

    $('#quick-order-form').submit(function(e) {
        e.preventDefault();
        var name = $('#quick-name').val().trim();
        var phone = $('#quick-phone').val().trim();
        
        if (!name || !phone) {
            $('#quick-status').html('<span style="color:#e74c3c;">Заполните имя и телефон</span>');
            return;
        }
        
        $('#quick-status').html('<span style="color:#27ae60;">Спасибо, ' + name + '! Мы перезвоним.</span>');
        $('#quick-order-form')[0].reset();
        setTimeout(function() {
            $('#quickOrderModal').modal('hide');
            $('#quick-status').html('');
        }, 2000);
    });
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            var navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
            window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
        }
    });
});