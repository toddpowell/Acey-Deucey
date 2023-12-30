import { useState, useEffect } from "react";
import "./App.css";

let deck = new Array();
let handCardNum = 1;
let handCardArray = [];

function App() {
  const [message, setMessage] = useState("");
  // let [deck, setDeck] = useState([]);
  let [card, setCard] = useState({
    suit: "",
    name: "",
    value: "",
  });
  const [funds, setFunds] = useState(100);
  const [tempFunds, setTempFunds] = useState(funds);
  const [pot, setPot] = useState(0);

  useEffect(() => {
    document.getElementById("next-hand-btn").disabled = false;
    document.getElementById("show-card-btn").disabled = true;
    deck = createDeck();
    console.log(deck);
    // setDeck(deck);
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

    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < names.length; x++) {
        let card = { suit: suits[i], name: names[x], value: cardValues[x] };
        deck.push(card);
      }
    }

    return deck;
  }

  // Fisher-Yates
  function shuffleDeck() {
    for (let i = 51; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
      console.log(i);
    }
    console.log(deck);
    setCardNumber(0);
  }

  function dealCard() {
    if (cardNumber > 49) {
      shuffleDeck();
      setCardNumber((cardNumber) => cardNumber + 1);
    }

    if (handCardNum > 3) {
      handCardNum = 1;
      handCardArray.splice(0, handCardArray.length);
    }
    const card = deck.shift();
    setCard({
      name: card.name,
      suit: card.suit,
      value: card.value,
    });
    setCardNumber((cardNumber) => cardNumber + 1);

    let handCard = {
      name: card.name,
      suit: card.suit,
      value: card.value,
    };
    handCardArray.push(handCard);
    // console.log("hand cards");
    // console.log(handCardArray);

    let dealtCard = document.createElement("div");
    let img = document.createElement("img");
    img.id = "card" + handCardNum + "img";

    dealtCard.appendChild(img);
    document.getElementById("card" + handCardNum).innerHTML = "";
    document.getElementById("card" + handCardNum).appendChild(dealtCard);
    document.getElementById("card" + handCardNum + "img").src =
      "public/images/cards/card_" + card.name + card.suit + ".gif";

    handCardNum++;
  }

  function newGame() {
    deck.splice(0, deck.length);
    createDeck();
    console.log(deck);

    document.getElementById("next-hand-btn").disabled = false;
    document.getElementById("show-card-btn").disabled = true;
    document.getElementById("card1").innerHTML = "";
    document.getElementById("card2").innerHTML = "";
    document.getElementById("card3").innerHTML = "";

    setPot(0);
    setFunds(100);
    shuffleDeck();
  }

  function nextHand() {
    document.getElementById("next-hand-btn").disabled = true;
    document.getElementById("show-card-btn").disabled = false;
    setMessage("");
    document.getElementById("card1").innerHTML = "";
    document.getElementById("card2").innerHTML = "";
    document.getElementById("card3").innerHTML = "";
    setPot(5);
    handleBet(0);
    setTempFunds(funds - 5);
    dealCard();
    dealCard();
  }

  function handleBet(bet) {
    setBetValue(bet);
    setPot(5 + Number(bet));
    setTempFunds(funds - (5 + Number(bet)));
  }

  function showCard() {
    document.getElementById("next-hand-btn").disabled = false;
    document.getElementById("show-card-btn").disabled = true;
    dealCard();

    if (handCardArray[1].value > handCardArray[0].value) {
      if (
        handCardArray[2].value > handCardArray[0].value &&
        handCardArray[2].value < handCardArray[1].value
      ) {
        setMessage("You WIN $" + pot);
        setFunds(funds + Number(pot));
      } else {
        setMessage("You LOSE $" + pot);
        setFunds(funds - Number(pot));
      }
    } else {
      if (
        handCardArray[2].value < handCardArray[0].value &&
        handCardArray[2].value > handCardArray[1].value
      ) {
        setMessage("You WIN $" + pot);
        setFunds(funds + Number(pot));
      } else {
        setMessage("You LOSE $" + pot);
        setFunds(funds - Number(pot));
      }
    }
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="menu-bar">
          <button onClick={() => newGame()}>New Game</button>{" "}
          <button onClick={() => shuffleDeck()}>Shuffle Deck</button>
        </div>
        <div className="game-table">
          <div className="funds">Funds: ${funds}</div>
          <div className="temp funds">Temp: ${tempFunds}</div>
          <div className="funds">Bet: ${betValue}</div>
          <div className="cards-wrapper">
            <div className="cards">
              <div className="card" id="card1"></div>
              <div className="card" id="card3"></div>
              <div className="card" id="card2"></div>
            </div>
          </div>

          <div className="message">{message}</div>

          <div className="game-controls-wrapper">
            <div className="message">Pot: ${pot}</div>
            <div className="ante-msg">$5 ante</div>
            <div className="game-controls">
              <div>
                <button id="next-hand-btn" onClick={() => nextHand()}>
                  Next Hand
                </button>
              </div>
              <div className="bet-options">
                <h3>Bet: </h3>
                {betOptions.map((betOption) => (
                  <div key={betOption.value}>
                    <input
                      type="radio"
                      name="bet"
                      value={betOption.value}
                      id={betOption.value}
                      checked={betValue === betOption.value}
                      onChange={(e) => handleBet(e.target.value)}
                    />
                    <label htmlFor={betOption.value}>{betOption.value}</label>
                  </div>
                ))}
              </div>
              <div>
                <button id="show-card-btn" onClick={() => showCard()}>
                  Show Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
