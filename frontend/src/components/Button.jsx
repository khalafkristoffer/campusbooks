// src/components/Button.jsx
import React from "react";
import "../styles/buttons.css";

const Button = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
};

export default Button;
