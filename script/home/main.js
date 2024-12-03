document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');

    // welcome transformation
    const welcomeIntro = document.getElementById('w-section-introduction');
    const welcomeContent = document.getElementById('welcome-section');

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY + (window.innerHeight * 0.2);

        const threshold = welcomeIntro.offsetTop;
        const topThreshold = welcomeContent.offsetHeight;

        if (scrollPosition >= threshold && scrollPosition >= topThreshold) {
            welcomeIntro.classList.add('sticky');
        } else {
            welcomeIntro.classList.remove('sticky');
        };
    });

    // smooth scrolling
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});