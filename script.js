document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DEL DOM ---
    const videoContainer = document.querySelector('.video-container'); // Contenedor principal
    const heart = document.getElementById('heart'); // El corazón
    const messagesContainer = document.getElementById('messages-container');
    const song = document.getElementById('background-song');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');

    // --- CONFIGURACIÓN DE FRASES FLOTANTES ---
    const floatingPhrases = [
        "No te vayas nunca... ⏳", "Por favor... ✨",
        "Gracias por existir ☀️", "tE SuPer Hiper! Mega!! AMOOO🪄",
        "Te amaré por SIempreee 🔥", "Eres mi canción favorita 🎵",
        "A tu lado, soy feliz 😊", "Te amare en esta y en todas mis vidas!💡",
        "Eres mi lugar seguro... 🏡"
    ];
    const animationClasses = ['anim-1', 'anim-2', 'anim-3'];
    const messageInterval = 2000;

    // --- NUEVA SECCIÓN: FRASES AL HACER CLIC EN EL CORAZÓN ---

    // 1. Lista de frases para los clics
    const clickPhrases = [
        "Te quiero ❤️", "Te Amo", "Mega", "Amo", "💖",
        "Super", "Hiper", "Te✨"
    ];

    // 2. Event listener para el clic en el corazón
    heart.addEventListener('click', (event) => {
        createClickPhrase(event.clientX, event.clientY);
        createHeartPop(event.clientX, event.clientY);
        
    });
    function createHeartPop(x, y) {
    const heartPop = document.createElement('div');
    heartPop.innerText = '❤️';
    heartPop.classList.add('heart-pop-anim');
    heartPop.style.left = `${x}px`;
    heartPop.style.top = `${y}px`;
    videoContainer.appendChild(heartPop);
    heartPop.addEventListener('animationend', () => heartPop.remove());
    }
// Llama a esta función dentro de tu event listener del clic
// createHeartPop(event.clientX, event.clientY);

    function createClickPhrase(x, y) {
        const phrase = document.createElement('div');
        phrase.classList.add('click-phrase');
        phrase.innerText = getRandomItem(clickPhrases);
        phrase.style.left = `${x}px`;
        phrase.style.top = `${y}px`;
        videoContainer.appendChild(phrase);

        phrase.addEventListener('animationend', () => {
            phrase.remove();
        });
    }
    // 3. Función para crear una frase en la posición del clic


    // --- LÓGICA DEL REPRODUCTOR (sin cambios) ---
    song.addEventListener('timeupdate', () => {
        const progressPercent = (song.currentTime / song.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(song.currentTime);
    });
    song.addEventListener('loadedmetadata', () => {
        totalDurationEl.textContent = formatTime(song.duration);
    });
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    song.play().catch(error => {
        console.warn("La reproducción automática fue bloqueada.");
        document.body.addEventListener('click', () => song.play(), { once: true });
    });

    // --- LÓGICA DE MENSAJES FLOTANTES (casi sin cambios) ---
    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function createFloatingMessage() {
        const bubble = document.createElement('div');
        bubble.classList.add('message-bubble');
        bubble.innerText = getRandomItem(floatingPhrases); // Usa la lista de frases flotantes
        bubble.classList.add(getRandomItem(animationClasses));
        bubble.style.bottom = `${Math.random() * 20}%`;
        bubble.style.left = `${15 + Math.random() * 70}%`;
        messagesContainer.appendChild(bubble);

        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }

    setInterval(createFloatingMessage, messageInterval);
    
    // --- NUEVAS VARIABLES PARA LA CONFESIÓN ---
    const confessionButton = document.getElementById('confession-button');
    const confessionSection = document.getElementById('confession-section');
    const dedicationSection = document.querySelector('.video-container'); // Es tu contenedor principal

    const confessionText = document.getElementById('confession-text');
    const stem = document.querySelector('.stem');
    const flowers = document.querySelectorAll('.flower');

    // Oculta el corazón y el reproductor al inicio de la confesión
    function hideDedication() {
        dedicationSection.style.opacity = '0';
        dedicationSection.style.visibility = 'hidden';
    }

    // Muestra la confesión y activa sus animaciones
    function showConfession() {
        confessionSection.classList.add('show');
        
        // Muestra y anima el tallo
        stem.classList.remove('hidden');
        
        // Muestra y anima las flores una a una
        setTimeout(() => {
            flowers.forEach(flower => {
                flower.classList.add('show');
            });
        }, 1000); // Espera a que el tallo crezca un poco

        // Muestra el texto después de que las flores hayan "florecido"
        setTimeout(() => {
            confessionText.classList.remove('hidden');
            confessionText.classList.add('show');
        }, 3000); // Ajusta este tiempo según tus animaciones
    }

    // --- LÓGICA DE TRANSICIÓN ---
    confessionButton.addEventListener('click', () => {
        
        // Desvanecer el reproductor y las frases flotantes
    // Esto hará una transición suave sin cortar el fondo
    const musicPlayer = document.querySelector('.music-player');
    const heart = document.getElementById('heart');
    const messagesContainer = document.getElementById('messages-container');

    musicPlayer.style.opacity = '0';
    heart.style.opacity = '0';
    messagesContainer.style.opacity = '0';


        // Oculta el botón
        confessionButton.style.display = 'none';

        // Oculta la dedicatoria principal con una transición
        hideDedication();

        // Muestra la sección de confesión después de un breve retraso
        setTimeout(showConfession, 1000); // Espera a que la primera sección se desvanezca
    });

});
