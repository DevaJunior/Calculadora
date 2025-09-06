import React, { useReducer } from 'react';
import { calculatorReducer, initialState } from './calculator.state';

import Display from '../../components/Display';
import Button from '../../components/Button';
import './styles.css';

const Calculadora: React.FC = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const { displayValue, expression, errorMessage } = state;

  const handleClear = () => dispatch({ type: 'clear' });
  const handleSignChange = () => dispatch({ type: 'change_sign' });
  const handlePercentage = () => dispatch({ type: 'percentage' });
  const handleDigit = (digit: string) => dispatch({ type: 'add_digit', payload: digit });
  const handleOperator = (operator: string) => dispatch({ type: 'set_operator', payload: operator });
  const handleEquals = () => dispatch({ type: 'calculate' });

  return (
    <div className="calculator">
      <Display value={displayValue} expression={expression} errorMessage={errorMessage} />
      <div className="calculator-buttons">
        <Button label="AC" onClick={handleClear} className="func-button" />
        <Button label="±" onClick={handleSignChange} className="func-button" />
        <Button label="%" onClick={handlePercentage} className="func-button" />
        <Button label="÷" onClick={() => handleOperator('/')} className="operator-button" />

        <Button label="7" onClick={() => handleDigit('7')} />
        <Button label="8" onClick={() => handleDigit('8')} />
        <Button label="9" onClick={() => handleDigit('9')} />
        <Button label="×" onClick={() => handleOperator('*')} className="operator-button" />

        <Button label="4" onClick={() => handleDigit('4')} />
        <Button label="5" onClick={() => handleDigit('5')} />
        <Button label="6" onClick={() => handleDigit('6')} />
        <Button label="−" onClick={() => handleOperator('-')} className="operator-button" />
        
        <Button label="1" onClick={() => handleDigit('1')} />
        <Button label="2" onClick={() => handleDigit('2')} />
        <Button label="3" onClick={() => handleDigit('3')} />
        <Button label="+" onClick={() => handleOperator('+')} className="operator-button" />
        
        <Button label="0" onClick={() => handleDigit('0')} className="zero-button" />
        <Button label="." onClick={() => handleDigit('.')} />
        <Button label="=" onClick={handleEquals} className="equals-button" />
      </div>
    </div>
  );
};

export default Calculadora;