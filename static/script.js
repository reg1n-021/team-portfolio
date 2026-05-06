document.addEventListener('DOMContentLoaded', function() {
    console.log('JS подключен, мозги работают');

    // кнопка JS
    var btn = document.getElementById('demoBtn');
    var messageBox = document.getElementById('message');

    if (btn && messageBox) {
        btn.addEventListener('click', function() {
            var now = new Date();
            messageBox.innerHTML = '🔘 кнопка нажата в ' + now.toLocaleTimeString('ru-RU');
        });
    }

    // все кнопки-ссылки в карточках
    var allLinks = document.querySelectorAll('.btn-link');
    for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].addEventListener('click', function(event) {
            event.preventDefault();
            var siteName = this.closest('.site-card').querySelector('.site-name').innerText;
            alert('Переход на сайт: ' + siteName);
        });
    }
});