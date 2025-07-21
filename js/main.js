document.addEventListener('DOMContentLoaded', function() {

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const privacyCheckbox = document.getElementById('privacy-policy');
            if (!privacyCheckbox.checked) {
                alert('Debes aceptar las políticas de tratamiento de datos personales para enviar el formulario.');
                return;
            }
            
            // Simulación de envío exitoso
            showSuccessMessage(this);
        });
    }

    function showSuccessMessage(formElement) {
        const formWrapper = formElement.closest('.contact-form-wrapper');
        const existingMessage = formWrapper.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 2.5rem; color: var(--accent-cyan); margin-bottom: 15px; display: block;"></i>
            <h4 style="margin-bottom: 10px; font-size: 1.5rem;">¡Gracias por contactarnos!</h4>
            <p style="color: var(--text-secondary);">Hemos recibido tu mensaje y nos pondremos en contacto contigo en menos de 24 horas. Nos comprometemos a proteger tus datos y usarlos solo de acuerdo con nuestra <a href="/politica-de-privacidad.html">política de privacidad</a>.</p>
        `;
        formElement.style.display = 'none';
        formWrapper.insertBefore(successMessage, formElement);
        setTimeout(() => {
            formElement.reset();
            document.getElementById('privacy-policy').checked = false;
            successMessage.remove();
            formElement.style.display = 'block';
        }, 6000);
    }

    // Carrusel de Metodología
    const slides = document.querySelectorAll('.carousel-slide');
    const phaseIndicators = document.querySelectorAll('.phase-indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    let autoSlideInterval;
    const slideDuration = 5000;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        phaseIndicators.forEach(indicator => indicator.classList.remove('active'));
        phaseIndicators[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }
    
    phaseIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
            stopAutoSlide();
            startAutoSlide();
        });
    });
    
    const methodologySlider = document.querySelector('.methodology-slider');
    if (methodologySlider) {
        methodologySlider.addEventListener('mouseenter', stopAutoSlide);
        methodologySlider.addEventListener('mouseleave', startAutoSlide);
        startAutoSlide();
    }

});

// --- LÓGICA DE MODALES ---
const modal = document.getElementById('videoModal');
const modalCta = document.querySelector('.modal-cta-area');
const modalVideo = document.getElementById('modalVideo');

if (modalVideo) {
    modalVideo.addEventListener('ended', function () {
        if (modalCta) {
            modalCta.classList.add('visible');
        }
    });
}

const videoMap = {
    video1: 'assets/videos/products/bi.mp4',
    video2: 'assets/videos/products/integration.mp4',
    video3: 'assets/videos/products/automation.mp4',
    video4: 'assets/videos/products/advertising.mp4',
    video5: 'assets/videos/products/chatbot.mp4',
    video6: 'assets/videos/products/predictions.mp4',
    video7: 'assets/videos/products/consultancy.mp4',
    video8: 'assets/videos/products/training.mp4',
};

const ctaData = {
    video1: {
        title: "Descubre lo que impulsa tu negocio",
        text: "Descubre oportunidades ocultas en tus datos y comienza a decidir con total confianza.",
        button: "Quiero ver mis datos con claridad"
    },
    video2: {
        title: "Unifica tus datos, libera tu tiempo",
        text: "La fragmentación de datos termina aquí. Te ayudamos a convertir tu información en un activo fiable y centralizado, listo para impulsar decisiones estratégicas.",
        button: "Centraliza mis datos ya"
    },
    video3: {
        title: "Automatiza y gana tiempo cada día",
        text: "Creamos soluciones que eliminan tareas repetitivas para que tu equipo se enfoque en crecer.",
        button: "Quiero automatizar mis procesos"
    },
    video4: {
        title: "Lleva tu mensaje al cliente ideal",
        text: "Diseñamos campañas que atraen prospectos calificados y aumentan tus conversiones.",
        button: "Quiero atraer más clientes"
    },
    video5: {
        title: "Atiende 24/7 sin esfuerzo humano",
        text: "Creamos asistentes inteligentes que mejoran la experiencia y reducen tu carga operativa.",
        button: "Activa mi chatbot ahora"
    },
    video6: {
        title: "Anticípate al Futuro de tu Mercado.",
        text: "Saber lo que pasó es útil, pero predecir lo que vendrá es poder. Usemos tus datos para descubrir las oportunidades que la competencia aún no ve.",
        button: "Quiero predecir el futuro"
    },
    video7: {
        title: "Convierte tus Ideas en Proyectos Rentables.",
        text: "Una gran idea necesita una estrategia sólida. Evaluemos la viabilidad de tu proyecto y creemos una hoja de ruta clara para garantizar el retorno de inversión.",
        button: "Evalúa mi estrategia ahora"
    },
    video8: {
        title: "Transforma a tu Equipo en una Potencia de Datos.",
        text: "Las herramientas son solo una parte. El verdadero poder reside en un equipo capacitado. Empoderemos a tu gente para que conviertan datos en decisiones.",
        button: "Quiero entrenar a mi equipo"
    }
};

function openModal(videoId) {
    const data = ctaData[videoId];
    if (!data) return;

    const modal = document.getElementById('videoModal');
    const modalContent = modal.querySelector('.modal-content');
    const modalSource = document.getElementById('modalSource');
    const modalVideo = document.getElementById('modalVideo');
    const modalCtaArea = document.querySelector('.modal-cta-area');
    
    const modalCtaTitle = document.getElementById('modalCtaTitle');
    const modalCtaText = document.getElementById('modalCtaText');
    const modalCtaButton = document.getElementById('modalCtaButton');

    modalCtaTitle.innerText = data.title;
    modalCtaText.innerText = data.text;
    modalCtaButton.innerText = data.button;

    modalCtaArea.classList.remove('visible');
    
    modalSource.src = videoMap[videoId];
    modalVideo.load();
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => modalContent.classList.add('active-border'), 10);

    modalVideo.onended = function() {
        modalCtaArea.classList.add('visible');
    };

    modalVideo.play().catch(error => {
        console.log("La reproducción automática fue bloqueada por el navegador.");
    });
}

function closeModal() {
    const modal = document.getElementById('videoModal');
    const modalContent = modal.querySelector('.modal-content');
    const modalVideo = document.getElementById('modalVideo');
    const modalCtaArea = document.querySelector('.modal-cta-area');

    modal.style.display = 'none';
    modalContent.classList.remove('active-border');
    document.body.style.overflow = '';
    
    modalVideo.pause();
    document.getElementById('modalSource').src = "";
    
    modalCtaArea.classList.remove('visible');
    
    modalVideo.onended = null;
}

if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Script para manejar el token de reCAPTCHA
grecaptcha.ready(function() {
    grecaptcha.execute('TU_SITE_KEY', {action: 'contact'}).then(function(token) {
        const recaptchaResponseElement = document.getElementById('recaptcha-response');
        if (recaptchaResponseElement) {
            recaptchaResponseElement.value = token;
        }
    }).catch(function(error) {
        console.error("Error al ejecutar reCAPTCHA:", error);
    });
});