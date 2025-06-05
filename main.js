let guess = document.querySelector(".guess");
let guessText = document.querySelector(".guess-text");
let guessInput = document.querySelector(".guess-input");
let checkGuessBtn = document.querySelector(".check-guess");
let againBtn = document.querySelector(".again");
let score = document.querySelector(".score span");
let highscore = document.querySelector(".highscore span");
let userInput;

setGuessNumber(Math.floor(Math.random() * 21));

getHighscore() ? setHighscore(getHighscore()) : setHighscore(0);
highscore.textContent = getHighscore();

console.log(getGuessNumber());
checkGuessBtn.addEventListener("click", (_) => {
  userInput = parseInt(guessInput.value);
  // if user input is a number
  if (!isNaN(userInput)) {
    let result = updateScores(
      score,
      checkGuess(userInput, getGuessNumber()),
      highscore
    );
    checkWinOrLost(score, checkGuessBtn, againBtn, guessText, result);
  }
  // if user input is not a number
  else {
    guessText.textContent = "Please Enter a Number";
  }
});

againBtn.addEventListener("click", (_) => {
  playAgain(checkGuessBtn, againBtn, guessText, guessInput, score);
});

function playAgain(checkGuessBtn, againBtn, guessText, guessInput, score) {
  document.body.classList.remove("bg-[#ff5f5f]", "bg-[#63be6c]");
  document.body.classList.add("bg-[#222222]");
  checkGuessBtn.classList.remove("hidden");
  againBtn.classList.add("hidden");
  guessText.textContent = "start guessing . . .";
  guessInput.value = "";
  score.textContent = "10";
  setGuessNumber(Math.floor(Math.random() * 21));
}

function checkWinOrLost(score, checkGuessBtn, againBtn, guessText, result) {
  // if lost
  if (Number(score.textContent) === 0 && !result) {
    checkGuessBtn.classList.add("hidden");
    againBtn.classList.remove("hidden");
    guessText.textContent = "You have used all of your tries";
    document.body.classList.replace("bg-[#222222]", "bg-[#ff5f5f]");
    // if won
  } else if (Number(score.textContent) !== 0 && result) {
    checkGuessBtn.classList.add("hidden");
    againBtn.classList.remove("hidden");
    guessText.textContent = "you did it 👏";
    document.body.classList.replace("bg-[#222222]", "bg-[#63be6c]");
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
  localStorage.setItem("guessnumber", value);
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
