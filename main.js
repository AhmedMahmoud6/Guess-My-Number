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
guessInput.focus();

checkGuessBtn.addEventListener("click", handleGuess);

guessInput.addEventListener("keydown", (e) =>
  e.key === "Enter" ? handleGuess() : ""
);

againBtn.addEventListener("click", (_) =>
  playAgain(checkGuessBtn, againBtn, guessText, guessInput, score)
);

function handleGuess() {
  userInput = parseInt(guessInput.value);
  // if user input is a number
  if (!isNaN(userInput)) {
    let result = updateScores(
      score,
      checkGuess(userInput, getGuessNumber()),
      highscore
    );
    checkWinOrLost(
      score,
      checkGuessBtn,
      againBtn,
      guessText,
      result,
      guessInput
    );
  }
  // if user input is not a number
  else {
    guessText.textContent = "Please Enter a Number";
  }
}
