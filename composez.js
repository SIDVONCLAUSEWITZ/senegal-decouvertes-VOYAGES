// Configuration
const PHONE_NUMBER = '+221773563260';
const EMAIL = 'sidney4work@gmail.com';

// Fonction pour récupérer toutes les données du formulaire
function getFormData() {
    const formData = {
        nom: document.getElementById("nom").value.trim(),
        email: document.getElementById("email").value.trim(),
        voyageurs: document.getElementById("voyageurs").value || "0",
        enfants: document.getElementById("enfants").value || "0",
        dateArrivee: document.getElementById("dateArrivee").value || "À définir",
        duree: document.getElementById("duree").value || "À définir",
        budget: document.getElementById("budget").value || "Non précisé",
        hebergement: document.getElementById("hebergement").value || "Pas de préférence",
        mobilite: document.getElementById("mobilite").value || "Bonne mobilité",
        message: document.getElementById("message").value.trim()
    };

    // Récupérer les centres d'intérêts sélectionnés
    const selectedInterests = [];
    document.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
        selectedInterests.push(checkbox.value);
    });
    
    const otherInterests = document.getElementById("interets").value.trim();
    if (otherInterests) {
        selectedInterests.push(otherInterests);
    }
    
    formData.interets = selectedInterests.length > 0 ? selectedInterests.join(', ') : "Non précisé";

    // Récupérer les régions sélectionnées
    const selectedRegions = [];
    document.querySelectorAll('input[name="regions"]:checked').forEach(checkbox => {
        selectedRegions.push(checkbox.value);
    });
    
    formData.regions = selectedRegions.length > 0 ? selectedRegions.join(', ') : "Toutes régions";

    return formData;
}

// Fonction pour formater le message
function formatMessage(data) {
    const totalPersonnes = parseInt(data.voyageurs) + parseInt(data.enfants);
    
    return `🇸🇳 DEMANDE DE CIRCUIT SUR-MESURE

👤 INFORMATIONS PERSONNELLES
• Nom : ${data.nom}
• Email : ${data.email}

👥 GROUPE DE VOYAGE
• Voyageurs (+10 ans) : ${data.voyageurs}
• Enfants (2-10 ans) : ${data.enfants}
• Total : ${totalPersonnes} personne(s)

📅 DATES & DURÉE
• Date d'arrivée souhaitée : ${data.dateArrivee}
• Durée du séjour : ${data.duree} jours

💰 BUDGET & HÉBERGEMENT
• Budget approximatif : ${data.budget}
• Type d'hébergement : ${data.hebergement}

🌍 THÈMES & RÉGIONS
• Régions souhaitées : ${data.regions}
• Centres d'intérêts : ${data.interets}
• Mobilité : ${data.mobilite}

💬 VOTRE MESSAGE
${data.message}`;
}

// Fonction pour afficher un message à l'utilisateur
function showMessage(type, message) {
    const messageEl = document.querySelector('.form-message');
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = 'block';
}

// Gestion de la soumission via WhatsApp
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();
    if (!data.nom || !data.email) {
        showMessage('error', 'Veuillez remplir les champs obligatoires (Nom et Email).');
        return;
    }

    const formattedMessage = formatMessage(data);
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(whatsappUrl, '_blank');
    showMessage('success', 'Votre demande a été envoyée ! Un onglet WhatsApp s\'est ouvert.');

    // Enregistrer les données en local
    saveFormDataAsJson(data);

    // Réinitialiser le formulaire
    document.getElementById('contactForm').reset();
});

// Fonction utilitaire pour le téléchargement JSON
function saveFormDataAsJson(data) {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `circuit-demande-${data.nom.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Analytics et tracking
function trackFormInteraction(action, element) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'Form_Interaction',
            event_label: element
        });
    }
    console.log(`Form interaction: ${action} - ${element}`);
}

// Suivre les interactions importantes
document.addEventListener('DOMContentLoaded', function() {
    // Track form start
    let formStarted = false;
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', function() {
            if (!formStarted) {
                trackFormInteraction('form_start', 'first_input_focus');
                formStarted = true;
            }
        });
    });
    
    // Track specific field interactions
    document.getElementById('regions')?.addEventListener('change', () => {
        trackFormInteraction('region_selected', this.value);
    });
    
    document.getElementById('budget')?.addEventListener('change', () => {
        trackFormInteraction('budget_selected', this.value);
    });
});

console.log('🇸🇳 Formulaire Sénégal Découvertes chargé - Guide Waly depuis 26 ans');