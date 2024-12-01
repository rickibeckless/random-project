// script for main navbar

async function checkIfActive() {
    let path = window.location.pathname;
    let links = document.querySelectorAll('.main-navbar-item a');
    links.forEach(link => {
        // if link is only /, then it is the home page
        if (link.href === import.meta.PRO_URL) {
            if (path === '/') {
                link.classList.add('active');
            }
        } else if (link.href.includes(path)) {
            link.classList.add('active');
        }
    });
};

checkIfActive();