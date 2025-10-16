document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });
    // Cerrar menú al navegar
    document.querySelectorAll('.nav-list a').forEach(a => {
        a.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navbar on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Intersection Observer para animar tarjetas
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    const animated = document.querySelectorAll('.service-card, .advantage-card, .about-text, .cv-skills, .cv-card, .contact-form, .contact-info');
    animated.forEach((el, i) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${i * 60}ms`;
        observer.observe(el);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (id.length > 1) {
                e.preventDefault();
                const target = document.querySelector(id);
                if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Efecto de máquina de escribir (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const txt = heroTitle.textContent.trim();
        heroTitle.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            heroTitle.textContent += txt.charAt(i);
            i++;
            if (i >= txt.length) clearInterval(interval);
        }, 35);
    }

    // Formulario SIMULADO (sin Firebase)
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('#name');
            const email = form.querySelector('#email');
            const service = form.querySelector('#service');
            const message = form.querySelector('#message');

            // Validaciones básicas
            if (!name.value.trim()) return showError(name, 'Ingresa tu nombre');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return showError(email, 'Email no válido');
            if (!service.value) return showError(service, 'Selecciona un servicio');
            if (!message.value.trim()) return showError(message, 'Describe tu proyecto');

            // Simulación de envío
            const success = document.createElement('div');
            success.className = 'form-success animate__animated animate__fadeIn';
            success.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Gracias ${name.value.trim()}, recibí tu mensaje (simulado). Te contactaré pronto.</p>
      `;
            form.parentNode.insertBefore(success, form.nextSibling);
            form.reset();

            setTimeout(() => {
                success.classList.add('animate__fadeOut');
                setTimeout(() => success.remove(), 400);
            }, 4500);
        });

        // Limpiar errores
        form.querySelectorAll('input, select, textarea').forEach(el => {
            el.addEventListener('focus', () => clearError(el));
        });
    }

    // Helpers UI
    function showError(input, msg) {
        clearError(input);
        const err = document.createElement('div');
        err.className = 'error-message';
        err.textContent = msg;
        input.classList.add('error');
        input.parentNode.insertBefore(err, input.nextSibling);
        input.focus();
    }
    function clearError(input) {
        input.classList.remove('error');
        const err = input.parentNode.querySelector('.error-message');
        if (err) err.remove();
    }

    // Estado cargado
    setTimeout(() => document.body.classList.add('loaded'), 400);
});
