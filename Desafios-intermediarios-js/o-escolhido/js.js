/**
 * Minha versão de gets() e print() para testes
 */
function gets(pergunta){
    let valor = prompt(pergunta);
    return valor;

}
function print(variavel){
    console.log(variavel)
}
//Para poder mostrar o resultado no HTML
const res = document.querySelector('#resultado');


//Desafio
let alunos = parseInt(gets("Quantos alunos temos"));
let line;
let matricula;
let maiorNota = 0;


for(let i = 1; i <= alunos; i++){
    line = gets("Escreva primeiro a matricula do aluno e depois a nota separada por espaço");
    line = line.split(" ");
    if(parseFloat(line[1]) >= 8 && parseFloat(line[1]) > maiorNota){
        matricula = line[0];
        maiorNota = parseFloat(line[1]);
    }
}

let resultado;
if(maiorNota >= 8)
    resultado = matricula;
else
    resultado ="Minimum note not reached";
print(resultado);
res.innerHTML = resultado;