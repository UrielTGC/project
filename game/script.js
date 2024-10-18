// script.js
        document.addEventListener("contextmenu", function(e) {
          e.preventDefault();
        });
const cards = document.querySelectorAll('.memory-card');
const attemptsElement = document.getElementById('attempts');
const resetBtn = document.getElementById('reset-btn');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;
let attempts = 0;
const totalPairs = cards.length / 2;

// Función para voltear la carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // Primera carta volteada
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Segunda carta volteada
    secondCard = this;
    hasFlippedCard = false;
    attempts++;
    attemptsElement.innerText = attempts;
    checkForMatch();
}

// Función para verificar si hay coincidencia
function checkForMatch() {
    let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;

    if (isMatch) {
        disableCards();
        matches++;
        if (matches === totalPairs) {
            setTimeout(() => {
                alert(`¡Felicidades! Has encontrado todas las parejas en ${attempts} intentos.`);
                resetGame();
                shuffle();
            }, 500);
        }
    } else {
        unflipCards();
    }
}

// Función para deshabilitar las cartas que hacen match
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Función para voltear las cartas si no hacen match
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

// Función para reiniciar el tablero
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Función para barajar las cartas
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

// Función para reiniciar el juego completamente
function resetGame() {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    resetBoard();
    matches = 0;
    attempts = 0;
    attemptsElement.innerText = attempts;
    shuffle();
}

// Evento para reiniciar el juego al hacer clic en el botón
resetBtn.addEventListener('click', resetGame);

// Inicializar el juego
shuffle();
cards.forEach(card => card.addEventListener('click', flipCard));
