// src/components/Button.jsx
import React from "react";
import "../styles/styles.css";

/**
 * Button component to render a styled button.
 * @param {object} props - Properties including children, className, and onClick.
 */
const Button = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
};

export default Button;
