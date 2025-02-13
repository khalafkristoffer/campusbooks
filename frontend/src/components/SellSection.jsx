// src/components/SellSection.jsx
import React from "react";
import Button from "./Button";
import "../styles/sell-section.css";

const SellSection = () => {
  return (
    <div className="sell-section">
      <h2>Lägg upp en ny bok</h2>
      <input type="text" placeholder="Boktitel" />
      <input type="number" placeholder="Pris" />
      <select className="sell-input">
        <option value="">Skick</option>
        <option value="Ny">Ny</option>
        <option value="Mycket bra">Mycket bra</option>
        <option value="Bra">Bra</option>
        <option value="Använd">Använd</option>
        <option value="Dålig">Dålig</option>
      </select>
      <select className="sell-input">
        <option value="">Plats</option>
        <option value="Hubben">Hubben</option>
        <option value="Biblioteket">Biblioteket</option>
        <option value="Lindholmen">Lindholmen</option>
        <option value="Chalmers Café">Chalmers Café</option>
        <option value="Doesn't matter">Doesn't matter</option>
      </select>
      <input type="text" placeholder="Phone number" />
      <Button className="button-primary">➕ Lägg upp boken</Button>
      <div style={{ marginTop: "40px" }}></div>
      <p style={{ fontSize: "0.9rem", margin: "10px 0", textAlign: "center" }}>
        Får du inte sålt din bok? Vi köper den!
      </p>
      <Button className="sell-button">📦 Sälj till oss</Button>
    </div>
  );
};

export default SellSection;
