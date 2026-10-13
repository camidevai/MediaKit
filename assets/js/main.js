document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'es';
    const languageButtons = { es: document.getElementById('lang-es'), en: document.getElementById('lang-en') };
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-btn');
    const submitLabel = submitButton.querySelector('[data-translate-key]');
    const formMessage = document.getElementById('form-message');
    const rankingFilters = document.querySelectorAll('[data-ranking-filter]');
    const rankingPanels = document.querySelectorAll('[data-ranking-group]');

    function filterRanking(group) {
        rankingPanels.forEach(panel => {
            panel.hidden = panel.dataset.rankingGroup !== group;
        });
        rankingFilters.forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.rankingFilter === group));
        });
    }

    rankingFilters.forEach(button => {
        button.addEventListener('click', () => filterRanking(button.dataset.rankingFilter));
    });
    filterRanking('views');

    function setLanguage(language) {
        if (!translations[language]) return;
        currentLang = language;
        document.documentElement.lang = language;
        document.title = translations[language].docTitle;
        document.querySelector('meta[name="description"]').content = translations[language].pageDescription;
        document.querySelectorAll('[data-stat-key]').forEach(element => {
            const value = CONFIG.stats[element.dataset.statKey];
            if (value) element.textContent = typeof value === 'object' ? value[language] : value;
        });
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const value = translations[language][element.dataset.translateKey];
            if (value) element.textContent = value;
        });
        document.querySelectorAll('[data-alt-key]').forEach(element => {
            element.alt = translations[language][element.dataset.altKey] + ' — CamiDevAI';
        });
        document.querySelectorAll('[data-aria-label-key]').forEach(element => {
            element.setAttribute('aria-label', translations[language][element.dataset.ariaLabelKey]);
        });
        for (const [code, button] of Object.entries(languageButtons)) {
            button.classList.toggle('active', code === language);
            button.setAttribute('aria-pressed', String(code === language));
        }
        if (formMessage.dataset.messageKey) formMessage.textContent = translations[language][formMessage.dataset.messageKey];
    }

    languageButtons.es.addEventListener('click', () => setLanguage('es'));
    languageButtons.en.addEventListener('click', () => setLanguage('en'));
    setLanguage('es');

    if (window.emailjs) window.emailjs.init(CONFIG.emailjs.PUBLIC_KEY);

    function showMessage(key, kind) {
        formMessage.dataset.messageKey = key;
        formMessage.textContent = translations[currentLang][key];
        formMessage.className = kind;
    }

    contactForm.addEventListener('submit', async event => {
        event.preventDefault();
        if (submitButton.disabled) return;
        if (!window.emailjs) {
            showMessage('formError', 'error');
            return;
        }
        submitButton.disabled = true;
        submitLabel.dataset.translateKey = 'formSending';
        submitLabel.textContent = translations[currentLang].formSending;
        formMessage.textContent = '';
        formMessage.dataset.messageKey = '';
        try {
            await window.emailjs.sendForm(CONFIG.emailjs.SERVICE_ID, CONFIG.emailjs.TEMPLATE_ID, contactForm);
            showMessage('formSuccess', 'success');
            contactForm.reset();
        } catch (error) {
            showMessage('formError', 'error');
        } finally {
            submitButton.disabled = false;
            submitLabel.dataset.translateKey = 'formSubmitButton';
            submitLabel.textContent = translations[currentLang].formSubmitButton;
        }
    });
});
