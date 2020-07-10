const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const scoreboard = document.getElementById('scoreboard');
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
  const phraseList = phrase.querySelector('ul');
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
 * Click event watching for the start button click
 */
startGame.addEventListener('click', () => {
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

    // Check if a letter was not found
    // If so, increment missed variable and remove heart
    if (letterFound === null) {
      const guessTry = document.querySelector('.tries');
      missed++;
      guessTry.parentElement.removeChild(guessTry);
    }
  }
});
