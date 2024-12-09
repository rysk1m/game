const player = document.getElementById('player');
const damper = document.getElementById('damper');
const btnStart = document.querySelector('.start');
const btnRestart = document.querySelector('.restart');
const scoreDisplay = document.getElementById('score');

let isGameRunning = false;
let gameInterval;
let score = 0;
let speed = 2;
let highScores = []; 

const jumpSound = new Audio('jump.mp3');
const gameOverSound = new Audio('gameover.mp3');


const activeJump = () => {
  if (isGameRunning && !player.classList.contains('active')) {
    player.classList.add('active');
    jumpSound.play();
    setTimeout(() => {
      player.classList.remove('active');
    }, 500);
  }
};


const startGame = () => {
  if (isGameRunning) return;

  console.log('Game started');
  isGameRunning = true;
  score = 0;
  speed = 2;
  scoreDisplay.textContent = score;
  damper.style.animationDuration = `${speed}s`;
  damper.classList.add('animate');
  btnStart.style.display = 'none';
  btnRestart.style.display = 'none';

  gameInterval = setInterval(() => {
    const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    const damperLeft = parseInt(window.getComputedStyle(damper).getPropertyValue('left'));


    if (damperLeft < 90 && damperLeft > 50 && playerTop >= 140) {
      endGame();
    }

    score++;
    scoreDisplay.textContent = score;


    if (score % 100 === 0) {
      speed = Math.max(0.5, speed - 0.1);
      damper.style.animationDuration = `${speed}s`;
    }

    console.log(`Score: ${score}, Speed: ${speed}`);
  }, 100);
};


const endGame = () => {
  console.log('Game over');
  isGameRunning = false;
  clearInterval(gameInterval);
  damper.classList.remove('animate');
  highScores.push(score); 
  highScores.sort((a, b) => b - a); 
  gameOverSound.play();
  alert(`Game Over! Your score: ${score}\nHigh scores: ${highScores.join(', ')}`);
  btnRestart.style.display = 'block';
};


const restartGame = () => {
  console.log('Game restarted');
  damper.style.animationDuration = `${speed}s`;
  startGame();
};


document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    activeJump();
  }
});

btnStart.addEventListener('click', startGame);
btnRestart.addEventListener('click', restartGame);
