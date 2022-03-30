/**
 * Minha versão de gets() e print() para testes
 */
function gets() {
    let valor = prompt(`Digite o valor: `);
    while (isNaN(valor)) {
        valor = prompt("Você não digitou um número. Favor digitar um número: ");
    }
    return valor;
}

function print(variavel) {
    console.log(variavel)
}

//Para poder mostrar o resultado no HTML
const res = document.querySelector('#resultado');

//Desafio
//Leitura dos valores
let valores = [];


//Variáveis para resultados
let valoresPares = 0;
let valoresImpares = 0;
let valoresPositivos = 0;
let valoresNegativos = 0;
let zeros = 0;

//Lendo os valores
for (let i = 0; i < 5; i++) {
    const valorInformadoPeloUsuario = parseInt(gets());
    valores.push(valorInformadoPeloUsuario);

    //Checando valores pares e ímpares
    if (valorInformadoPeloUsuario % 2 === 0) {
        valoresPares++;
    } else {
        valoresImpares++;
    }

    //Checando valores positivos e negativos
    if (valorInformadoPeloUsuario > 0) {
        valoresPositivos++;

    } else if (valorInformadoPeloUsuario < 0) {
        valoresNegativos++;
    } else {
        zeros++;
    }

}

console.log(`Para os valores ${valores}`);
console.log(`${valoresPares} par(es)`);
console.log(`${valoresImpares} impar(es)`);
console.log(`${valoresPositivos} positivo(s)`);
console.log(`${valoresNegativos} negativo(s)`);

//Para mostrar no HTML
let html = "";
html += '<p>Para os valores: ';
for(let i = 0; i < valores.length; i++){
    html += `${valores[i]} `;
}
html += '</p>';

html += `<p>${valoresPares} par(es)</p>`;
html += `<p>${valoresImpares} impar(es)</p>`;
html += `<p>${valoresPositivos} positivo(s)</p>`;
html += `<p>${valoresNegativos} negativo(s)</p>`;
html += `<p>${zeros} zeros</p>`;
res.innerHTML = html;