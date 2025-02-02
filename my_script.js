let randomNumber = Math.floor(Math.random() * 100) + 1;
const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHigh = document.querySelector(".lowOrHigh");
const startOver = document.querySelector(".resultparas");

const p = document.createElement("p");
let prevGuess = [];
let guessNum = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Please enter a valid number between 1 and 100");
    } else {
        prevGuess.push(guess);
        displayGuess(guess);
        checkGuess(guess);
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`🎉 Congratulations! You guessed it right!`);
        endgame();
    } else if (guessNum === 11) {
        displayMessage(`Game Over! The correct number was ${randomNumber}`);
        endgame();
    } else if (guess < randomNumber) {
        displayMessage(`📉 Too Low! Try Again.`);
    } else {
        displayMessage(`📈 Too High! Try Again.`);
    }
}

function displayMessage(message) {
    lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

function displayGuess(guess) {
    userInput.value = "";
    guessSlot.innerHTML = prevGuess.join(", "); // Show all guesses
    remaining.innerHTML = `${10 - guessNum}`; // Update remaining guesses
    guessNum++;
}

function endgame() {
    userInput.setAttribute("disabled", "");
    submit.setAttribute("disabled", "");
    p.innerHTML = `<button id="newGame">Start New Game</button>`;
    startOver.appendChild(p);
    document.querySelector("#newGame").addEventListener("click", startGame);
}

function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Ensure 'randomNumber' is declared with 'let' globally
    prevGuess = [];
    guessNum = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = "10";
    lowOrHigh.innerHTML = "";
    userInput.removeAttribute("disabled");
    submit.removeAttribute("disabled");

    // Remove the restart button only if it exists
    if (p.parentNode) {
        startOver.removeChild(p);
    }
}
