// script for main navbar

async function checkIfActive() {
    let path = window.location.pathname;
    let links = document.querySelectorAll('.main-navbar-item a');
    links.forEach(link => {
        if (path === '/') { // cause this is the home page
            links[0].classList.add('active');
        } else if (link.href.includes(path)) {
            link.classList.add('active');
        }
    });
};

checkIfActive();