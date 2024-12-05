function handleToggleContactForm() {
    const contactFormSection = document.getElementById('contact-form-section');
    const documentOverlay = document.getElementById('document-overlay');
    const contactFormModal = document.getElementById('contact-form-modal');
    const contactForm = document.getElementById('contact-form');
    contactForm.reset();

    const contactFormSectionActive = contactFormSection.classList.contains('active');

    if (!contactFormSectionActive) {
        contactFormSection.classList.add('active');
        documentOverlay.classList.add('active');
        contactFormModal.classList.add('active');
        contactForm.classList.add('active');
        document.body.classList.add('no-scroll');
    } else {
        contactFormSection.classList.remove('active');
        documentOverlay.classList.remove('active');
        contactFormModal.classList.remove('active');
        contactForm.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };
};

function handleContactFormSubmit() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            });
    
            if (response.status === 200) {
                handlePopupMessage('Email sent', 3000);
                handleToggleContactForm();
            } else {
                handlePopupMessage('Internal server error', 3000);
            };  
        } catch (error) {
            handlePopupMessage('Internal server error', 3000);
        }
    });
};

function handlePopupMessage(message, time) {
    const popupMessage = document.getElementById('popup-message');
    const popupMessageText = document.getElementById('popup-message-text');
    const popupMessageClose = document.getElementById('popup-message-close');

    popupMessageText.textContent = message;
    popupMessage.classList.add('active');
    document.body.classList.add('no-scroll');

    popupMessageClose.addEventListener('click', () => {
        popupMessage.classList.remove('active');
        document.body.classList.remove('no-scroll');
        popupMessageText.textContent = '';
        return;
    });

    setTimeout(() => {
        popupMessage.classList.remove('active');
        document.body.classList.remove('no-scroll');
        popupMessageText.textContent = '';
    }, time);
};

document.addEventListener('DOMContentLoaded', () => {
    handleContactFormSubmit();

    const toggleContactFormButton = document.querySelectorAll('.contact-form-toggle');

    toggleContactFormButton.forEach(button => button.addEventListener('click', () => {
        handleToggleContactForm();
    }));
});