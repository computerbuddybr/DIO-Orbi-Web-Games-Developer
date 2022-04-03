### Jogo Da Velha

**Enunciado:**

Neste projeto, vamos construir juntos um jogo da velha, utilizando somente HTML para estruturar nosso site, CSS para estilizar e dar vida a ele, e Javascript para criarmos toda suas interações, desde a escolha do jogador, efetivar uma jogada e dar um vencedor ao jogo. Vamos abordar conceitos básicos sobre as linguagens e como podemos criar projetos bem simples sem muito trabalho, apenas utilizando suas funções básicas e uma pouco de lógica!

## Minhas alterações:

O professor lidou com os eventos diretamente no HTML, eu preferi colocar tudo no script JS usando querySelectors para selecionar meus elementos e adicionar os Event Listeners.

Também em alguns momentos o professor se repetiu em código na checagem das sequências ganhadoras, preferi estabelecer arrays para poder fazer loops forEach e exercitar o DRY além de variáveis para lidar com os diferentes jogadores. Com isso pude usar a variável winner como controle e não para alterar o HTML do label de vencedor.

Para reiniciar também decidi simplesmente fazer um reload da página do que alterar o HTML como o professor fez.

Alterei um pouco o CSS para dar leves alterações como o fundo das cores da minha marca, umas bordas arredondadas para o botão e as caixinhas do jogo assim como uma leve sombra para as caixas.

Foi muito interessante este exercício, pois no curso de JS que ministro na Udemy havia justamente criado para os alunos um Jogo Da Velha há dois anos. Foi bem legal ver como outro professor pensou diferente a resolução e como eu mesmo decidi misturar as duas resoluções, coisas minhas que achei melhor mudar depois de ver aqui e coisas minhas que decidi trazer aqui (como o array de sequências vencedoras, e os objetos de jogador), para facilitar o uso do código.

Caso haja interesse de ver o projeto para os alunos da Udemy, está aqui mesmo no GitHub em meu repositório [Recursos JS.](https://github.com/computerbuddybr/RecursosJS/tree/main/Aula%2036%20e%2037%20-%20Projeto%20Jogo%20da%20Velha)

