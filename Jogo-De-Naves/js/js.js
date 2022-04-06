//Estabelecendo as variáveis do jogo
//Principais variáveis do jogo
let jogo = {};
const TECLA = {
    'up': 38, //ArrowUp para movimentar o helicoptero pra cima
    'down': 40, //ArrowDown para movimentar o helicoptero pra baixo,
    'shoot': 32, //Spacebar para atirar
}

let velocidadeHelicoptero = 5;
let velocidadeCaminhao = 3;
let posicaoY = parseInt(Math.random() * 334);

//Variável de controle para controlar os disparos
let podeAtirar = true;
let tempoDisparo;

//Variável para controlar se jogo continua
let fimdejogo = false;

//Controlando a pontuação e energia
let pontos = 0;
let salvos = 0;
let perdidos = 0;
let energiaAtual = 3;

//Capturando os sons
const somDisparo=document.getElementById("somDisparo");
const somExplosao=document.getElementById("somExplosao");
const musica=document.getElementById("musica");
const somGameover=document.getElementById("somGameover");
const somPerdido=document.getElementById("somPerdido");
const somResgate=document.getElementById("somResgate");




//Declarando funções

/**
 * Função que vai começar o jogo
 */
function start() {

    $("#inicio").hide();

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");


    //Jogo
    placar();
    energia();
    jogo.timer = setInterval(loop, 30);
    jogo.pressionou = [];

    //Verificando se o usuário pressionou alguma tecla
    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
    });


    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    });

    //Adicionando EventLiseners para o som
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

}

/**
 * Função que cria o loop
 */
function loop() {
    movefundo();
    movejogador();
    moveinimigo1();
    moveinimigo2();
    moveamigo();
    colisao();

}

/**
 * Função para movimentar o fundo
 */
function movefundo() {

    let esquerda = parseInt($("#fundoGame").css("background-position"));
    $("#fundoGame").css("background-position", esquerda - 1);

}

/**
 * Função que move o jogador
 */
function movejogador() {

    if (jogo.pressionou[TECLA.up]) {
        let topo = parseInt($("#jogador").css("top"));
        if (topo >= 0) {
            $("#jogador").css("top", topo - 10);
        }
    }

    if (jogo.pressionou[TECLA.down]) {
        let topo = parseInt($("#jogador").css("top"));
        if (topo <= 434) {
            $("#jogador").css("top", topo + 10);
        }
    }

    if (jogo.pressionou[TECLA.shoot]) {
        disparo();
    }

}

/**
 * Função para mover o helicóptero inimigo
 */
function moveinimigo1() {

    let posicaoX = parseInt($("#inimigo1").css("left"));
    $("#inimigo1").css("left", posicaoX - velocidadeHelicoptero);
    $("#inimigo1").css("top", posicaoY);

    if (posicaoX <= 0) {
        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo1").css("left", 694);
        $("#inimigo1").css("top", posicaoY);

    }
}

/**
 * Função que vai movimentar o caminhão inimigo
 */
function moveinimigo2() {
    let posicaoX = parseInt($("#inimigo2").css("left"));
    $("#inimigo2").css("left", posicaoX - velocidadeCaminhao);
    if (posicaoX <= 0) {
        $("#inimigo2").css("left", 775);
    }
}

/**
 * Função que vai movimentar o amigo a ser resgatado
 */
function moveamigo() {
    let posicaoX = parseInt($("#amigo").css("left"));
    $("#amigo").css("left", posicaoX + 1);

    if (posicaoX > 906) {
        $("#amigo").css("left", 0);
    }
}

/**
 * Função para disparar. Decide se pode ou não disparar
 */
function disparo() {

    if (podeAtirar === true) {
        podeAtirar = false;

        let topo = parseInt($("#jogador").css("top"))
        let posicaoX = parseInt($("#jogador").css("left"))
        let tiroX = posicaoX + 190;
        let topoTiro = topo + 37;
        $("#fundoGame").append("<div id='disparo'></div");
        $("#disparo").css("top", topoTiro);
        $("#disparo").css("left", tiroX);

        tempoDisparo = window.setInterval(executaDisparo, 30);
        somDisparo.play();

    }

}

/**
 * Função que dispara
 */
function executaDisparo() {
    let posicaoX = parseInt($("#disparo").css("left"));
    $("#disparo").css("left", posicaoX + 15);

    if (posicaoX >= 873) {
        window.clearInterval(tempoDisparo);
        tempoDisparo = null;
        $("#disparo").remove();
        podeAtirar = true;
    }
}

/**
 * Vai lidar com a colisão
 */
