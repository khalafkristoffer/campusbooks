// src/components/BuyInstructions.jsx
import React from "react";
import "../styles/tutorial.css";

const BuyInstructions = () => {
  return (
    <div className="buy-tutorial">
      <ol>
        <li>Hitta din bok.</li>
        <li>Kontakta säljaren och bestäm vart ni kan träffas.</li>
        <li>Lägg upp din bok när du läst färdigt kursen.</li>
      </ol>
    </div>
  );
};

export default BuyInstructions;
