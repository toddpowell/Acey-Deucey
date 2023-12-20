import React from "react";

function Card(props) {
  return (
    <>
      <div>
        <p>Card name: {props.name}</p>
      </div>
      <div className="card">
        <div className="card-front">
          <img src="public/images/cards/card_2c.gif" alt="" />
        </div>
      </div>
    </>
  );
}

export default Card;
