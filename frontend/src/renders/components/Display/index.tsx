import React from 'react';
import './styles.css';

interface DisplayProps {
  value: string;
  expression: string;
}

const Display: React.FC<DisplayProps> = ({ value, expression }) => {
  return (
    <div className="display-container">
      <div className="display-expression">{expression}</div>
      <div className="display-value">{value}</div>
    </div>
  );
};

export default Display;