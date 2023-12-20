import { useState, useEffect } from "react";
import "./App.css";

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
  }, []);

  function createDeck() {
    const suits = ["spades", "diamonds", "clubs", "hearts"];
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
  }

  function dealCard() {
    const card = deck.shift();
    console.log(card);
    setCard({
      name: card.name,
      suit: card.suit,
      value: card.value,
    });
  }

  return (
    <>
      <button onClick={() => shuffleDeck(deck)}>Shuffle Deck</button>
      <button onClick={() => dealCard()}>Deal Card</button>
      <div>
        Card: {card.name} of {card.suit}, value: {card.value}
      </div>
    </>
  );
}

export default App;
