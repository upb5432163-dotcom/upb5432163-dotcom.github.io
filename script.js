// ==========================================
// 1. CONTROL DE SIDEBAR Y OVERLAY
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

menuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
});

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
}

sidebarOverlay.addEventListener('click', closeSidebar);

const menuLinks = document.querySelectorAll('.sidebar-links a');
menuLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// ==========================================
// 2. MOTOR HERO SLIDER (6 SEG)
// ==========================================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;
const slideDuration = 6000;

function initSlider() {
    animateProgressBar(currentSlide);
    slideInterval = setInterval(nextSlide, slideDuration);
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function goToSlide(n) {
    clearInterval(slideInterval);
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    const currentProgress = dots[currentSlide].querySelector('.progress-bar');
    currentProgress.style.transition = 'none';
    currentProgress.style.width = '0%';

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    void dots[currentSlide].offsetWidth; // Reflow
    
    animateProgressBar(currentSlide);
    slideInterval = setInterval(nextSlide, slideDuration);
}

function animateProgressBar(index) {
    const activeProgress = dots[index].querySelector('.progress-bar');
    
    setTimeout(() => {
        if (dots[index].classList.contains('active')) {
            activeProgress.style.transition = `width ${slideDuration - 50}ms linear`;
            activeProgress.style.width = '100%';
        }
    }, 50);
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        if (index !== currentSlide) {
            const oldProgress = dots[currentSlide].querySelector('.progress-bar');
            oldProgress.style.transition = 'none';
            oldProgress.style.width = '0%';
            goToSlide(index);
        }
    });
});

// ==========================================
// 3. GENERACIÓN DINÁMICA DE LAS 60 FOTOS
// ==========================================
const photoFiles = [
    "Agua_seda.JPG", "Animales_1.JPG", "Arquitectura_1.JPG", "Ascenso_mustallar.JPG", "Barca.JPG",
    "Botas.JPG", "Camino.JPG", "Camino_piedras.JPG", "Carretera_nevada.JPG", "Casa_piedra_vertical.JPG",
    "Cervecina.jpg", "Cima_mustallar.JPG", "Estadio.JPG", "Estadio_bilbao.JPG", "Estatua.JPG",
    "Faro.JPG", "Faro_2.JPG", "Florero.JPG", "Foto_arena_playa.JPG", "Foto_casa.JPG",
    "Foto_casa_piedra.JPG", "Foto_gaiteiro.JPG", "Foto_nevado.JPG", "Foto_paisaje_1.JPG", "Foto_sil.JPG",
    "Foto_silueta.JPG", "Foto_tren.JPG", "Fuente.JPG", "Gato.JPG", "Gaviota.JPG",
    "Iberdrola.JPG", "Logo.jpg", "Loro_ravachol.JPG", "Mama_1.jpeg", "Mama_3.jpg",
    "MCDU.JPG", "Mirando_gatos.JPG", "Natural.JPG", "Objeto_1.JPG", "Paisaje_3.JPG",
    "Paisaje_4.JPG", "Paseo_monte.JPG", "Queimada.JPG", "Regalo_grupos_foliada.JPG", "Reloj.JPG",
    "Reloj_2.JPG", "Retrato_1.JPG", "Retrato_2.JPG", "Retrato_3.JPG", "Retrato_4.JPG",
    "Retrato_5.JPG", "Retrato_6.JPG", "Retrato_7.JPG", "Rio_sil_2.JPG", "Senales.JPG"
];

function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    photoFiles.forEach(fileName => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = `assets/fotos/${fileName}`;
        img.alt = fileName.split('.')[0].replace(/_/g, ' ');
        img.classList.add('gallery-img');
        img.loading = "lazy";

        img.addEventListener('click', () => {
            openLightbox(img.src, img.alt);
        });

        item.appendChild(img);
        galleryGrid.appendChild(item);
    });
}

// ==========================================
// 4. LÓGICA DEL LIGHTBOX
// ==========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-content');
const lightboxClose = lightbox.querySelector('.lightbox-close');

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
    setTimeout(() => {
        lightboxImg.src = "";
    }, 400);
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
});

// ==========================================
// 5. TRADUCCIONES Y BOTONES DE IDIOMA
// ==========================================
const translations = {
    es: {
        "nav-home": "Inicio",
        "nav-about": "Sobre mí",
        "nav-photos": "Fotos",
        "nav-videos": "Vídeos",
        "nav-contact": "Contacto",
        "about-title": "Sobre mí",
        "about-p1": "Fotógrafo, editor y realizador audiovisual enfocado en capturar la máxima fidelidad visual y técnica.",
        "about-p2": "Especializado en la creación de narrativas visuales de alto impacto, flujos de trabajo avanzados en gestión de color y postproducción digital rigurosa.",
        "photos-title": "Fotos",
        "photos-text": "Galerías fotográficas de paisaje, retratos editoriales y capturas de alta resolución con un cuidado milimétrico del detalle.",
        "videos-title": "Vídeos",
        "videos-text": "Producciones cinematográficas, clips de alta fidelidad y flujos de trabajo en color profesional.",
        "contact-title": "Contacto",
        "contact-text": "¿Tienes un proyecto en mente? Hablemos para llevarlo al siguiente nivel técnico y visual."
    },
    en: {
        "nav-home": "Home",
        "nav-about": "About me",
        "nav-photos": "Photos",
        "nav-videos": "Videos",
        "nav-contact": "Contact",
        "about-title": "About me",
        "about-p1": "Photographer, editor, and audiovisual filmmaker focused on capturing maximum visual and technical fidelity.",
        "about-p2": "Specialized in creating high-impact visual narratives, advanced color management workflows, and rigorous digital post-production.",
        "photos-title": "Photos",
        "photos-text": "Photographic galleries of landscapes, editorial portraits, and high-resolution captures with meticulous attention to detail.",
        "videos-title": "Videos",
        "videos-text": "Cinematic productions, high-fidelity clips, and professional color workflows.",
        "contact-title": "Contact",
        "contact-text": "Have a project in mind? Let's talk to take it to the next technical and visual level."
    }
};

const langButtons = document.querySelectorAll('.lang-selector .lang-btn');

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedLang = button.getAttribute('data-lang');
        translatePage(selectedLang);
    });
});

function translatePage(lang) {
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const elementsToTranslate = document.querySelectorAll('[data-key]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Inicialización general del DOM
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    loadGallery();
});