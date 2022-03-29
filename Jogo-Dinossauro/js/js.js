//Explicando como o jogo funciona
alert("O objetivo do jogo é pular os obstáculos. Você precisará escolher uma tecla para fazer os pulos.\n Basta clicar na tecla desejada no seu teclado depois de clicar em ok aqui.\n O jogo só começa após clicar na tecla.\n Se quiser pode alterar o tema clicando no Mario ou no Dinossauro, ou trocar de nível clicando nos botões Fácil, Médio ou Díficl.")

//Constantes criadas par a manipulação do HTML
const avatar = document.querySelector('#avatar');
const background = document.querySelector('.background');
const chosenKey = document.querySelector('.chosenKey');
const marioButton = document.querySelector('#mario');
const dinoButton = document.querySelector('#dino');
const easyButton = document.querySelector('#easy');
const mediumButton = document.querySelector('#medium');
const hardButton = document.querySelector('#hard');
const actualPoints = document.querySelector('.points');


//Intervalo de movimento, quanto mais díficil mais rápido o obstacleTiming
let avatarTiming = 50;
let obstacleTiming = 60;
let avatarPosition = 0;

//Altura que o dino pula, quanto mais alto mais fácil
let jumpHeight = 400;

//Deixando a pessoa escolher a tecla que quer usar
//Variável para controlar se é a primeira vez que a tecla é pressionada
let firstClick = 0;
//Variáveis para guardar o código da tecla e seu nome
let keyCode;
let keyName;

//Variavel para guardar o tema. Começa com dino
let theme = 'dino';
let themeObstacle = 'cactus';

//Controlando se está pulando ou não
let isJumping = false;
//Controlando se o jogo começou. Até escolher tecla não começa
let playing = false;

//Controlando se o jogo acabou
let gameOver = false;
let pontuacao = 0;


/**
 * Função responsável por lidar com quando pressionamos a tecla de espaço
 * @param event
 */
/**
 * Função que irá ser chamada quando a tecla escolhida for clicada
 * @param event
 */
function handleKeyUP(event) {

    if (firstClick === 0) {
        keyCode = event.keyCode;
        keyName = event.key;
        chosenKey.innerHTML = keyName;
        //Removendo mensagem de escolher tecla e começando o jogo.
        let keyMessage = document.querySelector('#keyChoice');
        document.querySelector('#header').removeChild(keyMessage);
        playing = true;
        firstClick++;
    }

    if (playing) {
        if (event.keyCode === keyCode) {
            //Fazendo o movimento
            if (!isJumping) {
                jump();
            }
        }
    }
}

/**
 * Função que controlará o pulo do avatar
 */
function jump() {

    isJumping = true;

    let upInterval = setInterval(() => {
        if (avatarPosition >= jumpHeight) {
            clearInterval(upInterval);
            //Descer
            let downInterval = setInterval(() => {
                if (avatarPosition <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    avatarPosition -= 20;
                    avatar.style.bottom = avatarPosition + 'px';
                }
            }, avatarTiming);

        } else {
            //Subir
            avatarPosition += 20;
            avatar.style.bottom = avatarPosition + 'px';


        }
    }, avatarTiming);



}


/**
 * Função que cria os obstáculos a serem pulados
 */
function createObstacle() {
    const obstacle = document.createElement('div');
    let obstaclePosition = 1000;
    let randomTime = Math.random() * 6000;

    obstacle.classList.add('obstacle');
    // obstacle.classList.add('cactus');
    obstacle.classList.add(themeObstacle);
    obstacle.style.left = obstaclePosition + 'px';
    background.appendChild(obstacle);

    let leftInterval = setInterval(() => {
        if (obstaclePosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(obstacle);
        } else if (obstaclePosition > 0 && obstaclePosition < 60) {
            //Aqui controlo se o jogo já está valendo com a variável playing
            if (avatarPosition < 60 && playing === true) {

                //Verificamos que houve colisão entre avatar e obstáculo então mostro a pontuação final ao meu usuário e recarrego a página para poder jogar novamente
                clearInterval(leftInterval);
                gameOver = true;
                let finalAlert = "Game Over!\nPontuação: " + pontuacao;
                alert(finalAlert);
                window.location.reload(true);

            } else {
                if (playing) {
                    //Mostro os pontos ao placar depois de adicionar os novos
                    pontuacao += 1;
                    actualPoints.innerHTML = pontuacao;
                }

            }
        }
        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + 'px';
    }, obstacleTiming);
    setTimeout(createObstacle, randomTime);
}

//Começa-se a criação dos obstáculos.
createObstacle();

//Trocando de tema
function themeChange(theme) {
    if (theme === 'mario') {
        avatar.classList.remove('dino');
        avatar.classList.add('mario');
        if (obstacle) {
            obstacle.classList.add('bricks');
            obstacle.classList.remove('cactus');
        }

    } else {
        avatar.classList.remove('mario');
        avatar.classList.add('dino');
        document.querySelector('.obstacle').style.backgroundImage = ('/imagens/cactus.png');
        if (obstacle) {
            obstacle.classList.add('cactus');
            obstacle.classList.remove('bricks');
        }
    }
}

//Trocando de nível. Ao aumentar a dificuldade o obstáculo se move mais rápido e o avatar pula mais rápido.
function changeLevel(level) {
    switch (level) {
        case 'easy':
            obstacleTiming = 60;
            avatarTiming = 60;
            break;
        case 'medium':
            obstacleTiming = 50;
            avatarTiming = 40;
            break;
        case 'hard':
            obstacleTiming = 60;
            avatarTiming = 20;
            break;
        default:
            jumpHeight = 300;
            obstacleTiming = 60;
            break;
    }

}

//Botões que controlam o tema
marioButton.addEventListener('click', () => {
    marioButton.classList.add('purpleBG');
    dinoButton.classList.remove('purpleBG');
    theme = 'mario';
    themeObstacle = 'bricks';
    themeChange(theme);

});
dinoButton.addEventListener('click', () => {
    dinoButton.classList.add('purpleBG');
    marioButton.classList.remove('purpleBG');
    theme = 'dino';
    themeObstacle = 'cactus';
    themeChange(theme);

});

//Botões que controlam o nível
easyButton.addEventListener('click', () => {
    easyButton.classList.add('purpleBG');
    mediumButton.classList.remove('purpleBG');
    hardButton.classList.remove('purpleBG');
    changeLevel('easy');
});
mediumButton.addEventListener('click', () => {
    easyButton.classList.remove('purpleBG');
    mediumButton.classList.add('purpleBG');
    hardButton.classList.remove('purpleBG');
    changeLevel('medium');
});
hardButton.addEventListener('click', () => {
    easyButton.classList.remove('purpleBG');
    mediumButton.classList.remove('purpleBG');
    hardButton.classList.add('purpleBG');
    changeLevel('hard');
});

//Tecla que controla o pulo
document.addEventListener('keyup', handleKeyUP);