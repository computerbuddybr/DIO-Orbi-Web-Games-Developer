/**
 * Minha versão de print() para testes
 */

function print(variavel){
    console.log(variavel)
}
//Meu elemento HTML para poder mostrar como fica a imagem no HTML
const resultado = document.querySelector('#resultado');
//Desafio
let primeiraLinha = "";
//O string que mostrará a imagem no HTML, não usar no print, falha o teste
let resultadoFinal = "";
for(let i = 0; i < 39; i++){
    primeiraLinha += "-";
}
resultadoFinal += primeiraLinha + "\n";
let tracoVertical = "|";
for(let i=1; i < 37; i++){
    tracoVertical += " ";
}
tracoVertical += "|";
print(primeiraLinha);
for(let i =0; i < 5; i++){
    print(tracoVertical);
    resultadoFinal += tracoVertical + "\n";
}
resultadoFinal += primeiraLinha + "\n";
resultado.innerHTML = resultadoFinal;
print(primeiraLinha);
