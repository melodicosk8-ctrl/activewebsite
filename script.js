// Mouse Sparkle Trail Effect
document.addEventListener('mousemove', function (e) {
    // Limit sparkle creation rate
    if (Math.random() > 0.85) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'mouse-sparkle';

    // Random size variation
    const size = Math.random() * 8 + 6; // 6-14px
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';

    // Random offset from cursor
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    sparkle.style.left = (x + offsetX) + 'px';
    sparkle.style.top = (y + offsetY) + 'px';

    document.body.appendChild(sparkle);

    // Remove sparkle after animation completes
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Smooth scroll para los links de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Manejar el envío del formulario
const form = document.querySelector('.contacto-form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = this.querySelector('input[placeholder="Tu Nombre"]').value;
        const email = this.querySelector('input[placeholder="Tu Email"]').value;
        const telefono = this.querySelector('input[placeholder="Teléfono (opcional)"]').value;
        const mensaje = this.querySelector('textarea').value;

        // Crear el mensaje para WhatsApp/correo
        const cuerpoMensaje = `
Nuevo Solicitud de Presupuesto:

Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono || 'No proporcionado'}

Mensaje:
${mensaje}
        `;

        // Mostrar confirmación
        alert('Gracias por tu solicitud. Nos pondremos en contacto pronto.\n\nTambién puedes llamarnos al 0433 373 942');

        // Limpiar el formulario
        this.reset();
    });
}

// Agregar animación suave cuando las secciones entran en vista
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar la animación a los cards
document.querySelectorAll('.servicio-card, .valor, .ventaja').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Cambiar activa clase del navbar según scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        navbar.style.backgroundColor = 'rgba(30, 58, 138, 0.95)';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        navbar.style.backgroundColor = '#1e3a8a';
    }
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Modal de Reclutamiento
const modalOverlay = document.getElementById('modal-overlay');
const modalReclutamiento = document.getElementById('modal-reclutamiento');
const abrirReclutamiento = document.getElementById('abrir-reclutamiento');
const cerrarModal = document.getElementById('cerrar-modal');

if (abrirReclutamiento && modalReclutamiento && modalOverlay) {
    // Abrir modal
    abrirReclutamiento.addEventListener('click', function (e) {
        e.preventDefault();
        modalOverlay.classList.add('active');
        modalReclutamiento.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar modal con botón X
    if (cerrarModal) {
        cerrarModal.addEventListener('click', function () {
            modalOverlay.classList.remove('active');
            modalReclutamiento.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Cerrar modal al hacer click en el overlay
    modalOverlay.addEventListener('click', function () {
        modalOverlay.classList.remove('active');
        modalReclutamiento.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
            modalReclutamiento.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Prevenir que el click dentro del modal lo cierre
    modalReclutamiento.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}

// Manejar el formulario de reclutamiento
const reclutamientoForm = document.getElementById('reclutamiento-form');
if (reclutamientoForm) {
    reclutamientoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre-apellido').value;
        const telefono = '+61' + document.getElementById('telefono').value;
        const disponibilidad = document.getElementById('disponibilidad').value;
        const direccion = document.getElementById('direccion').value;

        // Crear el mensaje para WhatsApp
        const disponibilidadTexto = disponibilidad === 'completa'
            ? 'Full Time'
            : 'Part Time';

        const mensaje = `
*NEW JOB APPLICATION - Active Cleaning*

📋 *Candidate Details:*
━━━━━━━━━━━━━━━━━━━━

👤 *Name:* ${nombre}
📱 *Phone:* ${telefono}
⏰ *Availability:* ${disponibilidadTexto}
📍 *Address:* ${direccion}

━━━━━━━━━━━━━━━━━━━━
Date: ${new Date().toLocaleDateString('en-AU')}
        `;

        // Codificar el mensaje para URL
        const mensajeCodificado = encodeURIComponent(mensaje);
        const whatsappUrl = `https://wa.me/61433373942?text=${mensajeCodificado}`;

        // Mostrar confirmación y abrir WhatsApp
        alert('Thank you for your interest in joining our team!\n\nYour application will be sent via WhatsApp. Please verify the information before sending.');

        // Abrir WhatsApp en nueva pestaña
        window.open(whatsappUrl, '_blank');

        // Limpiar el formulario
        reclutamientoForm.reset();
    });
}

// Hero Slider - Carrusel automático
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Cambiar cada 5 segundos

    function showSlide(index) {
        // Remover clase active de todos los slides
        slides.forEach(slide => slide.classList.remove('active'));

        // Agregar clase active al slide actual
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Iniciar el carrusel si hay slides
    if (slides.length > 0) {
        // Cambiar automáticamente cada X segundos
        setInterval(nextSlide, slideInterval);
    }
});

// YouTube API para forzar loop exacto
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
if (firstScriptTag) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
} else {
    document.body.appendChild(tag);
}

var ytPlayer;
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtube-bg-player', {
        events: {
            'onStateChange': function (event) {
                // Cuando el video finaliza (llega al "end=23"), lo regresamos a 10s
                if (event.data === YT.PlayerState.ENDED) {
                    ytPlayer.seekTo(10);
                    ytPlayer.playVideo();
                }
            }
        }
    });
}

// Inicializar Autocompletado de Direcciones (OpenStreetMap Nominatim)
function initAutocompleteOSM() {
    const addressInput = document.getElementById('direccion');

    // Solo inicializar si el elemento existe en la página
    if (addressInput) {
        // Envolver input en un contenedor para las sugerencias
        const container = document.createElement('div');
        container.classList.add('autocomplete-container');

        addressInput.parentNode.insertBefore(container, addressInput);
        container.appendChild(addressInput);

        const suggestionsBox = document.createElement('div');
        suggestionsBox.classList.add('autocomplete-suggestions');
        container.appendChild(suggestionsBox);

        let timeoutId;

        addressInput.addEventListener('input', function () {
            clearTimeout(timeoutId);
            const query = this.value;

            if (query.length < 3) {
                suggestionsBox.innerHTML = '';
                return;
            }

            timeoutId = setTimeout(() => {
                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=au&addressdetails=1&limit=5`)
                    .then(response => response.json())
                    .then(data => {
                        suggestionsBox.innerHTML = '';
                        data.forEach(item => {
                            const div = document.createElement('div');
                            div.classList.add('autocomplete-suggestion');
                            div.textContent = item.display_name;
                            div.addEventListener('click', () => {
                                addressInput.value = item.display_name;
                                suggestionsBox.innerHTML = '';
                            });
                            suggestionsBox.appendChild(div);
                        });
                    })
                    .catch(err => console.error(err));
            }, 500); // 500ms debounce
        });

        // Evitar que al presionar 'Enter' se envíe el formulario si hay sugerencias abiertas
        addressInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });

        // Ocultar sugerencias si se hace clic fuera
        document.addEventListener('click', function (e) {
            if (!container.contains(e.target)) {
                suggestionsBox.innerHTML = '';
            }
        });
    }
}

// Inicializamos OpenStreetMap al cargar DOM
document.addEventListener('DOMContentLoaded', function () {
    initAutocompleteOSM();
});
