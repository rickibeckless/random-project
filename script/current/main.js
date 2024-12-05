async function fetchDos() {
    const dos = await fetch('../script/current/dos.json')
        .then(response => response.json());
    return dos;   
};

async function populateTable() {
    const dos = await fetchDos();
    const table = document.getElementById('dos-table');
    const tableBody = document.getElementById('dos-table-body');
    dos.forEach(doItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doItem.type}</td>
            <td>${doItem.title}</td>
            <td>${doItem.description}</td>
            <td>
                <ul>
                    ${doItem['reference-links'].map(link => `<li><a href="${link}">${link}</a></li>`).join('')}
                </ul>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    await populateTable();
});