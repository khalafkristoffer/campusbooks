// src/components/SellSection.jsx
import React from "react";
import Button from "./Button";
import "../styles/styles.css";

/**
 * SellSection component displaying options for sellers.
 */
const SellSection = () => {
  return (
    <div className="sell-section">
      <p>Får du inte sålt din bok? Vi köper den!</p>
      <Button className="sell-button">📦 Sälj till oss</Button>
      <h2>Lägg upp en ny bok</h2>
      <input type="text" placeholder="Boktitel" />
      <input type="text" placeholder="Författare" />
      <input type="number" placeholder="Pris" />
      <Button className="button-primary">➕ Lägg upp boken</Button>
    </div>
  );
};

export default SellSection;