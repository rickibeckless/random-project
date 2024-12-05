async function fetchIAm() {
    const response = await fetch('../script/about/i-am.json');
    const data = await response.json();
    return data;
};

async function handleIAmChange() {
    const iAm = document.getElementById('i-am');
    const iAmData = await fetchIAm();
    let i = 0;
    iAm.classList.add('fade-in-up');
    setInterval(() => {
        iAm.classList.remove('fade-in-up');
        void iAm.offsetWidth;
        iAm.classList.add('fade-in-up');

        iAm.textContent = iAmData[i];
        i = (i + 1) % iAmData.length;
    }, 1500);
};

handleIAmChange();