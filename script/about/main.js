function handleSkillsDropdown() {
    const skillsSection = document.getElementById('about-skills-section');
    const skillsHolder = document.querySelectorAll('.about-skills-holder');
    const skillsDropdown = document.getElementById('about-skills-dropdown');
    const skillsHolderDropdown = document.querySelectorAll('.about-skills-holder-dropdown');
    let firstSkillsHolderHeight = skillsHolder[0].clientHeight;
    let secondSkillsHolderHeight = skillsHolder[1].clientHeight;
    skillsSection.style.height = (firstSkillsHolderHeight + (secondSkillsHolderHeight / 2.5)) + 'px';

    skillsDropdown.addEventListener('click', () => {
        skillsSection.classList.toggle('active');
        skillsDropdown.classList.toggle('active');
        if (skillsSection.classList.contains('active')) {
            skillsSection.style.height = 'auto';
        } else {
            skillsSection.style.height = (firstSkillsHolderHeight + (secondSkillsHolderHeight / 2.5)) + 'px';
        }
    });

    skillsHolder.forEach((holder, index) => {
        skillsHolder[0].classList.add('active');
        holder.addEventListener('click', () => {
            if (skillsSection.classList.contains('active')) {
                holder.classList.toggle('active');
                skillsHolderDropdown[index - 1].classList.toggle('active');
            }
        });
    });
};

handleSkillsDropdown();