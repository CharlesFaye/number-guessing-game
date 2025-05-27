const result = document.getElementById('result');
const resultContent = document.getElementById('result-content');
const attempts = document.getElementById('attempts');
const resultAttempt = document.getElementById('result-attempt');
const number = document.getElementById('number');
const validateBtn = document.getElementById('validate-btn');
const replayBtn = document.getElementById('replay-btn');

/**
 * Displays the given message in the result element.
 *
 * @param {string} msg - The message to display as the result.
 */
const showResult = (msg) => {
    resultContent.textContent = msg;
    result.appendChild(resultContent);
}

/**
 * Displays the current number of attempts to the user.
 *
 * Updates the text content of the resultAttempt element with the given attempt value,
 * ensures the element is visible by removing the 'hidden' class, and appends it to the
 * attempts container.
 *
 * @param {number} attempt - The current attempt number to display.
 */
const showAttempts = (attempt) => {
    resultAttempt.textContent = attempt;
    resultAttempt.classList.remove('hidden');
    attempts.appendChild(resultAttempt);
}
/**
 * A randomly generated integer between 1 and 100 (inclusive).
 * Used as the target number for the guessing game.
 * @type {number}
 */
let randomNumber = Math.floor(Math.random() * 100) + 1;




/**
 * Compares the user's guessed number to a randomly generated number and updates the UI accordingly.
 * 
 * Removes any previous result color classes, checks if the guess is too high, too low, or correct,
 * updates the result message and color, and clears the input field.
 *
 * @returns {boolean} Returns true if the guess is correct, otherwise false.
 */
const guess = () => {
    resultContent.classList.remove('text-red-500', 'text-blue-500', 'text-green-500');

    let value = number.value;
    if (value > randomNumber) {
        resultContent.classList.add('text-red-500');
        showResult(`${value} is too big`);
        return false;
    }
    else if (value < randomNumber) {
        resultContent.classList.add('text-blue-500');
        showResult(`${value} is too small`);
        return false;
    }
    else {
        resultContent.classList.add('text-green-500');
        showResult('Youpii. You win');
        number.value = ""
        return true;
    }
}
/**
 * Handles a single attempt in the number guessing game.
 * Increments the attempt counter, checks if the guess is correct,
 * and manages game over state and UI updates after three failed attempts.
 *
 * @returns {void}
 */
let count = 0;
let gameOver = false;
const attempt = () => {
    if (gameOver) return;

    count++;
    const guessedCorrectly = guess();

    if (guessedCorrectly) {
        gameOver = true;
        return;
    }

    if (count === 3) {
        resultContent.classList.remove('text-blue-500', 'text-green-500');
        resultContent.classList.add('text-red-500');
        showResult('You lost. Try again');
        gameOver = true;
        validateBtn.disabled = true;
        validateBtn.classList.add('hidden');
        replayBtn.classList.remove('hidden');
    }
}



/**
 * Resets the number guessing game to its initial state.
 * - Generates a new random number between 1 and 100.
 * - Resets the attempt counter and input field.
 * - Updates UI elements to reflect a new game.
 * - Enables the validate button and hides the replay button.
 * - Clears previous result messages and focuses the input field.
 *
 * @returns {void}
 */
function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;

    count = 0;
    
    number.value = "";
 
    resultContent.textContent = "Do an attempt !";
    resultContent.classList.remove('text-red-500', 'text-blue-500', 'text-green-500');

    
    validateBtn.disabled = false;
    validateBtn.classList.remove('hidden');
    replayBtn.classList.add('hidden');

    gameOver = false;

    resultAttempt.textContent = "";
    resultAttempt.classList.add('hidden');

    number.focus();
}


validateBtn.addEventListener('click', () => {
    attempt()
    showAttempts(count)
});

replayBtn.addEventListener('click', resetGame);
