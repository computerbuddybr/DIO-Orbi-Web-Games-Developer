### Jogo De Naves

**Enunciado:**

Uma das dificuldades dos desenvolvedores de jogos é encontrar uma plataforma de desenvolvimento compatível com os diversos dispositivos móveis no mercado e também com os diferentes navegadores (browsers). Utilizando o HTML5 juntamente com as folhas de estilo CSS3 e o JavaScript, é possível desenvolver jogos de forma rápida e compatível com diversas plataformas, incluindo dispositivos móveis. No projeto são discutidas as etapas de desenvolvimento de jogos em HTML5, CSS3 e JavaScript do início ao fim, utilizando a didática passo a passo em seu desenvolvimento. Neste projeto, especificamente, os jogos serão publicados de forma que possam ser acessados via browser.

**Links usados para o projeto**
- jQuery - https://jquery.com/
- jQuery Docs - https://api.jquery.com/
- jQuery CDN links - https://releases.jquery.com/
- jQuery Collision - https://sourceforge.net/projects/jquerycollision/ and https://eruciform.com/posts/jquery-collision/
- Link Dropbox Professor -https://dropbox.com/s/17010wb608q4olu/JogosHTML5.zip?dl=0

_Usei o código jQuery e jQuery Collision fornecido pelo professor para garantir compatibilidade com o mostrado pelo professor._


## Minhas alterações:
 O professor aninhou muitas das funções. Preferi declará-las separadamente para dar melhor leitura de código.
Alterei de leve o CSS para dar uma visualização melhor ao botão de iniciar adicionando um cursor pointer e um cinza bem claro no hover.

Troquei as teclas de controle porque para mim fazia mais sentido mover o helicoptero para cima e para baixo com as flechas e disparar com a barra de espaço.
Adicionei pontuação quando se salva um amigo. Para mim não fazia sentido pois é o objetivo do jogo salvar a maior quantidade de amigos possível, portanto salvar um amigo deveria dar o maior número de pontos.

Também tirei a função placar do loop do jogo. O loop é chamado constantemente e para mim só fazia sentido chamar a função placar uma vez quando começa para inicializar o placar e depois somente quando há alteração do plcar, não constantemente.

Para dificultar o jogo também adicionei perda de ponto ao perder amigos e perda de energia ao perder amigos.

Mas para incentivar atingir os inimigos em vez de ficar parado esperando amigos, se ganha energia ao atingir um helicóptero inimigo.


Regras adaptadas:
Você começa com uma energia de 3.
Cada vez que o seu helicóptero explode você perde 1 energia.

Cada vez que você atinge um helicóptero inimigo você ganha 1 energia caso já tenha perdido alguma e ganha 100 pontos.

Cada vez que você atinge um caminhão você ganha 50 pontos.

Cada vez que você salva um amigo você ganha 150 pontos e 1 energia caso tenha perdido alguma.

Cada vez que você perde um amigo você perde 1 energia e 50 pontos.

Seu objetivo é acabar com a maior pontuação, salvar o maior número de vidas e perder o menor número de amigos a serem resgatados. O jogo termina quando você perde toda a energia.

A medida que você for atingido inimigos a velocidade deles vai aumentando!


