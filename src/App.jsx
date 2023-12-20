import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  let [deck, setDeck] = useState([]);
  let [card, setCard] = useState({
    suit: "",
    name: "",
    value: "",
  });

  useEffect(() => {
    deck = createDeck();
    console.log(deck);
    setDeck(deck);
    // renderDeck(deck);
  }, []);

  const [cardNumber, setCardNumber] = useState(0);

  function createDeck() {
    const suits = ["c", "d", "h", "s"];
    const names = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    let deck = new Array();

    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < names.length; x++) {
        let card = { suit: suits[i], name: names[x], value: values[x] };
        deck.push(card);
      }
    }

    return deck;
  }

  // Fisher-Yates
  function shuffleDeck(deck) {
    const deckSize = 52;
    for (let i = 52; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
      console.log(i);
    }
    console.log(deck);
    setCardNumber(0);
    // renderDeck(deck);
  }

  function dealCard() {
    if (cardNumber > 49) {
      shuffleDeck(deck);
      setCardNumber((cardNumber) => cardNumber + 1);
    }

    const card = deck.shift();
    console.log(card);
    setCard({
      name: card.name,
      suit: card.suit,
      value: card.value,
    });
    setCardNumber((cardNumber) => cardNumber + 1);

    let dealtCard = document.createElement("div");
    let img = document.createElement("img");
    img.id = "card1img";
    dealtCard.id = "card1";
    dealtCard.appendChild(img);
    document.getElementById("card1").innerHTML = "";
    document.getElementById("card1").appendChild(dealtCard);
    document.getElementById("card1img").src =
      "public/images/cards/card_" + card.name + card.suit + ".gif";
  }

  // function renderDeck(deck) {
  //   document.getElementById("deck").innerHTML = "";

  //   for (let i = 0; i < deck.length; i++) {
  //     let card = document.createElement("div");
  //     let name = document.createElement("div");
  //     let suit = document.createElement("div");
  //     let value = document.createElement("div");
  //     card.className = "card";
  //     name.className = "name";
  //     suit.className = "suit " + deck[i].suit;
  //     name.className = "value";

  //     name.innerHTML = deck[i].name;
  //     suit.innerHTML = deck[i].suit;
  //     value.innerHTML = deck[i].value;
  //     card.appendChild(name);
  //     card.appendChild(suit);
  //     card.appendChild(value);

  //     document.getElementById("deck").appendChild(card);
  //   }
  // }

  return (
    <>
      <button onClick={() => shuffleDeck(deck)}>Shuffle Deck</button>
      <button onClick={() => dealCard()}>Deal Card</button>
      <div>
        Card #{cardNumber}
        <br></br>
        {card.name} of {card.suit}
        <br></br>
        value: {card.value}
      </div>
      <hr></hr>
      Deck
      <div id="card1"></div>
      <div id="card2"></div>
      <div id="card3"></div>
    </>
  );
}

export default App;
