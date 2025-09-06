import React from 'react';
import './styles.css';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="display-container">
      <div className="display-value">{value}</div>
    </div>
  );
};

export default Display;