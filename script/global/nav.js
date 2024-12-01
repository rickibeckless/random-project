// script for main navbar

async function checkIfActive() {
    let path = window.location.pathname;
    let links = document.querySelectorAll('.main-navbar-item a');
    links.forEach(link => {
        console.log(link.href);
        if (path === '/') {
            links[0].classList.add('active');
        } else if (link.href.includes(path)) {
            link.classList.add('active');
        }
    });
};

checkIfActive();