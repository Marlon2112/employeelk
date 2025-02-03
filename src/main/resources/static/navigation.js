document.addEventListener("DOMContentLoaded", function () {
    // Получаем все ссылки меню и разделы страниц
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("main > section");

    // Функция скрытия всех секций
    function hideAllSections() {
        sections.forEach(section => {
            section.style.display = "none";
        });
    }

    // При загрузке скрываем все секции и показываем первую (например, главную)
    hideAllSections();
    if (sections.length > 0) {
        sections[0].style.display = "block";
    }

    // Навешиваем обработчик клика на каждую ссылку
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            // Получаем id секции, которую надо показать
            const sectionId = this.getAttribute("href").substring(1);
            hideAllSections();
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.style.display = "block";
            }
        });
    });
});