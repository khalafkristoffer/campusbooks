// src/components/Button.jsx
import React from "react";
import "../styles/buttons.css";

const Button = ({ children, className, onClick, type = "button" }) => {
  return (
    <button type={type} onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
};

export default Button;
