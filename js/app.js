/** Inicializa lista de cartas disponíveis no jogo */
var cardList = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-anchor",
  "fa-leaf",
  "fa-bicycle",
  "fa-diamond",
  "fa-bomb",
  "fa-leaf",
  "fa-bomb",
  "fa-bolt",
  "fa-bicycle",
  "fa-paper-plane-o",
  "fa-cube"
];

/** Inicia timer sempre zerado */
var timer = 0;

/** Adiciona 1 segundo no timer*/
var interval = false;

/** Inicia uma partida sempre com 0 moves */
var moves = 0;

/** Inicia uma partida sempre com 0 pontos */
var points = 0;

/** Embaralha as cartas e disponibiliza como mesa de nova rodada */
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function clearTable(deck) {
  while (deck.lastChild) {
    deck.removeChild(deck.lastChild);
  }
}

function createTable(deck) {
  var shuffledCards = shuffle(cardList);
  for (var item = 0; item < shuffledCards.length; item++) {
    var li = document.createElement("li");
    li.setAttribute("class", "card");
    li.setAttribute("onclick", "validateCard(this)");

    var icon = document.createElement("i");
    icon.setAttribute("class", "fa " + shuffledCards[item]);

    li.appendChild(icon);
    deck.appendChild(li);
  }
}

/** Relógio contador de tempo do round*/
function formatTimer() {
  var date = new Date(timer * 1000);
  var seconds = date.getSeconds();
  return date.getMinutes() + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function addTimer(clock) {
  interval = setInterval(function() {
    timer++;
    clock.innerHTML = formatTimer();
  }, 1000);
}

function stopCounter() {
  clearInterval(interval);
}

function clockCounter() {
  var clock = document.getElementById("clockCounter");
  addTimer(clock);
}

function clearTimer() {
  timer = 0;
  document.getElementById("clockCounter").innerHTML = "0:00";
}

/** Carrega a rodada */
function loadGame() {
  var deck = document.getElementById("deck");
  clearTable(deck);
  createTable(deck);
  clockCounter();
}

/** Após finalização e chamada de modal, reinicia a rodada após clicar no botão iniciar novamente */
function restartGame() {
  closeModal();
  stopCounter();
  clearTimer();
  clearMoves();
  setTimeout(function() {
    loadGame();
  }, 500);
}

loadGame();

/** avaliação de performace baseada em quantidade de cliques */
function rateGame(starContainer) {
  if (moves <= 12) {
    starContainer.innerHTML =
      "<li><i class='fa fa-star'></i></li>" +
      "<li><i class='fa fa-star'></i></li>" +
      "<li><i class='fa fa-star'></i></li>";
  } else if (moves <= 18) {
    starContainer.innerHTML =
      "<li><i class='fa fa-star'></i></li>" +
      "<li><i class='fa fa-star'></i></li>";
  } else {
    starContainer.innerHTML = "<li><i class='fa fa-star'></i></li>";
  }
}

/** contador de clicks para medir quantidade de movimentos dados na rodada*/
function addMoves() {
  moves++;
  rateGame(document.getElementById("stars"));
  document.getElementById("moves").innerHTML = moves;
}

function clearMoves() {
  moves = 0;
  document.getElementById("moves").innerHTML = "0";
}

/** balanço de pontos para finalização de rodada para inicir modal bom balanço final*/

function checkScore() {
  points++;
  if (points === cardList.length / 2) {
    winGame();
  }
}

function winGame() {
  stopCounter();
  showModal();
}

function showModal() {
  document.getElementById("modal").style.display = "block";
  document.getElementById("shadow").style.display = "block";
  document.getElementById("finalTime").innerHTML = formatTimer();
  rateGame(document.getElementById("finalStar"));
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("shadow").style.display = "none";
}

/** compara as cartas escolhidas, avalia se elas são iguais ou não. Se for match verde, se não azul e fecha as opções escolhidas */
function showCard(card) {
  card.classList.add("open");
  card.classList.add("show");
}

function hideCard(card) {
  card.classList.remove("open");
  card.classList.remove("show");
}

function matchCard(card) {
  card.classList.remove("open");
  card.classList.remove("show");
  card.classList.add("match");
}

function compareCards(card, openCard) {
  var selectedCardValue = card.children[0].classList.item(1);
  var openCardValue = openCard.children[0].classList.item(1);

  if (selectedCardValue === openCardValue) {
    matchCard(card);
    matchCard(openCard);
    checkScore();
  } else {
    setTimeout(function() {
      hideCard(card);
      hideCard(openCard);
    }, 1000);
  }
}

/** Função de validação de cartas */
function validateCard(card) {
  /** Se a primeira das cartas estiver azul ou verde, cancela a execução. */
  if (card.classList.contains("open") || card.classList.contains("match")) {
    return null;
  }
  var deck = document.getElementById("deck").children;
  var cardCount = deck.length;
  var openCard = null;
  var openCardCount = 0;

  for (var i = 0; i < cardCount; i++) {
    if (deck[i].classList.contains("open")) {
      openCard = deck[i];
      openCardCount++;
    }
  }

  /** Näo permite que o usuário tenha mais de duas cartas abertas */
  if (openCardCount > 1) {
    return null;
  }
  showCard(card);

  /** Execução só acontece se uma das cartas estiver aberta */
  if (openCardCount === 1) {
    compareCards(card, openCard);
    addMoves();
  }
}
