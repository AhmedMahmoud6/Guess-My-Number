function playAgain(
  checkGuessBtn,
  againBtn,
  guessText,
  guessInput,
  score,
  guess
) {
  document.body.classList.remove("bg-[#ff5f5f]", "bg-[#63be6c]");
  document.body.classList.add("bg-[#222222]");
  checkGuessBtn.classList.remove("hidden");
  againBtn.classList.add("hidden");
  guessText.textContent = "start guessing . . .";
  guessInput.value = "";
  guessInput.disabled = false;
  guessInput.focus();
  guess.textContent = "??";
  score.textContent = "10";
  setGuessNumber(Math.floor(Math.random() * 21));
}

function checkWinOrLost(
  score,
  checkGuessBtn,
  againBtn,
  guessText,
  result,
  guessInput,
  guess
) {
  // if lost
  if (Number(score.textContent) === 0 && !result) {
    guess.textContent = getGuessNumber();
    checkGuessBtn.classList.add("hidden");
    againBtn.classList.remove("hidden");
    guessText.textContent = "You have used all of your tries";
    document.body.classList.replace("bg-[#222222]", "bg-[#ff5f5f]");
    guessInput.disabled = true;
    // if won
  } else if (Number(score.textContent) !== 0 && result) {
    guess.textContent = getGuessNumber();
    checkGuessBtn.classList.add("hidden");
    againBtn.classList.remove("hidden");
    guessText.textContent = "you did it 👏";
    document.body.classList.replace("bg-[#222222]", "bg-[#63be6c]");
    guessInput.disabled = true;
  }
}

function checkGuess(userInput, currentGuessNumber) {
  if (userInput < currentGuessNumber) {
    guessText.textContent = "📉 Too low";
    return false;
  } else if (userInput > currentGuessNumber) {
    guessText.textContent = "📈 Too high";
    return false;
  }
  return true;
}

function updateScores(score, found, highscore) {
  if (found) {
    if (getHighscore() < Number(score.textContent)) {
      setHighscore(score.textContent);
      highscore.textContent = getHighscore();
    }
  } else {
    if (Number(score.textContent) !== 0)
      score.textContent = Number(score.textContent) - 1;
  }
  return found;
}

function setGuessNumber(value) {
  value === 0
    ? localStorage.setItem("guessnumber", value + 1)
    : localStorage.setItem("guessnumber", value);
}

function getGuessNumber() {
  return JSON.parse(localStorage.getItem("guessnumber"));
}

function setHighscore(value) {
  localStorage.setItem("highscore", value);
}

function getHighscore() {
  return JSON.parse(localStorage.getItem("highscore"));
}
