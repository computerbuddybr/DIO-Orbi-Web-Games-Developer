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
//Recebendo os valores

let A = parseInt(gets());
let B = parseInt(gets());

print(`SOMA = ${A+B}`);
res.innerHTML = `SOMA = ${A+B}`;
