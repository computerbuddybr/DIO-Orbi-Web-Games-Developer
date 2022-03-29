/**
 * Minha versão de gets() e print() para testes
 */
function gets(pergunta){
    let valor = prompt(`Digite o valor para ${pergunta}: `);
    while(isNaN(valor)){
        valor = prompt("Você não digitou um número. Favor digitar um número: ");
    }
    return valor;
}
function print(variavel){
    console.log(variavel)
}
//Para poder mostrar o resultado no HTML
const res = document.querySelector('#resultado');
let valores = [];
//Desafio

let limit = parseInt(gets("a quantidade de pares esperados"));
for (let i = 0; i < limit; i++) {
    let X = parseInt(gets("o primeiro valor"));
    let Y = parseInt(gets("o segundo valor"));
    let divisao;
    console.log(`Para o ${i+1}º par o resultado é:`);
    if (Y == 0) {
        divisao = "divisao impossivel";
        console.log(divisao);
    } else {
        divisao = parseFloat(X/Y).toFixed(1);
        console.log(divisao);

    }
    valores.push([X,Y,divisao]);
}
//Mostrando no html
let html = "";
for(i = 0; i < valores.length; i++){
    html += `<p>O resultado da divisão de ${valores[i][0]} e ${valores[i][1]} é: ${valores[i][2]}</p>`;
}
res.innerHTML = html;