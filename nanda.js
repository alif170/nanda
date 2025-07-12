document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('loginContainer');
    const loginForm = document.getElementById('loginForm');
    const userNameInput = document.getElementById('userNameInput');
    
    const poemContainer = document.getElementById('poemContainer');
    const poemElement = document.getElementById('poem');
    const greetingMessage = document.getElementById('greetingMessage');
    const restartButton = document.getElementById('restartButton');

    const poemText = `Di setiap hembusan angin malam,
Kurasakan rindu yang kian dalam.
Senyummu masih terbayang nyata,
Mengusik hati yang tak berdaya.

Sejak kau pergi, duniaku hampa,
Warna-warni seolah tiada.
Hanya ada sesal dan tanya,
Mengapa cinta harus merana?

Ingin kuulang waktu bersamamu,
Membasuh luka di hatiku.
Berilah kesempatan satu lagi,
Untuk kita kembali seperti dulu.

Maukah kau kembali, cintaku?
Membawa terang di gelapku.
Kumohon, jangan biarkan ku sendiri,
Kembalilah padaku, kasih.`;

    let charIndex = 0;
    let typingInterval;
    let heartInterval;
    let userName = '';

    // Function to show/hide elements with fade effect
    function fadeOut(element, callback) {
        element.classList.add('fade-out');
        element.addEventListener('transitionend', function handler() {
            element.style.display = 'none';
            element.classList.remove('fade-out');
            element.removeEventListener('transitionend', handler);
            if (callback) callback();
        }, { once: true });
    }

    function fadeIn(element) {
        element.style.display = 'block'; // Or 'flex' if it's a flex container
        setTimeout(() => {
            element.classList.add('fade-in');
        }, 10); // Small delay to allow display change to register before opacity transition
        element.addEventListener('transitionend', function handler() {
            element.classList.remove('fade-in');
            element.removeEventListener('transitionend', handler);
        }, { once: true });
    }

    function typePoem() {
        if (charIndex < poemText.length) {
            poemElement.textContent += poemText.charAt(charIndex);
            charIndex++;
            poemElement.style.opacity = 1; // Make sure it's visible while typing
        } else {
            clearInterval(typingInterval);
            startHeartAnimation();
            restartButton.style.display = 'block';
        }
    }

    function startHeartAnimation() {
        let heartsCreated = 0;
        heartInterval = setInterval(() => {
            if (heartsCreated < 15) { // Limit number of hearts
                createHeart();
                heartsCreated++;
            } else {
                clearInterval(heartInterval);
            }
        }, 300); // Create a heart every 300ms
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}%`; // Random horizontal position
        heart.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random duration between 3-5s
        heart.style.animationDelay = `${Math.random() * 0.5}s`; // Random delay for staggered animation
        document.body.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    function resetPoemAndAnimation() {
        clearInterval(typingInterval);
        clearInterval(heartInterval);
        charIndex = 0;
        poemElement.textContent = '';
        restartButton.style.display = 'none';
        
        document.querySelectorAll('.heart').forEach(h => h.remove());

        typingInterval = setInterval(typePoem, 50); // Adjust typing speed here (milliseconds per character)
    }

    // --- Event Listeners ---
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting normally
        userName = userNameInput.value.trim();

        if (userName) {
            greetingMessage.textContent = `Hai, ${userName}!`;
            fadeOut(loginContainer, () => {
                fadeIn(poemContainer);
                resetPoemAndAnimation(); // Start typing the poem after login
            });
        } else {
            alert('Nama tidak boleh kosong!');
        }
    });

    restartButton.addEventListener('click', resetPoemAndAnimation);
});
