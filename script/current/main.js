async function fetchDos() {
    const dos = await fetch('../script/current/dos.json')
        .then(response => response.json());
    return dos;   
};

async function populateTable() {
    const dos = await fetchDos();
    const tableBody = document.getElementById('dos-table-body');
    const priorityLevels = [
        {
            level: "high",
            icon: "🔥"
        },
        {
            level: "medium",
            icon: "🌟"
        },
        {
            level: "low",
            icon: "🌱"
        }
    ];

    dos.forEach(doItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td title="${doItem.priority}">${priorityLevels.find(level => level.level === doItem.priority).icon}</td>
            <td>${doItem.type}</td>
            <td>${doItem.title}</td>
            <td>${doItem.description}</td>
            <td>
                <ul>
                    ${doItem['reference-links'].map(link => `<li><a href="${link}" target="_blank" rel="noopener nofollow noreferrer" title="${link}">${link}</a></li>`).join('')}
                </ul>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    await populateTable();
});