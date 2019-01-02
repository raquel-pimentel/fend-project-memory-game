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

function loadGame() {
  var deck = document.getElementById("deck");
  for (var item = 0; item < cardList.length; item++) {
    var li = document.createElement("LI");
    li.setAttribute("class", "card");
    li.setAttribute("onclick", "compareCards(this)");

    var icon = document.createElement("i");
    icon.setAttribute("class", "fa " + cardList[item]);

    li.appendChild(icon);
    deck.appendChild(li);
  }
}

loadGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var moves = 0;

function rateGame() {
  var starContainer = document.getElementById("stars");

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

function addMoves() {
  moves++;
  rateGame();
  document.getElementById("moves").innerHTML = moves;
}

function compareCards(card) {
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

  if (openCardCount > 1) {
    return null;
  }

  showCard(card);
  if (openCardCount === 1) {
    addMoves();
    var selectedCardValue = card.children[0].classList.item(1);
    var openCardValue = openCard.children[0].classList.item(1);

    if (selectedCardValue === openCardValue) {
      matchCard(card);
      matchCard(openCard);
    } else {
      setTimeout(function() {
        hideCard(card);
        hideCard(openCard);
      }, 1500);
    }
  }
}
