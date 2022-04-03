//Criando as constantes para lidar com os elementos HTML
const reboot = document.querySelector('#reiniciar');
const selectedWinner = document.querySelector('#vencedor-selecionado');
const selectedPlayer = document.querySelector('#jogador-selecionado');
const squares = document.querySelectorAll('.quadrado');
//Constantes criadas para manipular mais facilmente os Jogadores.
const xmark = {
    'mark' : 'X',
    'newClass' : 'green'
};
const omark = {
    'mark' : 'O',
    'newClass' : 'red'
};

//Criando as variáveis de controle
let player = xmark; //O jogo sempre começa com o Jogador no X
let winner = false;
let gameOver = false;
//Estabelecendo as sequências vencedoras
const winningSequences = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];


/**
 * Função que troca o jogador atual
 */
function changePlayer(){
    if(player == xmark){
        player = omark;
    } else {
        player = xmark;
    }
    selectedPlayer.innerHTML = player.mark;
}

/**
 * Função para checar se o jogardor venceu
 * Faz um forEach para checar se os quadrados das sequências vencedoras tem a mesma marca
 * Altera os fundos dos quadrados vencedores
 * Atribui o jogador atual ao vencedor
 * E altera a variável de controle gameOver para indicar que o jogo terminou
 *
 */
function checkWinner(){

    winningSequences.forEach(sequence =>{
        if(checkSequence(squares[sequence[0]],squares[sequence[1]], squares[sequence[2]])){
            changeSquareBG(squares[sequence[0]],squares[sequence[1]], squares[sequence[2]]);
             winner = true;
             selectedWinner.innerHTML = player.mark;
             gameOver = true;
             return;

        }
    });
    //Caso o jogo não tenha terminado, vou verificar se ainda há possibilidades de jogada
    if(!gameOver){
        //Para tanto altero temporariamente a variável gameOver para true pois se ele encontrar quadrados vazios irá alterá-la para false
        gameOver = true;
        squares.forEach(element => {
            if(element.innerHTML === 'N'){
                gameOver = false;
                return;
            }
        });
    }
    //Verifico se o jogo terminou sem vencedores
    if(gameOver === true && winner === false){
        selectedWinner.innerHTML = 'Não houve vencedor. Tentem novamente!';
    }

}

/**
 * Checa cada sequencia
 * @param square1
 * @param square2
 * @param square3
 */
function checkSequence(square1, square2, square3){
    if(square1.innerHTML !== 'N' && square1.innerHTML === square2.innerHTML && square1.innerHTML === square3.innerHTML){
        return true;
    } else {
        return false;
    }

}

/**
 * Muda a cor do quadrado caso encontre um vencedor
 * @param square1
 * @param square2
 * @param square3
 */
function changeSquareBG(square1, square2, square3){
    square1.classList.add('winner');
    square2.classList.add('winner');
    square3.classList.add('winner');
}

/**
 * Função para selecionar quadrado, adicionar a marca correspondente e alterar o jogador uma vez que a marca já foi colocada
 * @param event
 */
function chooseSquare(event){
    //Verifico se o jogo contínua
    if(gameOver){
        return;
    }
    //Atribuo o elemento à uma variável para facilitar a manipulação
    let square = squares[event.path[0].id-1];
    //Verifico se o quadrado já foi clicado, se não faço as mudanças, do contrário retorno.
    if(square.innerHTML !== 'N'){
        return;
    }
    square.innerHTML = player.mark;
    square.classList.add(player.newClass);
    //Checa se o jogador atual ganhou
    checkWinner();
    //Muda o jogador caso o jogo contínue
    if(!gameOver){
        changePlayer();
    }
}
/**
 * Função para reiniciar jogo
 */
function rebootGame(){
    window.location.reload(true);
}

//Adicionando Event Listener para cada div do jogo
squares.forEach(element => element.addEventListener('click', chooseSquare));

//Adicionando Event Listener para o botão de reiniciar
reboot.addEventListener('click', rebootGame);