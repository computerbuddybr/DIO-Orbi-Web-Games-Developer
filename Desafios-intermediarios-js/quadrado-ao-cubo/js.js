/**
 * Minha versão de gets() e print() para testes
 */
function gets(){
    let valor = prompt(`Digite o valor: `);
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
let html = "";

//Desafio
let limit = parseInt(gets());

for (let i = 1; i <= limit; i++) {
    let X = Math.pow(i,2);
    let Y = Math.pow(i,3);
    let resultado = `${i} ${X} ${Y}`;
    html += `${resultado}\n`;

    print(resultado);
}
res.innerHTML = html;
