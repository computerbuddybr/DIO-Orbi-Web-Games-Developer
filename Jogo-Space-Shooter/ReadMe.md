### Jogo Space Shooter

**Enunciado:**

Nesse projeto, o desafio será criar um Space Shooter utilizando HTML, CSS e Javascript. Aprenderemos juntos a trabalhar com posicionamento no CSS e lógica de programação utilizando posicionamento com CSS, manipulação do DOM, eventListeners, e manipulação de Array.

**Sites usados no projeto:**
- Clean PNG - https://www.cleanpng.com/


## Minhas alterações:
Alterei o h4 para h2 visto que na hierarquia e semântica do HTML era a tag correta a ser usada. Para tanto, alterei seu tamanho no CSS.

No movimento da nave para cima e para baixo, alterei o teste para testar um número se maior que ou menor que em vez de igual, pois na descida ou deixava descer demais ou de menos. Eu entendi a lógica da professora. A nave se movimenta de 50 em 50, então em algum momento vai chegar em 0 pois ela começa em 250. O problema é que na descida os múltiplos de 50 ou vão fazer deixar descer demais ou de menos. Então melhor fazer o parseInt antes mesmo.

Adicionei pontuação para ficar mais divertido.

E decidi fazer o espaço ocupar a tela inteira. Achei mais interessante visualmente.

