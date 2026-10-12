// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Apply the same figures wherever community and portfolio results appear.
    document.querySelectorAll('[data-stat-key]').forEach(el => {
        const value = CONFIG.stats[el.dataset.statKey];
        if (value) el.textContent = value;
    });

    // Language management
    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');
    let currentLang = 'es';

    // Language switching functionality
    const setLanguage = (lang) => {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (translations[lang][key]) {
                // Use innerHTML for keys that contain HTML tags like <strong>
                 if (key.includes('Age') || key.includes('Gender') || key.includes('Countries') || key.includes('footerText')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            } else {
                console.warn(`Translation missing for key: ${key} in language: ${lang}`);
            }
        });
        
        langEsBtn.classList.toggle('active', lang === 'es');
        langEnBtn.classList.toggle('active', lang === 'en');
    };

    // Event listeners for language buttons
    langEsBtn.addEventListener('click', () => setLanguage('es'));
    langEnBtn.addEventListener('click', () => setLanguage('en'));

    // Set initial language
    setLanguage('es');

    // Force translation update after a short delay to ensure all elements are loaded
    setTimeout(() => {
        setLanguage(currentLang);
    }, 100);

    // Enhanced scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    // Observe different animation types
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');

    // EmailJS configuration
    const emailJsConfig = CONFIG.emailjs;

    // Form submission handler
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!window.emailjs) {
            formMessage.textContent = translations[currentLang].formError;
            formMessage.className = 'form-message error';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = translations[currentLang].formSending;
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        emailjs.sendForm(emailJsConfig.SERVICE_ID, emailJsConfig.TEMPLATE_ID, this)
            .then(() => {
                formMessage.textContent = translations[currentLang].formSuccess;
                formMessage.classList.add('success');
                submitBtn.textContent = translations[currentLang].formSent;
                
                setTimeout(() => {
                   contactForm.reset();
                   submitBtn.disabled = false;
                   submitBtn.textContent = translations[currentLang].formSubmitButton;
                   formMessage.textContent = '';
                   formMessage.className = 'form-message';
                }, 4000);

            }, (error) => {
                formMessage.textContent = translations[currentLang].formError;
                formMessage.classList.add('error');
                submitBtn.disabled = false;
                submitBtn.textContent = translations[currentLang].formSubmitButton;
                console.error('EmailJS Error:', error);
            });
    });

    // Aplicar estilos específicos a las plataformas
    function applyPlatformStyles() {
        const platformElements = document.querySelectorAll('.featured-platform');
        platformElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes('tiktok')) {
                element.style.color = '#ff0050';
                element.style.background = 'rgba(255, 0, 80, 0.1)';
                element.style.border = '1px solid rgba(255, 0, 80, 0.3)';
            } else if (text.includes('facebook')) {
                element.style.color = '#1877f2';
                element.style.background = 'rgba(24, 119, 242, 0.1)';
                element.style.border = '1px solid rgba(24, 119, 242, 0.3)';
            }
        });
    }

    // Aplicar estilos al cargar la página
    applyPlatformStyles();
});

