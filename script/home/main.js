document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');

    function changeActiveLink() {
        const scrollPosition = window.scrollY;
        let activeSection;

        navLinks.forEach((link, index) => {
            const section = document.querySelector(link.getAttribute('href'));
            const sectionTop = section.offsetTop - (window.innerHeight * 0.2);
            const sectionBottom = sectionTop + section.offsetHeight;

            // Check if the bottom of the current section is at the top of the window
            if (scrollPosition >= sectionBottom && scrollPosition < sectionTop) {
                link.classList.remove('active');
            } else {
                // Check if the top of the current section is at the top of the window
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    link.classList.add('active');
                    activeSection = section;
                } else {
                    link.classList.remove('active');
                }
            }
        });

        // Query the currently active section outside the loop
        const currentlyActiveSection = document.querySelector('.active-section');
        if (currentlyActiveSection) {
            currentlyActiveSection.classList.remove('active-section');
        }

        // Add 'active-section' class to the currently active section
        if (activeSection) {
            activeSection.classList.add('active-section');
        }
    }

    // welcome transformation
    const welcomeIntro = document.getElementById('w-section-introduction');
    const welcomeContent = document.getElementById('welcome-section');

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY + (window.innerHeight * 0.2);
        const windowHeight = window.innerHeight;

        const threshold = welcomeIntro.offsetTop;
        const topThreshold = welcomeContent.offsetHeight;

        if (scrollPosition >= threshold && scrollPosition >= topThreshold) {
            welcomeIntro.classList.add('sticky');
        } else {
            welcomeIntro.classList.remove('sticky');
        }

        changeActiveLink();
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