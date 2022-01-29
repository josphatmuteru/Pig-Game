'use strict';

const score01El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
let scores = [0,0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

const init = function() {
    score01El.textContent = '0';
    score2El.textContent = '0';

    diceEl.classList.add('hidden');

    playing = true;
    scores = [0,0];
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
};


const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
       

        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
};


init();

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



btnRoll.addEventListener('click', function(){
    if(playing){
   const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if(dice !== 1){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


    }
    else{
        switchPlayer();
    }
}
});



btnHold.addEventListener('click', function() {
    if(playing){
    scores[activePlayer] += currentScore;
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


    if(scores[activePlayer] >= 100){
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }else{
        switchPlayer();
    }
    }
});

btnNew.addEventListener('click',init );