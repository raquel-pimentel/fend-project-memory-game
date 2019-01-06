# Projeto - Jogo da Memória

Esse projeto foi desenvolvido para o curso de Nanodegree em Fundamentos de Front End na Udacity.
O objetivo é construir a lógica do jogo da memória e pensar na experiência do usuário fazendo com que o jogo seja acessado em qualquer dispositivo.

## Regras do jogo

O objetivo do jogo é exercitar a memória procurando os pares das cartas entre as 16 oferecidas randomicamente a cada rodada.

        - O jogador deve virar uma carta para revelar seu símbolo
        - Então, esse mesmo jogador deve virar outra carta, tentando encontrar a carta correspondente.
        - Se as cartas forem iguais, ambas ficam viradas para cima
        - Se as cartas não forem iguais, ambas devem ser viradas para baixo novamente

Avaliação de performace

        - Se o jogador finalizar em até 12 tentativas, ele consegue avaliação máxima de 3 estrelas
        - Entre 12 e 18 tentativas, o jogador alcança a avaliação de 2 estrelas.
        - A partir de 18 tentativas, a avaliação será de 1 estrela

## Estrutura do Projeto

O projeto consiste em uma estrutura com html, css e javascript.

        - CSS tem a importante função de fazer com que tenhamos uma versão responsiva do jogo, além do estilo junto com cores, fontes e espaçamentos.

        - Javascript traz a lógica para o jogo, além da interação entre objetos e funcionalidades como: avaliaçäo de performace, timer, loadgame, reset game e comparação entre cartas.

        - HTML essencial para marcação e estruturação da informação, criação de objetos e funcionalidades estáticas que trabalhadas com Javascript retornam um produto com interatividade.
