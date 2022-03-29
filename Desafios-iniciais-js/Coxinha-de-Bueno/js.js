/**
 * Minha versão de gets() e print() para testes
 */
function gets(pergunta){
    let valor = prompt(`Digite o valor de ${pergunta} `);
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
//Desafio
let line = [];
line[0] = parseInt(gets("coxinhas totais consumidas"));
line[1] = parseInt(gets("participantes"));

let resultado = parseFloat(line[0]/line[1]).toFixed(2);
print(resultado);
res.innerHTML = resultado;