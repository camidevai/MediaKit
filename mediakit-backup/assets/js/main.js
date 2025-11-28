// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
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

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');

    // EmailJS configuration
    const emailJsConfig = {
        SERVICE_ID: 'service_t0cvv27',
        TEMPLATE_ID: 'template_lh7gtfd',
    };

    // Form submission handler
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

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
});
