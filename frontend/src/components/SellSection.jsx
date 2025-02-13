// src/components/SellSection.jsx
import React from "react";
import Button from "./Button";
import "../styles/sell-section.css";

const SellSection = () => {
  return (
    <div className="sell-section">
      <h2>Lägg upp din bok</h2>
      <input type="text" placeholder="Boktitel" />
      <input type="number" placeholder="Pris" />
      <select className="sell-input">
        <option value="">Skick</option>
        <option value="Ny">Factory New</option>
        <option value="Mycket bra">Minimal Wear</option>
        <option value="Bra">Field Tested</option>
        <option value="Använd">Well Worn</option>
        <option value="Dålig">Battle Scarred</option>
      </select>
      <select className="sell-input">
        <option value="">Plats</option>
        <option value="Hubben">Dust 2</option>
        <option value="Biblioteket">Mirage</option>
        <option value="Lindholmen">Cobblestone</option>
        <option value="Chalmers Café">Cache</option>
        <option value="Doesn't matter">Buyer Chooses</option>
      </select>
      <input type="text" placeholder="Phone number" />
      <Button className="button-primary">➕ Lägg upp boken</Button>
      <div style={{ marginTop: "40px" }}></div>
      <p style={{ fontSize: "0.9rem", margin: "10px 0", textAlign: "center" }}>
        Får du inte sålt din bok? Vi köper den!
      </p>
      <Button className="sell-button">📦 Sälj direkt till oss</Button>
    </div>
  );
};

export default SellSection;
