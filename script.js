// global variables //
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

//starting condition //
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

//* switch player //
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//* rolling dice functionality //
const rollingHandler = () => {
  if (playing) {
    //? 1.generating random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //? 2.display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `/images/dice-${dice}.png`;
    //? 3.check for roll 1 ,if true switch player
    if (dice !== 1) {
      //? add dice value to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //? switch player //
      switchPlayer();
    }
  }
};
//* holding functionality //
const holdHandler = () => {
  if (playing) {
    //? add current score to active player score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //? check if player's score is >= 100 finish the game
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
    } else {
      //? after hold switch player
      switchPlayer();
    }
  }
};

const newGameHandler = () => {
  diceEl.classList.add("hidden");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  scores = [0, 0];
  currentScore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  playing = true;
};

btnRoll.addEventListener("click", rollingHandler);
btnHold.addEventListener("click", holdHandler);
btnNew.addEventListener("click", newGameHandler);
