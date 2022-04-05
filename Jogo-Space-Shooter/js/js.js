//Pontuação:
let score = 0;
const points = 10;
let highestScore = 0;
const scoreBoard = document.querySelector('#score');
const highestScoreBoard = document.querySelector('#highestScore');


//Dificuldade
let alienSpeed = 100;


//Selecionando os elementos do Jogo
const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');


//Criando as imagens para os inimigos
let alienInterval;
const aliensImg = ['imagens/monster-1.png', 'imagens/monster-2.png', 'imagens/monster-3.png'];


/**
 * Função para movimento da nave e tiro
 * @param event
 */
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

/**
 * Função para subir
 */
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    let position = parseInt(topPosition);

    if(position <= 0) {
        return;
    } else {
        position -= 50;
        yourShip.style.top = `${position}px`;
    }
}

/**
 * Função para descer
 */
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    let position = parseInt(topPosition);
    //Aqui dava um bug da nave não parar de descer mesmo quando chegava ao final. Trocando o === por >= e colocando o parseInt antes do if/else resolvi o bug
    if(position >= 510){
        return
    } else {
        position += 46;
        yourShip.style.top = `${position}px`;
    }
}
/**
 * Função para lidar com a funcionalidade de tiro
 */
function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

/**
 * Função para criar o elemento de Laser
 * @returns {HTMLImageElement}
 */

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'imagens/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

/**
 * Função para mover o laser
 * @param laser
 */
function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => { //comparando se cada alien foi atingido, se sim, troca o src da imagem
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'imagens/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })

        if(xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

/**
 * Função para criar os inimigos de forma aleatória
 */
function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imagens
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

/**
 * Função para movimentar os inimigos
 * @param alien
 */
function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= 50) {
            if(Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                gameOver();
            }
        } else {
            alien.style.left = `${xPosition - 4}px`;
        }
    }, alienSpeed);
}

/**
 * Função para lidar com a colisão
 * @param laser
 * @param alien
 * @returns {boolean}
 */
function checkLaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;
    if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if(laserTop <= alienTop && laserTop >= alienBottom) {
            score += points;
            scoreBoard.innerHTML = score;
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}


/**
 * Função que começa o jogo
 */
function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
}

/**
 * Função para lidar com o final do jogo
 */
function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert(`Game Over!\nSua pontuação foi de: ${score}`);
        if(highestScore < score){
            highestScore = score;
        }
        score = 0;
        scoreBoard.innerHTML = score;
        highestScoreBoard.innerHTML = highestScore;

        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}



//Adicionando o EventListener para começar o jogo
startButton.addEventListener('click', (event) => {
    playGame();
});