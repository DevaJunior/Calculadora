import React from 'react';
import './styles.css';

interface DisplayProps {
  value: string;
  expression: string;
  errorMessage: string | null; // Adiciona a nova prop
}

const Display: React.FC<DisplayProps> = ({ value, expression, errorMessage }) => {
  return (
    <div className="display-container">
      {errorMessage ? (
        // Se houver uma mensagem de erro, exibe-a no lugar da expressão e valor
        <div className="display-error">{errorMessage}</div>
      ) : (
        <>
          <div className="display-expression">{expression}</div>
          <div className="display-value">{value}</div>
        </>
      )}
    </div>
  );
};

export default Display;