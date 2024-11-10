document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.horizontal-nav a');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            navLinks.forEach(nav => nav.classList.remove('nav-active'));

            this.classList.add('nav-active');

            sections.forEach(section => section.classList.add('hidden'));

            const targetId = this.getAttribute('data-section');
            document.getElementById(targetId).classList.remove('hidden');
        });
    });
});
document.querySelectorAll('.topic h3').forEach(topic => {
    topic.addEventListener('click', function() {
        this.parentElement.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});
