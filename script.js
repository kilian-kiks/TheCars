// ==========================================
// 1. GESTION DU THÈME (JOUR / NUIT)
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    // On bascule entre le mode clair et le mode sombre
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Appliquer le thème sauvegardé au chargement de la page
if (localStorage.getItem('theme') === 'light') {
    body.setAttribute('data-theme', 'light');
}

// ==========================================
// 2. GESTION DU BLOC-NOTES ET FORMULAIRE
// ==========================================
const carForm = document.getElementById('car-form');
const notebookContent = document.getElementById('notebook-content');
const clearBtn = document.getElementById('clear-notebook');

// Fonction pour lire les notes dans la mémoire et les afficher
function afficherNotes() {
    const notes = JSON.parse(localStorage.getItem('mesVoitures')) || [];
    
    if (notes.length === 0) {
        notebookContent.innerHTML = '<p class="empty-msg">Aucune suggestion pour le moment.</p>';
        return;
    }

    notebookContent.innerHTML = notes.map(n => `
        <div class="note-item">
            <strong>${n.voiture}</strong> - par ${n.nom}<br>
            <small>${n.info}</small>
        </div>
    `).join('');
}

// Écouteur pour l'envoi du formulaire
carForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const nouvelleNote = {
        nom: document.getElementById('user-name').value,
        voiture: document.getElementById('car-model').value,
        info: document.getElementById('car-info').value
    };

    // Récupération, ajout et sauvegarde
    const notes = JSON.parse(localStorage.getItem('mesVoitures')) || [];
    notes.push(nouvelleNote);
    localStorage.setItem('mesVoitures', JSON.stringify(notes));
    
    afficherNotes(); // Mise à jour visuelle
    carForm.reset(); // On vide les champs du formulaire
    alert("Suggestion enregistrée dans le bloc-notes !");
});

// Remplacer l'ancien écouteur d'événement par celui-ci
clearBtn.addEventListener('click', () => {
    const codeAdmin = "!admin_Overtagz!"; // Choisis ton code ici
    const saisie = prompt("Veuillez entrer le code administrateur pour vider le bloc-notes :");

    if (saisie === codeAdmin) {
        if (confirm('Êtes-vous sûr de vouloir supprimer TOUTES les suggestions ?')) {
            localStorage.removeItem('mesVoitures');
            afficherNotes();
        }
    } else {
        alert("Code incorrect. Action annulée.");
    }
});

// ==========================================
// 3. FONCTIONS D'INFORMATION DES CARTES
// ==========================================
function infoBugatti() {
    alert("🛠 Bugatti Chiron :\n- 1500 chevaux (Moteur W16)\n- Assemblage à la main à Molsheim\n- 0 à 100 km/h en 2.4 secondes.");
}

function infoFerrari() {
    alert("🏎 Ferrari LaFerrari :\n- 963 chevaux (V12 Hybride)\n- Technologie issue de la Formule 1\n- Produite à seulement 499 exemplaires.");
}

// Initialisation au chargement de la page
afficherNotes();
function infoPorsche() {
    alert("La Porsche 911 GT3 est la reine des circuits, célèbre pour son moteur atmosphérique qui monte à 9000 tr/min.");
}

function infoLambo() {
    alert("L'Aventador SVJ utilise le système ALA (Aerodinamica Lamborghini Attiva) pour coller à la route dans les virages.");
}
function infoMcLaren() {
    alert("La McLaren P1 est une hybride révolutionnaire. Elle peut rouler en mode 100% électrique ou libérer ses 916 ch sur piste !");
}

function infoBMW() {
    alert("BMW M3 Compétition 2024 :\n- Moteur : 3.0L 6 cylindres en ligne\n- 0 à 100 km/h : 3,5 secondes\n- Particularité : Elle dispose d'un mode 'Drift Analyzer' pour mesurer vos performances sur circuit !");
}
// Fonction universelle pour dérouler les infos
function toggleDetails(button) {
    // On cible l'élément juste après le bouton (le div .details-content)
    const content = button.nextElementSibling;
    
    // On ajoute ou enlève la classe "open"
    content.classList.toggle('open');
    
    // On change le texte du bouton pour plus de réalisme
    if (content.classList.contains('open')) {
        button.textContent = "Fermer";
    } else {
        button.textContent = "Détails";
    }
}

// Gestion du formulaire de suggestion (Vérifie qu'il n'est pas écrit deux fois !)
const suggestionForm = document.getElementById('car-form');
if (suggestionForm) {
    suggestionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Suggestion bien reçue !");
        suggestionForm.reset();
    });

}
