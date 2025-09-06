import React from 'react';
import './styles.css';

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
  return (
    <button className={`calculator-button ${className}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default Button;