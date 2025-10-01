/* ===========================================
   LA BOTICA DEL BIENESTAR - JAVASCRIPT
   Funcionalidades:
   - Navegación móvil
   - Formulario de contacto
   - Scroll suave
   - Efectos interactivos
   =========================================== */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // NAVEGACIÓN MÓVIL
    // ===========================================
    
    // Obtener elementos del menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    
    // Función para cerrar el menú móvil
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Event listener para el botón hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // ===========================================
    // NAVEGACIÓN SUAVE Y ACTIVACIÓN DE ENLACES
    // ===========================================
    
    // Función para scroll suave a una sección
    function smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Ajustar por navbar fijo
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Agregar event listeners a todos los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
    
    // Función para actualizar el enlace activo según la sección visible
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remover clase active de todos los enlaces
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Agregar clase active al enlace correspondiente
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Event listener para scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ===========================================
    // FORMULARIO DE CONTACTO
    // ===========================================
    
    // Obtener el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    // Función para validar el formulario
    function validateForm(formData) {
        const errors = [];
        
        // Validar nombre
        if (!formData.nombre.trim()) {
            errors.push('El nombre es requerido');
        } else if (formData.nombre.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }
        
        // Validar correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.correo.trim()) {
            errors.push('El correo electrónico es requerido');
        } else if (!emailRegex.test(formData.correo)) {
            errors.push('El correo electrónico no es válido');
        }
        
        // Validar mensaje
        if (!formData.mensaje.trim()) {
            errors.push('El mensaje es requerido');
        } else if (formData.mensaje.trim().length < 10) {
            errors.push('El mensaje debe tener al menos 10 caracteres');
        }
        
        return errors;
    }
    
    // Función para mostrar mensajes de error
    function showErrors(errors) {
        // Remover mensajes de error anteriores
        const existingErrors = document.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        // Mostrar nuevos errores
        errors.forEach(error => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#e74c3c';
            errorDiv.style.fontSize = '0.9rem';
            errorDiv.style.marginTop = '0.5rem';
            errorDiv.textContent = error;
            
            // Insertar después del formulario
            contactForm.appendChild(errorDiv);
        });
    }
    
    // Función para mostrar mensaje de éxito
    function showSuccess() {
        // Remover mensajes anteriores
        const existingMessages = document.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(message => message.remove());
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.color = '#27ae60';
        successDiv.style.fontSize = '1rem';
        successDiv.style.marginTop = '1rem';
        successDiv.style.padding = '1rem';
        successDiv.style.backgroundColor = '#d5f4e6';
        successDiv.style.borderRadius = '8px';
        successDiv.style.border = '1px solid #27ae60';
        successDiv.innerHTML = '✅ ¡Mensaje enviado correctamente! Te contactaremos pronto.';
        
        contactForm.appendChild(successDiv);
        
        // Limpiar el formulario
        contactForm.reset();
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Event listener para el envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir envío por defecto
            
            // Obtener datos del formulario
            const formData = {
                nombre: document.getElementById('nombre').value,
                correo: document.getElementById('correo').value,
                mensaje: document.getElementById('mensaje').value
            };
            
            // Validar formulario
            const errors = validateForm(formData);
            
            if (errors.length > 0) {
                showErrors(errors);
            } else {
                // Simular envío del formulario
                console.log('Formulario enviado correctamente');
                console.log('Datos del formulario:', formData);
                
                // Mostrar mensaje de éxito
                showSuccess();
            }
        });
    }
    
    // ===========================================
    // EFECTOS INTERACTIVOS ADICIONALES
    // ===========================================
    
    // Efecto de aparición gradual en scroll
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.service-card, .project-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar elementos para animación
    const animatedElements = document.querySelectorAll('.service-card, .project-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Event listener para scroll
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Ejecutar una vez al cargar la página
    handleScrollAnimations();
    
    // ===========================================
    // BOTÓN CTA (LLAMADA A LA ACCIÓN)
    // ===========================================
    
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            smoothScrollTo('#servicios');
        });
    }
    
    // ===========================================
    // BOTONES DE PROYECTOS
    // ===========================================
    
    const projectButtons = document.querySelectorAll('.project-button');
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí podrías agregar funcionalidad para mostrar más detalles
            // Por ahora, solo mostramos un mensaje
            alert('¡Gracias por tu interés! Pronto tendremos más información sobre este proyecto.');
        });
    });
    
    // ===========================================
    // ENLACES DE REDES SOCIALES
    // ===========================================
    
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Simular enlaces a redes sociales
            const socialType = this.textContent.toLowerCase();
            let message = '';
            
            if (socialType.includes('facebook')) {
                message = '¡Síguenos en Facebook! Pronto tendremos nuestra página oficial.';
            } else if (socialType.includes('instagram')) {
                message = '¡Síguenos en Instagram! Compartimos consejos de bienestar diarios.';
            } else if (socialType.includes('whatsapp')) {
                message = '¡Contáctanos por WhatsApp! Estamos disponibles para asesorarte.';
            }
            
            alert(message);
        });
    });
    
    // ===========================================
    // FUNCIONALIDADES ADICIONALES
    // ===========================================
    
    // Prevenir envío de formulario con Enter en campos de texto
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                // Enviar formulario si se presiona Enter (sin Shift)
                if (contactForm) {
                    contactForm.dispatchEvent(new Event('submit'));
                }
            }
        });
    });
    
    // Efecto de hover mejorado en las tarjetas
    const cards = document.querySelectorAll('.service-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===========================================
    // INICIALIZACIÓN FINAL
    // ===========================================
    
    console.log('🌿 La Botica del Bienestar - Sitio web cargado correctamente');
    console.log('Funcionalidades disponibles:');
    console.log('- Navegación móvil');
    console.log('- Formulario de contacto con validación');
    console.log('- Scroll suave entre secciones');
    console.log('- Efectos de animación en scroll');
    console.log('- Enlaces interactivos');
    
});

// ===========================================
// FUNCIONES GLOBALES (fuera del DOMContentLoaded)
// ===========================================

// Función para mostrar información de la empresa
function showCompanyInfo() {
    const info = {
        nombre: 'La Botica del Bienestar',
        descripcion: 'Emprendimiento de salud y bienestar natural',
        servicios: ['Asesorías de bienestar', 'Productos naturales', 'Infusiones especiales', 'Aceites esenciales'],
        contacto: {
            email: 'info@laboticadelabuela.com',
            telefono: '+57 300 123 4567',
            direccion: 'Calle 123 #45-67, Bogotá, Colombia'
        }
    };
    
    console.log('Información de la empresa:', info);
    return info;
}

// Función para validar email (función auxiliar)
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para formatear número de teléfono
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}
