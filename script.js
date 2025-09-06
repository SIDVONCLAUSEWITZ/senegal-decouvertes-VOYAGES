// Configuration
const PHONE_NUMBER = '+221773563260';
const EMAIL = 'sidney4work@gmail.com';

// Menu actif au scroll
const links = document.querySelectorAll('.menu a');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));

const onScroll = () => {
    const y = scrollY + 100;
    sections.forEach((sec, i) => {
        if (!sec) return;
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        links[i].classList.toggle('active', y >= top && y < bottom);
    });
};

// Écouter le scroll avec performance optimisée
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            onScroll();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Initialiser le menu actif
onScroll();

// Gestion des modals
document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
        const dlg = document.getElementById(btn.dataset.modal);
        if (dlg) {
            dlg.showModal();
            // Empêcher le scroll du body quand modal ouverte
            document.body.style.overflow = 'hidden';
        }
    });
});

document.querySelectorAll('[data-close]').forEach(x => {
    x.addEventListener('click', e => {
        const dialog = e.target.closest('dialog');
        if (dialog) {
            dialog.close();
            // Restaurer le scroll du body
            document.body.style.overflow = 'auto';
        }
    });
});

// Fermer modal en cliquant sur le backdrop
document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
            document.body.style.overflow = 'auto';
        }
    });
});

// WhatsApp deep links
const message = encodeURIComponent('Bonjour Sénégal Découvertes, je souhaite des infos sur vos circuits.');
const wa = `https://wa.me/${PHONE_NUMBER}?text=${message}`;

document.getElementById('wplink').href = wa;
document.getElementById('waFloat').href = wa;

// Gestion du menu mobile
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');
});

// Gérer les images qui ne chargent pas
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.background = 'linear-gradient(45deg, #333, #555)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.innerHTML = '<span style="color: #fff; font-size: 12px;">Image non disponible</span>';
    });
});

// Performance: Précharger les ressources importantes
document.addEventListener('DOMContentLoaded', () => {
    // Précharger les images importantes avec priorité basse
    const criticalImages = [
        './images/hero-bg.jpg',
        './images/circuit1.jpg',
        './images/circuit2.jpg',
        './images/circuit3.jpg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        document.head.appendChild(link);
    });
});

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
    // Ici vous pourriez envoyer l'erreur à un service de monitoring
});

// Message de bienvenue dans la console pour les développeurs curieux
console.log(`
🇸🇳 Sénégal Découvertes - Site développé avec passion
✨ Découvrez le Sénégal avec Waly, guide depuis 26 ans
🌍 Contact: ${PHONE_NUMBER} | ${EMAIL}
`);