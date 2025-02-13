// src/components/SearchAndFilter.jsx
import React from "react";
import "../styles/search.css";

const SearchAndFilter = () => {
  return (
    <div className="search-filters-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Sök din kursbok..."
      />
      <div className="filters">
        <select>
          <option>Filtrera kurskod</option>
          <option>EDA450</option>
          <option>ML400</option>
        </select>
        <select>
          <option>Filtrera pris</option>
          <option>0-200 kr</option>
          <option>200-500 kr</option>
        </select>
        <select>
          <option>Filtrera skick</option>
          <option>Nyskick</option>
          <option>Bra skick</option>
        </select>
        <select>
          <option>Filtrera plats</option>
          <option>Hubben</option>
          <option>Biblioteket</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;
