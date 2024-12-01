let projectFilters = {
    skills: [],
    status: [],
    links: []
};

async function getRandomProject() {
  const projects = await fetchProjects();
  const randomIndex = Math.floor(Math.random() * projects.length);
  return projects[randomIndex];
};

async function fetchProjects() {
    const projects = await fetch('../script/randomProject/projects.json')
        .then(response => response.json());
    return projects;
};

const handleRandomProject = async () => {
    const randomButton = document.getElementById('rand-project-btn');
    randomButton.addEventListener('click', async () => {
        const project = await getRandomProject();
        const projectContainer = document.getElementById('random-project-section');
        const projectCard = createProjectCard(project);
        projectContainer.innerHTML = '';
        projectContainer.appendChild(projectCard);
    });
};

const handleSeeAllProjects = async () => {
    const projects = await fetchProjects();
    const allProjectsButton = document.getElementById('all-projects-btn');
    allProjectsButton.addEventListener('click', () => {
        const projectContainer = document.getElementById('random-project-section');
        projectContainer.innerHTML = '';
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectContainer.appendChild(projectCard);
        });
    });
};

const createProjectCard = (project) => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.id = project.id;
    projectCard.innerHTML = `
        <div class="project-image-container">
            <img class="project-image" src="${project.img_url}" alt="${project.title}"></img>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <div class="project-skills">
            ${project.skills.map(skill => `<span class="project-skill">${skill}</span>`).join('')}
        </div>
        <div class="project-date">
            <span class="project-start-date">${project.dates.start}</span>
            <span class="project-end-date">${project.dates.end}</span>
        </div>
        <span class="project-status">${project.status}</span>
        <div class="project-content">
            <p class="project-description">${project.description}</p>
            <p class="project-author">${project.authors.join(', ')}</p>
        </div>
        <div class="project-links">
            ${project.links.github ? `<a href="${project.links.github}" target="_blank" class="project-link">Github</a>` : ''}
            ${project.links.live ? `<a href="${project.links.live}" target="_blank" class="project-link">Live</a>` : ''}
            ${project.links.video ? `<a href="${project.links.video}" target="_blank" class="project-link">Video</a>` : ''}
            ${project.links.article ? `<a href="${project.links.article}" target="_blank" class="project-link">Article</a>` : ''}
            ${project.links.other ? `<a href="${project.links.other}" target="_blank" class="project-link">Other</a>` : ''}
        </div>
    `;
    return projectCard;
};

const handleSeeFullDescription = () => {
    console.log('handleSeeFullDescription');
    const projectCard = document.querySelectorAll('.project-card');
    projectCard.forEach(card => {
        card.addEventListener('click', () => {
            console.log(card);
        });
    });
};

const setProjectFilters = async () => {
    let projects = await fetchProjects();

    const skills = [];
    const status = [];
    const links = [];

    if (Array.isArray(projects)) {
        projects = projects;
    } else {
        projects = [projects];
    };

    projects.forEach(project => {
        project.skills.forEach(skill => {
            if (!skills.includes(skill) && skill) {
                skills.push(skill);
            }
        });
        if (!status.includes(project.status) && project.status) {
            status.push(project.status);
        }
        Object.keys(project.links).forEach(link => {
            if (!links.includes(link) && project.links[link]) {
                links.push(link);
            }
        });
    });

    const projectFilter = document.getElementById('project-filter');

    const skillsFieldset = document.createElement('fieldset');
    skillsFieldset.innerHTML = `
        <legend>Show Skills</legend>
        ${skills.map(skill => `
            <div class="filter-holder">
                <label for="project-skill">${skill}</label>
                <input class="filter-input" type="checkbox" id="project-skill" name="project-skill" value="${skill}" checked>
                <span class="custom-checkbox"></span>
            </div>
        `).join('')}
    `;

    const statusFieldset = document.createElement('fieldset');
    statusFieldset.innerHTML = `
        <legend>Show Status</legend>
        ${status.map(stat => `
            <div class="filter-holder">
                <label for="project-status">${stat}</label>
                <input class="filter-input" type="checkbox" id="project-status" name="project-status" value="${stat}" checked>
                <span class="custom-checkbox"></span>
            </div>
        `).join('')}
    `;

    const linksFieldset = document.createElement('fieldset');
    linksFieldset.innerHTML = `
        <legend>Must Have</legend>
        ${links.map(link => `
            <div class="filter-holder">
                <label for="project-must-have">${link}</label>
                <input class="filter-input" type="checkbox" id="project-must-have" name="project-must-have" value="${link}" checked>
                <span class="custom-checkbox"></span>
            </div>
        `).join('')}
    `;

    projectFilter.innerHTML = '';
    projectFilter.appendChild(skillsFieldset);
    projectFilter.appendChild(statusFieldset);
    projectFilter.appendChild(linksFieldset);
};

handleRandomProject();
handleSeeAllProjects();
handleSeeFullDescription();
//setProjectFilters();