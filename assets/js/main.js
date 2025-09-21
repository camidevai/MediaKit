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

    // Add counter animation for statistics
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = counter.textContent;
            const numericValue = parseInt(target.replace(/[^\d]/g, ''));
            const suffix = target.replace(/[\d.]/g, '');

            if (numericValue) {
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            }
        });
    };

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

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
