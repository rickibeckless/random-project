async function fetchQuotes() {
    const response = await fetch('../script/home/quotes.json');
    const data = await response.json();
    return data;
};

async function fetchRandomQuote(quoteId) {
    const quotes = await fetchQuotes();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    if (quoteId && quotes.length > 1) {
        if (quotes[randomIndex].id === quoteId) {
            return fetchRandomQuote(quoteId);
        };
    };

    return quotes[randomIndex];
};

async function fetchAffirmations() {
    const response = await fetch('../script/home/affirmations.json');
    const data = await response.json();
    return data;
};

async function fetchRandomAffirmation(affirmationId) {
    const affirmations = await fetchAffirmations();
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    if (affirmationId && affirmations.length > 1) {
        if (affirmations[randomIndex].id === affirmationId) {
            return fetchRandomAffirmation(affirmationId);
        };
    };

    return affirmations[randomIndex];
};

const createRandomCard = (random) => {
    const randomCard = document.createElement('div');
    randomCard.classList.add('random-card');
    randomCard.dataset.id = random.id;
    randomCard.innerHTML = `
        <p class="random-content">${random.content}</p>
        ${random.author ? `<span class="random-author">${random.author}</span>` : ''}
    `;

    return randomCard;
};

const handleRandomQuote = async () => {
    const randomButton = document.getElementById('rand-quote-btn');
    randomButton.addEventListener('click', async () => {
        const currentQuote = document.querySelector('.random-card');
        let quoteId;
        if (currentQuote) {
            quoteId = currentQuote.dataset.id;
        }
        const quote = await fetchRandomQuote(quoteId);
        const randomContainer = document.getElementById('rand-card-section');
        const quoteCard = createRandomCard(quote);
        randomContainer.innerHTML = '';
        randomContainer.appendChild(quoteCard);
    });
};

const handleRandomAffirmation = async () => {
    const randomButton = document.getElementById('rand-affirmation-btn');
    randomButton.addEventListener('click', async () => {
        const currentAffirmation = document.querySelector('.random-card');
        let affirmationId;
        if (currentAffirmation) {
            affirmationId = currentAffirmation.dataset.id;
        }
        const affirmation = await fetchRandomAffirmation(affirmationId);
        const randomContainer = document.getElementById('rand-card-section');
        const affirmationCard = createRandomCard(affirmation);
        randomContainer.innerHTML = '';
        randomContainer.appendChild(affirmationCard);
    });
};

const onLoadQuote = () => {
    const quoteButton = document.getElementById('rand-quote-btn');
    quoteButton.click();
}

document.addEventListener('DOMContentLoaded', function () {
    handleRandomQuote();
    handleRandomAffirmation();
    onLoadQuote();
});