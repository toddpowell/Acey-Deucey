import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

let handCardNum = 1;

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

  const betOptions = [
    { value: "0", label: "0" },
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "15", label: "15" },
    { value: "20", label: "20" },
    { value: "25", label: "25" },
  ];
  const [betValue, setBetValue] = useState(0);
  console.log("betValue: " + betValue);

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
    const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    let deck = new Array();

    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < names.length; x++) {
        let card = { suit: suits[i], name: names[x], value: cardValues[x] };
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

    if (handCardNum > 3) {
      handCardNum = 1;
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
    img.id = "card" + handCardNum + "img";
    dealtCard.id = "card" + handCardNum;
    dealtCard.classList.add("hide");
    dealtCard.appendChild(img);
    document.getElementById("card" + handCardNum).innerHTML = "";
    document.getElementById("card" + handCardNum).appendChild(dealtCard);
    document.getElementById("card" + handCardNum + "img").src =
      "public/images/cards/card_" + card.name + card.suit + ".gif";

    handCardNum++;
  }

  function newGame() {
    // Clear cards from table
    // Reset chip count
    // Shuffle deck
    shuffleDeck();
  }

  function nextHand() {
    document.getElementById("card1").innerHTML = "";
    document.getElementById("card2").innerHTML = "";
    document.getElementById("card3").innerHTML = "";
    dealCard();
    dealCard();
  }

  function onChangeBet() {
    alert("bet");
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="menu-bar">
          <button onClick={() => newGame(deck)}>New Game</button>{" "}
          {/* <button onClick={() => shuffleDeck(deck)}>Shuffle Deck</button> */}
        </div>
        <div className="game-table">
          <div className="card-flop-wrapper">
            <div className="card-flop">
              <div id="card1">c1</div>
              <div id="card3">c3</div>
              <div id="card2">c2</div>
            </div>
          </div>
          <div className="game-controls-wrapper">
            <div className="game-controls">
              {" "}
              <button onClick={() => nextHand()}>Next Hand</button>
              <div className="bet-options">
                <h3>Bet: </h3>
                {betOptions.map((betOption) => (
                  <div key={betOption.value}>
                    <input
                      type="radio"
                      name="gender"
                      value={betOption.value}
                      id={betOption.value}
                      checked={betValue === betOption.value}
                      onChange={(e) => setBetValue(e.target.value)}
                    />
                    <label htmlFor={betOption.value}>{betOption.value}</label>
                  </div>
                ))}
              </div>
              <button onClick={() => dealCard()}>Deal Card</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
