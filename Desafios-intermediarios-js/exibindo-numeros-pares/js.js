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

//Para mostrar no HTML
let html = "";

//Desafio
// Valor informado pelo usuário "N"
let n = parseInt(gets());

// TODO Inclua a condição de parada adequada.
// Dica: note que o contador "i" é incrementado de 2 em 2 (sempre indo para o próximo par).
for (let i = 2; i <= n ; i+=2) {
    console.log(i);
    html += `${i} `;
}
res.innerHTML = `<p>${html}</p>`;