function colisao() {
    let inimigo1X, inimigo1Y, inimigo2X, inimigo2Y, amigoX, amigoY;

    let colisao1 = ($("#jogador").collision($("#inimigo1")));
    let colisao2 = ($("#jogador").collision($("#inimigo2")));
    let colisao3 = ($("#disparo").collision($("#inimigo1")));
    let colisao4 = ($("#disparo").collision($("#inimigo2")));
    let colisao5 = ($("#jogador").collision($("#amigo")));
    let colisao6 = ($("#inimigo2").collision($("#amigo")));

    //Entre jogador e helicóptero inimigo
    if (colisao1.length > 0) {
        jogadorAtingido(1,50);
        inimigo1X = parseInt($("#inimigo1").css("left"));
        inimigo1Y = parseInt($("#inimigo1").css("top"));
        explosao1(inimigo1X, inimigo1Y);

        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo1").css("left", 694);
        $("#inimigo1").css("top", posicaoY);
    }

    // Entre jogador e caminhão inimigo
    if (colisao2.length > 0) {
        jogadorAtingido(1,50);
        inimigo2X = parseInt($("#inimigo2").css("left"));
        inimigo2Y = parseInt($("#inimigo2").css("top"));
        explosao2(inimigo2X, inimigo2Y);

        $("#inimigo2").remove();

        reposicionaInimigo2();

    }
  //Colisão dos disparos com o helicóptero inimigo
    if (colisao3.length > 0) {
        inimigoAtingido(1, 100);
        inimigo1X = parseInt($("#inimigo1").css("left"));
        inimigo1Y = parseInt($("#inimigo1").css("top"));

        explosao1(inimigo1X,inimigo1Y);
        $("#disparo").css("left",950);

        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo1").css("left",694);
        $("#inimigo1").css("top",posicaoY);

    }
    //Colisão dos disparos com o caminhão inimigo
    if (colisao4.length > 0) {
        inimigoAtingido(0, 50);
        inimigo2X = parseInt($("#inimigo2").css("left"));
        inimigo2Y = parseInt($("#inimigo2").css("top"));
        $("#inimigo2").remove();

        explosao2(inimigo2X,inimigo2Y);
        $("#disparo").css("left",950);

        reposicionaInimigo2();

    }

    //Lida com o jogador resgatando o amigo
    if (colisao5.length > 0) {
        refemSalvo();
        adicionandoPontos(150);

        reposicionaAmigo();
        $("#amigo").remove();
    }

    //Lida com a colisão entre amigo e caminhão inimigo
    if (colisao6.length > 0) {
        refemPerdido();

        amigoX = parseInt($("#amigo").css("left"));
        amigoY = parseInt($("#amigo").css("top"));
        explosao3(amigoX,amigoY);
        $("#amigo").remove();

        reposicionaAmigo();

    }




}

/**
 * Lida com a explosão em caso de colisão com o helicóptero inimigo
 * @param inimigo1X
 * @param inimigo1Y
 */
function explosao1(inimigo1X, inimigo1Y) {
    $("#fundoGame").append("<div id='explosao1'></div");
    $("#explosao1").css("background-image", "url(imagens/explosao.png)");
    let div = $("#explosao1");
    div.css("top", inimigo1Y);
    div.css("left", inimigo1X);
    div.animate({width: 200, opacity: 0}, "slow");

    let tempoExplosao = window.setInterval(removeExplosao, 1000);



    /**
     * Remove a animação de explosão
     */
    function removeExplosao() {
        div.remove();
        window.clearInterval(tempoExplosao);
        tempoExplosao = null;
    }


}

/**
 * Lida com a explosão em caso de colisão com o caminhão inimigo
 * @param inimigo2X
 * @param inimigo2Y
 */
function explosao2(inimigo2X, inimigo2Y) {

    $("#fundoGame").append("<div id='explosao2'></div");
    $("#explosao2").css("background-image", "url(imagens/explosao.png)");
    let div2 = $("#explosao2");
    div2.css("top", inimigo2Y);
    div2.css("left", inimigo2X);
    div2.animate({width: 200, opacity: 0}, "slow");

    let tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

    function removeExplosao2() {

        div2.remove();
        window.clearInterval(tempoExplosao2);
        tempoExplosao2 = null;

    }


}

/**
 * Lida com o reposicionamento do caminhão inimigo em caso de explosão
 */
function reposicionaInimigo2() {
    let tempoColisao4 = window.setInterval(reposiciona4, 5000);

    function reposiciona4() {
        window.clearInterval(tempoColisao4);
        tempoColisao4 = null;

        if (fimdejogo === false) {

            $("#fundoGame").append("<div id=inimigo2></div");

        }

    }
}

