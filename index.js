const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'react', 'angular', 'node'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show the hidden word
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter => `
        <span class="letter"> ${correctLetters.includes(letter) ? letter : ''} </span>
    `).join('')}`;

    const innerWord = wordEl.innerText.replace(/\n/g, '');
    if(innerWord === selectedWord) {
        finalMessage.innerText = `Congratulation! You Won! :`;
        popup.style.display = 'flex';
    }
}

// update wrong letters
function updateWrongLettersEl() {
    // Display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter =>   `<span>${letter}</span>`)}
    `;

    // display parts
    figParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });
    // Check if lost
    if(wrongLetters.length === figParts.length) {
        finalMessage.innerText = 'Unfortunately ! You Lost... !';
        popup.style.display = 'flex';
    }
}

// show notifications
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// keydown letter press

    window.addEventListener('keydown', e => {
        if(e.keyCode >= 65 && e.keyCode <=90) {
            const letter = e.key;
            if(selectedWord.includes(letter)) {
                if(!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if(!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLettersEl();
                } else {
                    showNotification();
                }
            }
        }
    });

   // Restart game and play again
   playAgainBtn.addEventListener('click', () => {
       // Empty arrays
       correctLetters.splice(0);
       wrongLetters.splice(0);

       selectedWord = words[Math.floor(Math.random() * words.length)];
       displayWord();
       updateWrongLettersEl();
       popup.style.display = 'none';
   }) 

displayWord();



