const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseList = phrase.querySelector('ul');
const overlay = document.getElementById('overlay');
const scoreboard = document.getElementById('scoreboard');
const guessTries = document.querySelectorAll('.tries');
const startGame = document.querySelector('.btn__reset');
const phrases = [
  'Without a paddle',
  'Beat around the bush',
  'Birds of a feather flock together',
  'Slow and steady wins the race',
  'Throw caution to the wind'
];
let missed = 0;

/**
 * Returns random phrase broken into an array.
 */
function getRandomPhraseAsArry(arr) {
  const randomNum = Math.floor(Math.random() * arr.length);
  const splitPhrase = arr[randomNum].split('');
  return splitPhrase;
}

/**
 * Adds phrase to the display
 */
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const newCharacter = document.createElement('li');
    newCharacter.textContent = arr[i];
    if (arr[i] === ' ') {
      newCharacter.className = 'space';
    } else {
      newCharacter.className = 'letter';
    }
    phraseList.appendChild(newCharacter);
  }
}

/**
 * Check if button matches any characters in the phrase
 */
function checkLetter(button) {
  const selectedLetter = button.textContent;
  const letterArray = document.querySelectorAll('.letter');
  let matchedLetter = '';

  for (let i = 0; i < letterArray.length; i++) {
    if (letterArray[i].textContent.toLowerCase() === selectedLetter) {
      matchedLetter = selectedLetter;
      letterArray[i].classList.add('show');
    }
  }

  if (matchedLetter) {
    return matchedLetter;
  } else {
    return null;
  }
}

/**
 * Compare letters shown to total letters available to check if there is a win
 */
function checkWin() {
  const letterCount = document.querySelectorAll('.letter').length;
  const shownCount = document.querySelectorAll('.show').length;

  startGame.textContent = "Reset Game";

  if (letterCount === shownCount) {
    overlay.className = 'win';
    overlay.style.display = '';
  } else if (missed >= 5) {
    overlay.className = 'lose';
    overlay.style.display = '';
  }
}

/**
 * Reset variables and remove styles/classes for game reset
 */
function resetGame() {
  const chosenLetters = document.querySelectorAll('.chosen');
  phraseList.innerHTML = '';
  missed = 0;

  for (let i = 0; i < chosenLetters.length; i++) {
    chosenLetters[i].classList.remove('chosen');
    chosenLetters[i].disabled = false;
  }

  for (let i = 0; i < guessTries.length; i++) {
    guessTries[i].querySelector('img').src = 'images/liveHeart.png';
  }
}

/**
 * Click event watching for the start button click
 */
startGame.addEventListener('click', () => {
  if (overlay.className === 'win' || overlay.className === 'lose') {
    resetGame();
  }
  const phraseArray = getRandomPhraseAsArry(phrases);
  addPhraseToDisplay(phraseArray);
  overlay.style.display = 'none';
});

/**
 * Click event watching for virtual keyboard button click
 */
keyboard.addEventListener('click', (e) => {
  // Check if button is pressed
  if (e.target.tagName === 'BUTTON') {
    e.target.disabled = true;
    e.target.className = 'chosen';
    const letterFound = checkLetter(e.target);
    const totalTries = guessTries.length;

    // Check if a letter was not found
    // If so, increment missed variable and remove heart
    if (letterFound === null) {
      missed++;
      if (missed <= 5 && missed !== 0) {
        guessTries[totalTries-missed].querySelector('img').src = 'images/lostHeart.png';
      }
    }
    checkWin();
  }
});
