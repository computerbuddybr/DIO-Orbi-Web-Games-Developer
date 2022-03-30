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


//Desafio:
let participantes = parseInt(gets("Quantas crianças não enviaram sua cartinha?"));
let criancas;
let array = [];
for(let i = 1; i <= participantes; i++){
    criancas = gets("Favor digitar o nome da criança espaço M ou F dependendo do sexo").split(' ');
    console.log(criancas);
    array.push(criancas[1]);
    console.log(array);
}


const meninos = array.filter((el) => el ==='M').length;
const meninas = array.filter((el) => el ==='F').length;
let resultado = `${meninos} carrinhos\n${meninas} bonecas`;
print(resultado);
res.innerHTML = resultado;