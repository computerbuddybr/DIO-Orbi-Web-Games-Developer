//A pontuação vai de 10 em 10
const points = 10;

//Variável de controle para saber se está jogando. Durante o jogo não se pode alterar o nível de velocidade
let playing = false;

//Velocidade para o light color. Easy - 1000, Medium - 800 hard - 500. Começa em 1000
let difficutlyLevels = {
    'easy': 1000,
    'medium': 800,
    'hard': 500,
};
let speed = difficutlyLevels['easy'];

//Guardarei a ordem será aceso o jogo
let order = [];
//Ordem dos clicks do usuário
let clickedOrder = [];

//Pontuação
let score = 0;

/**
 * A cada cor será atribuido um número para a lógica
 * O - verde | 1 - vermelho | 2 - amarelo | 3 - azul
 * Para tanto criei um objeto para guardar a lógica e facilitar caso decida trocar mais tarde
 * @type {{vermelho: number, amarelo: number, verde: number, azul: number}}
 */
const colors = {
    'green': 0,
    'red': 1,
    'yellow': 2,
    'blue': 3
};
//Selecionando meus botões do genius
const blue = document.querySelector('.blue');
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');

//Slecionando botão de play
const playButton = document.querySelector('#play');

//Selecionando botões de difuculdade
const easy = document.querySelector('#easy');
const medium = document.querySelector('#medium');
const hard = document.querySelector('#hard');

//Selecionando todos os controles de ínicio de jogo e o main-content
const mainContent = document.querySelector('#main-content');
const controls = document.querySelector('#controles');


/**
 * Função que vai criar a ordem do jogo
 */
function shuffleOrder() {
    let colorOrder = Math.floor(Math.random() * 4);
    order.push(colorOrder);
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

/**
 * Função que acende as próximas cores
 * @param element
 * @param number
 */
function lightColor(element, number) {
    number = number * speed;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    //TODO: Ele não esta removendo a classe depois do tempo
    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

/**
 * Checando se os botões clicados são os mesmos da ordem que foi gerada no jogo
 */
function checkOrder() {

    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {

            gameOver();
            return;
        }
    }

    if (clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

/**
 * Função para permitir click do usuário
 * @param color
 */
function click(color) {
    //Adicionei este controle pois dava um bug se o erro fosse na primeira jogada de adicionar pontos e avisar que o jogo continuava mesmo terminando o jogo. Com isto se resolveu o bug.
    if(order.length === 1){
        if(color !== order[0]){
            score = 0;
           gameOver();
           return;
        }
    }
    clickedOrder.push(color);
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

/**
 * Retornando a cor
 * @param color
 * @returns {Element}
 */
function createColorElement(color) {
    switch (color) {
        case colors['green']:
            return green;
            break;
        case colors['red']:
            return red;
            break;
        case colors['yellow']:
            return yellow;
            break;
        case colors['blue']:
            return blue;
            break;
    }

}

/**
 * Próximo nível do jogo
 */
function nextLevel() {
    score += points;
    shuffleOrder();
}

/**
 * Tira a classe selectedLevel de todos os botões para que só fique o botão correto selecionado
 */
function clearSelectedLevel() {
    easy.classList.remove('selectedLevel');
    medium.classList.remove('selectedLevel');
    hard.classList.remove('selectedLevel');
}

function changeDifficultyLevel(level, element) {
    if (playing === false) {
        speed = level;
        clearSelectedLevel();
        element.classList.add('selectedLevel');

    }
}

/**
 * Terminando o jogo
 */
function gameOver() {
    playing = false;
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para recarregar o jogo`);
    window.location.reload(true);
}

/**
 * Começando o jogo
 */
function playGame() {
    score = 0;
    nextLevel();
}

/**
 * Função que realmente ínicia o Jogo ao ser clicado o botão de inciar depois de escolher um nível de dificuldade
 * @param event
 */
function startingGame(event) {
    playing = true;
    mainContent.removeChild(controls);
    playGame();
}

//Adicionando Event Listeners aos botões do Genius
green.addEventListener('click', () => {
    if(playing === true){
        click(colors['green']);
    }

});
yellow.addEventListener('click', () => {
    if(playing === true){
        click(colors['yellow']);
    }

});
blue.addEventListener('click', () => {
    if(playing === true){
        click(colors['blue']);
    }

});
red.addEventListener('click', () => {
    if(playing === true){
        click(colors['red']);
    }
});

//Adicionando os EventListeners aos botões de dificuldade
easy.addEventListener('click', () => {
    changeDifficultyLevel(difficutlyLevels['easy'], easy);
});
medium.addEventListener('click', () => {
    changeDifficultyLevel(difficutlyLevels['medium'], medium);
});
hard.addEventListener('click', () => {
    changeDifficultyLevel(difficutlyLevels['hard'], hard);
});
//Adicionando EventListener para o botão de iniciar o jogo
playButton.addEventListener('click', startingGame);


