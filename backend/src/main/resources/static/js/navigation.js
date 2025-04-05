document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main > section");

    function hideAllSections() {
        sections.forEach(section => {
            section.style.display = "none";
        });
    }

    // Показываем только первый раздел по умолчанию
    hideAllSections();
    if (sections.length > 0) {
        sections[0].style.display = "block";
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute("href").substring(1);
            hideAllSections();
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.style.display = "block";
            }
        });
    });
});