/**
 * Lida com o reposicionamento do amigo em caso de explosão
 */
function reposicionaAmigo() {

    let tempoAmigo = window.setInterval(reposiciona6, 6000);

    function reposiciona6() {
        window.clearInterval(tempoAmigo);
        tempoAmigo = null;

        if (fimdejogo === false) {
            $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
        }
    }

}

/**
 * Lida com a explosão
 * @param amigoX
 * @param amigoY
 */
function explosao3(amigoX,amigoY) {
    $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
    $("#explosao3").css("top",amigoY);
    $("#explosao3").css("left",amigoX);
    let tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
    function resetaExplosao3() {
        $("#explosao3").remove();
        window.clearInterval(tempoExplosao3);
        tempoExplosao3 = null;

    }

}

/**
 * Mostra a pontuação
 */
function placar() {

    $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");

}

/**
 * Função que mostra a quantidade de energia que ainda resta
 */
function energia() {

    if (energiaAtual === 3) {

        $("#energia").css("background-image", "url(imagens/energia3.png)");
    }

    if (energiaAtual === 2) {

        $("#energia").css("background-image", "url(imagens/energia2.png)");
    }

    if (energiaAtual === 1) {

        $("#energia").css("background-image", "url(imagens/energia1.png)");
    }

    if (energiaAtual === 0) {

        $("#energia").css("background-image", "url(imagens/energia0.png)");

    }

}
/**
 * Termina o jogo
 */
function gameOver(){
    fimdejogo = true;
    musica.pause();
    somGameover.play();

    window.clearInterval(jogo.timer);
    jogo.timer=null;

    $("#jogador").remove();
    $("#inimigo1").remove();
    $("#inimigo2").remove();
    $("#amigo").remove();

    $("#fundoGame").append("<div id='fim'></div>");

    $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<p>Você resgatou: " + salvos + " amigos</p>" + "<p>Você perdeu: " + perdidos + " amigos</p>"+ "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");

}

/**
 * Vai reiniciar o jogo e zerar o placar
 */
function reiniciaJogo() {
    somGameover.pause();
    $("#fim").remove();
    energiaAtual = 3;
    pontos = 0;
    salvos = 0;
    perdidos = 0;
    velocidadeHelicoptero = 5;
    velocidadeCaminhao = 3;
    start();

}

/**
 * Lida com atualização da pontuação e placar
 * @param pontosNovos
 */
function adicionandoPontos(pontosNovos){
    pontos += pontosNovos;
    placar();
}

/**
 * Lida com a pontução e energia ao atingir um inimigo. Além disso aumento a velocidade do inimigo para dificultar o jogo
 * @param pontosNovos
 */
function inimigoAtingido(novaEnergia, pontosNovos){
    somExplosao.play();
    alteracaoEnergia(true, novaEnergia);
    adicionandoPontos(pontosNovos);
    velocidadeHelicoptero += 0.3;
    velocidadeCaminhao += 0.2;
}

/**
 * Caso o amigo a ser resgatado seja perdido, perde-se pontos além de aumentar o número de perdidos
 */
function refemPerdido(){
    somPerdido.play();
    perdidos++;
    alteracaoEnergia(false, 1);
    adicionandoPontos(-50);
}

/**
 * Ao salvar um amigo se ganha pontos e aumenta o salvo
 */
function refemSalvo(){
    somResgate.play();
    salvos++;
    alteracaoEnergia(true, 1);
    adicionandoPontos(150);
}

/**
 * Lida com o jogador sendo perdido
 * @param novaEnergia
 * @param pontosPerdidos
 */
function jogadorAtingido(novaEnergia, pontosPerdidos){
    somExplosao.play();
    alteracaoEnergia(false, novaEnergia);
    adicionandoPontos(pontosPerdidos);
}

/**
 * Função que lida com verificar se a energia pode ser alterada e fazer a alteração
 * Caso a energia seja 3 já está no máximo e não pode ser alterada. Caso seja 0 também.
 * Também termina o jogo se a energia chega a Zero.
 * @param novaEnergia
 */
function alteracaoEnergia(ganha, novaEnergia){
    if(ganha === true){
        if(energiaAtual < 3 && energiaAtual > 0){
            energiaAtual += novaEnergia;
        }
    }
    if(ganha === false){
        if(energiaAtual > 0){
            energiaAtual -= novaEnergia;
        }
    }

    if(energiaAtual <= 0){
        gameOver();
    }
    energia();
}








