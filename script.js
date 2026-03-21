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

// Chatbot Logic - Active Cleaning and Facility Services
function getBotResponse(input) {
    const text = input.toLowerCase();

    // Greetings
    if (/^(hi|hello|hey|hola|g'day|good morning|good afternoon|good evening|howdy)/.test(text) || text === 'hi' || text === 'hello') {
        return "G'day! 👋 Welcome to Active Cleaning and Facility Services. I'm your Active Assistant.\n\nHow can I help you today? You can ask me about:\n• Our cleaning services\n• Getting a free quote\n• Our service areas\n• Working with us\n• Contact information";
    }

    // Services - General
    if (text.includes('service') || text.includes('clean') || text.includes('que hacen') || text.includes('offer') || text.includes('servicio')) {
        return "🧹 We provide a full range of professional exterior cleaning services:\n\n🏢 Commercial Soft Washing\n💧 High Pressure Cleaning\n🏠 Roof Cleaning & Restoration\n🪟 Window Cleaning\n⚠️ Anti-Slip Treatments\n🏫 School & Childcare Cleaning\n🏛️ Municipal & Council Cleaning\n🏭 Industrial Facility Cleaning\n\nWould you like details on any specific service? Or call us at 📞 0433 373 942 for a free consultation!";
    }

    // Pressure washing / high pressure
    if (text.includes('pressure') || text.includes('presion') || text.includes('wash')) {
        return "💧 Our High Pressure Cleaning service is perfect for:\n\n• Driveways & pathways\n• Car parks & loading docks\n• Concrete & paved surfaces\n• Industrial floors\n• Building exteriors\n\nWe use commercial-grade equipment for outstanding results. Call 📞 0433 373 942 for a free quote!";
    }

    // Soft washing
    if (text.includes('soft')) {
        return "🏢 Soft Washing is our specialty! It's a low-pressure cleaning method ideal for:\n\n• Painted surfaces\n• Rendered walls\n• Delicate building facades\n• Roofs & gutters\n• Any surface that could be damaged by high pressure\n\nIt's safe, effective, and eco-friendly. Contact us at 📞 0433 373 942!";
    }

    // Roof cleaning
    if (text.includes('roof') || text.includes('techo') || text.includes('tejado')) {
        return "🏠 Our Roof Cleaning & Restoration services include:\n\n• Moss & lichen removal\n• High pressure & soft wash roof cleaning\n• Roof painting & sealing\n• Gutter cleaning\n• Full roof restoration\n\nWe work with tile, metal, and Colorbond roofs across South East Queensland. Call 📞 0433 373 942!";
    }

    // Window cleaning
    if (text.includes('window') || text.includes('ventana') || text.includes('glass') || text.includes('vidrio')) {
        return "🪟 Our Window Cleaning services cover:\n\n• Commercial building windows\n• Shopfront glass\n• High-rise window cleaning\n• Frame & sill cleaning\n• Post-construction glass cleaning\n\nWe ensure streak-free, crystal clear results every time! Call 📞 0433 373 942.";
    }

    // Anti-slip
    if (text.includes('slip') || text.includes('anti') || text.includes('antideslizante') || text.includes('safety') || text.includes('seguridad')) {
        return "⚠️ Our Anti-Slip Treatment services help prevent accidents:\n\n• Floor safety assessments\n• Anti-slip coatings for tiles, concrete & stone\n• Compliant with Australian safety standards\n• Ideal for commercial, industrial & public areas\n• Long-lasting protection\n\nKeep your premises safe! Call 📞 0433 373 942 for an assessment.";
    }

    // School / childcare cleaning
    if (text.includes('school') || text.includes('escuela') || text.includes('childcare') || text.includes('education') || text.includes('colegio')) {
        return "🏫 We specialise in School & Childcare Facility Cleaning:\n\n• Playground equipment cleaning\n• Building exterior washing\n• Pathway & courtyard cleaning\n• Gum & graffiti removal\n• Safe, child-friendly cleaning products\n\nWe understand the importance of maintaining safe, clean environments for children. Call 📞 0433 373 942!";
    }

    // Municipal / council
    if (text.includes('municipal') || text.includes('council') || text.includes('government') || text.includes('gobierno')) {
        return "🏛️ We work with Local Councils & Government bodies providing:\n\n• Public space & footpath cleaning\n• Park & recreation area maintenance\n• Bus shelter & street furniture cleaning\n• Graffiti removal\n• Large-scale municipal projects\n\nWe're experienced in managing large public contracts. Call 📞 0433 373 942!";
    }

    // Industrial
    if (text.includes('industrial') || text.includes('factory') || text.includes('warehouse') || text.includes('fabrica') || text.includes('bodega')) {
        return "🏭 Our Industrial Cleaning services include:\n\n• Factory & warehouse floor cleaning\n• Loading dock & bay cleaning\n• Machinery & equipment exterior cleaning\n• Oil & chemical spill remediation\n• Large facility maintenance programs\n\nWe handle even the toughest industrial cleaning jobs. Call 📞 0433 373 942!";
    }

    // Contact / phone / email
    if (text.includes('contact') || text.includes('phone') || text.includes('telefono') || text.includes('contacto') || text.includes('call') || text.includes('email') || text.includes('correo') || text.includes('reach') || text.includes('talk')) {
        return "📞 Here's how to reach us:\n\n👤 Manager: Matt Lacey\n📱 Phone: 0433 373 942\n✉️ Email: info@activecfs.com.au\n🌐 Website: www.activecfs.com.au\n📍 Location: South East Queensland, Australia\n\nYou can also visit our Contact Us page to send an enquiry directly!";
    }

    // Location / area / where
    if (text.includes('location') || text.includes('where') || text.includes('ubicacion') || text.includes('donde') || text.includes('area') || text.includes('brisbane') || text.includes('gold coast') || text.includes('sunshine')) {
        return "📍 We are based in South East Queensland, Australia.\n\nOur service area covers:\n• Brisbane\n• Gold Coast\n• Sunshine Coast\n• Ipswich\n• Logan\n• Redlands\n• And surrounding regions\n\nNo matter where you are in SEQ, we can help! Call 📞 0433 373 942.";
    }

    // Price / quote / cost
    if (text.includes('price') || text.includes('cost') || text.includes('quote') || text.includes('precio') || text.includes('cotizacion') || text.includes('how much') || text.includes('cuanto') || text.includes('estimate') || text.includes('budget') || text.includes('free')) {
        return "💰 We offer FREE quotes and corporate consultations!\n\nEvery cleaning project is unique, so we provide tailored pricing based on:\n• Type of surface\n• Size of the area\n• Level of cleaning required\n• Frequency of service\n\n✅ No obligation, no hidden fees!\n\nCall 📞 0433 373 942 or visit our Contact Us page to request your free quote today!";
    }

    // Job / work / employment
    if (text.includes('job') || text.includes('trabajo') || text.includes('empleo') || text.includes('hire') || text.includes('career') || text.includes('apply') || text.includes('position') || text.includes('vacancy') || text.includes('join')) {
        return "🤝 Want to join the Active Cleaning team?\n\nWe're always looking for reliable, hardworking people!\n\n• Full Time & Part Time positions available\n• Work across South East Queensland\n• Supportive team environment\n\n👉 Click on \"Work With Us\" in the menu to fill out your application form. We'll review it and contact you soon!";
    }

    // About / company / who
    if (text.includes('about') || text.includes('company') || text.includes('who') || text.includes('acerca') || text.includes('empresa') || text.includes('quienes')) {
        return "🏢 Active Cleaning and Facility Services is a professional exterior cleaning company based in Queensland, Australia.\n\n✅ We specialise in commercial, industrial & municipal cleaning\n✅ Led by Manager Matt Lacey\n✅ 100% Satisfaction Guarantee\n✅ Experienced, professional team\n✅ Eco-friendly cleaning solutions\n\nVisit our About Us page to learn more, or call 📞 0433 373 942!";
    }

    // Mission / vision
    if (text.includes('mission') || text.includes('vision') || text.includes('mision') || text.includes('values') || text.includes('valores')) {
        return "🎯 Our Mission:\nTo deliver exceptional exterior cleaning services that exceed client expectations, using industry-leading techniques and environmentally responsible practices.\n\n🔭 Our Vision:\nTo be Queensland's most trusted and reliable exterior cleaning company, known for quality, integrity, and outstanding customer service.\n\nVisit our Mission & Vision page for more details!";
    }

    // Why choose us / guarantee
    if (text.includes('why') || text.includes('choose') || text.includes('guarantee') || text.includes('garantia') || text.includes('advantage') || text.includes('better') || text.includes('best') || text.includes('difference')) {
        return "⭐ Why Choose Active Cleaning?\n\n✅ 100% Satisfaction Guarantee\n✅ Professional, experienced team\n✅ Commercial-grade equipment\n✅ Eco-friendly cleaning solutions\n✅ Fully insured & compliant\n✅ Free quotes & consultations\n✅ Servicing all of South East Queensland\n✅ Managed by Matt Lacey\n\nWe take pride in every job we do! Call 📞 0433 373 942.";
    }

    // Website
    if (text.includes('website') || text.includes('web') || text.includes('sitio') || text.includes('pagina') || text.includes('url') || text.includes('link')) {
        return "🌐 Visit our official website at:\nwww.activecfs.com.au\n\nThere you can find all the information about our services, request a quote, and get in touch with our team!";
    }

    // Manager / Matt
    if (text.includes('manager') || text.includes('matt') || text.includes('lacey') || text.includes('owner') || text.includes('boss') || text.includes('jefe') || text.includes('dueño')) {
        return "👤 Our company is managed by Matt Lacey.\n\nMatt leads the Active Cleaning team with a commitment to quality, reliability, and customer satisfaction.\n\nYou can reach Matt directly at:\n📱 0433 373 942\n✉️ info@activecfs.com.au";
    }

    // Hours / availability / schedule
    if (text.includes('hour') || text.includes('open') || text.includes('available') || text.includes('horario') || text.includes('schedule') || text.includes('time') || text.includes('when')) {
        return "🕐 We operate Monday to Saturday across South East Queensland.\n\nFor specific availability or to schedule a service, please contact us:\n📱 0433 373 942\n✉️ info@activecfs.com.au\n\nWe're flexible and can work around your schedule!";
    }

    // Thanks / bye
    if (text.includes('thank') || text.includes('gracias') || text.includes('bye') || text.includes('adios') || text.includes('cheers') || text.includes('ta')) {
        return "You're welcome! 😊 Thank you for choosing Active Cleaning and Facility Services.\n\nIf you need anything else, don't hesitate to ask. Have a great day! 🌟\n\n📞 0433 373 942 | ✉️ info@activecfs.com.au";
    }

    // Help menu
    if (text.includes('help') || text.includes('ayuda') || text.includes('menu') || text.includes('options') || text.includes('can you')) {
        return "I can help you with:\n\n🧹 Services - What we offer\n💰 Quotes - Free estimates\n📍 Location - Where we work\n📞 Contact - Phone, email & manager\n🤝 Jobs - Work with us\n🏢 About Us - Our company\n🎯 Mission & Vision\n⭐ Why Choose Us\n\nJust type your question and I'll do my best to help!";
    }

    // Default response
    return "Thanks for your message! 😊 I'm the Active Cleaning Assistant.\n\nHere are some things I can help with:\n• Our cleaning services\n• Free quotes & pricing\n• Contact details\n• Service areas in Queensland\n• Job opportunities\n\nOr call us directly at 📞 0433 373 942 — we're happy to help!";
}

function handleSendMessageGlobal() {
    const chatbotText = document.getElementById('chatbot-text');
    const chatbotMessages = document.getElementById('chatbot-messages');
    if (!chatbotText || !chatbotMessages) return;

    const message = chatbotText.value.trim();
    if (message === '') return;

    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user';
    userDiv.textContent = message;
    chatbotMessages.appendChild(userDiv);
    chatbotText.value = '';

    // Auto-scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Generate bot response
    const botResponse = getBotResponse(message);

    // Simulated bot response delay
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot';
        botDiv.innerHTML = botResponse.replace(/\n/g, '<br>');

        chatbotMessages.appendChild(botDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 700 + Math.random() * 600);
}

document.body.addEventListener('click', function (e) {
    const toggleBtn = e.target.closest('#chatbot-toggle');
    if (toggleBtn) {
        const windowEl = document.getElementById('chatbot-window');
        if (windowEl) {
            windowEl.classList.add('active');
            toggleBtn.style.transform = 'scale(0)';
        }
    }

    const closeBtn = e.target.closest('#chatbot-close');
    if (closeBtn) {
        const windowEl = document.getElementById('chatbot-window');
        if (windowEl) {
            windowEl.classList.remove('active');
            const botToggle = document.getElementById('chatbot-toggle');
            if (botToggle) {
                setTimeout(() => { botToggle.style.transform = 'scale(1)'; }, 300);
            }
        }
    }

    const sendBtn = e.target.closest('#chatbot-send');
    if (sendBtn) {
        handleSendMessageGlobal();
    }
});

document.body.addEventListener('keypress', function (e) {
    if (e.target && e.target.id === 'chatbot-text' && e.key === 'Enter') {
        handleSendMessageGlobal();
    }
});
