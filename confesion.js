document.addEventListener('DOMContentLoaded', () => {
    const confessionText = document.getElementById('confession-text');
    const centralHeart = document.getElementById('central-heart');
    const loveMessagesContainer = document.getElementById('love-messages-container');
    const song = document.getElementById('background-song');
    const videoContainer = document.querySelector('.video-container');
    const musicPlayer = document.getElementById('music-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const welcomeScreen = document.getElementById('welcome-screen');
    
    // === NUEVO: Referencia al contenedor de stickers ===
    const stickerContainer = document.getElementById('sticker-container');

    const lovePhrases = [
        "Te pienso, luego existes en mí", "Contigo el tiempo se detiene", "Donde habita mi alma, habitas tú", "Te encontré aunque no te buscaba...",
        "Mi amor es eterno!", "Alguien leé esto?", "Te SUPER HIPER MEGA AMOOO", "A tu lado, soy feliz",
        "Te quiero tal y como eres", "Eres mi Todo...", "Me enamoro cada día más de ti",
        "Eres mi refugio favorito"
    ];

    let isPlaying = false;
    let hasStarted = false;

    // --- LÓGICA DE INICIO CON EL CLIC DEL USUARIO ---
    welcomeScreen.addEventListener('click', () => {
        if (!hasStarted) {
            welcomeScreen.classList.add('fade-out');
            setTimeout(() => {
                welcomeScreen.remove();
                videoContainer.classList.remove('hidden-container');
                videoContainer.classList.add('show-container');
                musicPlayer.classList.remove('hidden-player');
                musicPlayer.classList.add('show-player');
                startConfession();
                playSong();
                hasStarted = true;
            }, 1000);
        }
    });

    function playSong() {
        song.play().then(() => {
            isPlaying = true;
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        }).catch(error => {
            console.log("Error en la reproducción automática: ", error);
        });
    }

    // --- LÓGICA DEL REPRODUCTOR DE MÚSICA ---
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            song.pause();
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        } else {
            song.play();
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        }
        isPlaying = !isPlaying;
    });

    song.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(song.duration / 60);
        const seconds = Math.floor(song.duration % 60);
        durationEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        song.currentTime = 193; 
    });

    song.addEventListener('timeupdate', () => {
        const minutes = Math.floor(song.currentTime / 60);
        const seconds = Math.floor(song.currentTime % 60);
        currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });

    // --- FUNCIÓN PARA GENERAR MENSAJES ---
    function createLoveMessage() {
        const message = document.createElement('div');
        message.classList.add('chat-bubble');
        
        let randomPhrase;
        do {
            randomPhrase = lovePhrases[Math.floor(Math.random() * lovePhrases.length)];
        } while (message.innerText === randomPhrase);

        message.innerText = randomPhrase;

        const endX = Math.random() * (window.innerWidth * 0.7) - (window.innerWidth * 0.35); 
        const endY = Math.random() * (window.innerHeight * 0.6) - (window.innerHeight * 0.3);

        message.style.setProperty('--x-pos', `${endX}px`);
        message.style.setProperty('--y-pos', `${endY}px`);
        message.style.setProperty('--rotation', `${(Math.random() - 0.5) * 10}deg`);

        loveMessagesContainer.appendChild(message);

        message.addEventListener('animationend', () => {
            message.remove();
        });
    }

    // === NUEVA FUNCIÓN PARA GENERAR STICKERS FLOTANTES ===
    function createFloatingSticker() {
        const sticker = document.createElement('img');
        sticker.classList.add('floating-sticker');

        // Elige un número de sticker al azar entre 1 y 10
        const stickerNumber = Math.floor(Math.random() * 10) + 1;
        sticker.src = `assets/stiker${stickerNumber}.jpeg`;

        // Posición horizontal aleatoria
        sticker.style.left = `${Math.random() * 95}vw`;

        // Duración de la animación aleatoria para que no se vean iguales
        sticker.style.animationDuration = `${Math.random() * 5 + 6}s`; // Entre 6 y 11 segundos

        // Añade el sticker al contenedor
        stickerContainer.appendChild(sticker);

        // Elimina el sticker del DOM cuando la animación termine para no sobrecargar la página
        sticker.addEventListener('animationend', () => {
            sticker.remove();
        });
    }
    // =======================================================

    // --- LÓGICA DE INICIO DE LAS ANIMACIONES ---
    function startConfession() {
        centralHeart.classList.remove('hidden');

        setTimeout(() => {
            confessionText.classList.remove('hidden');
            confessionText.classList.add('show');
        }, 1500);

        setTimeout(() => {
            const heartImage = document.querySelector('.heart-image');
            heartImage.classList.remove('hidden');
            heartImage.classList.add('show');
            
            setInterval(createLoveMessage, 1500);

            // === NUEVO: Inicia la creación de stickers ===
            setInterval(createFloatingSticker, 700); // Crea un sticker nuevo cada 700ms
            // =============================================
        }, 3000);
    }
});