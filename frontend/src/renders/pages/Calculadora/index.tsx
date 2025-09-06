import React, { useState } from 'react';
import Display from '../../components/Display';
import Button from '../../components/Button';
import './styles.css';

const Calculadora: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
  };

  const handleDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation[operator as keyof typeof performCalculation](firstOperand, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = {
    '/': (first: number, second: number) => first / second,
    '*': (first: number, second: number) => first * second,
    '+': (first: number, second: number) => first + second,
    '-': (first: number, second: number) => first - second,
    '=': (first: number, second: number) => second,
  };

  const handleEquals = () => {
    if (operator && firstOperand !== null) {
      const result = performCalculation[operator as keyof typeof performCalculation](firstOperand, parseFloat(displayValue));
      setDisplayValue(String(result));
      setFirstOperand(result);
      setOperator(null);
      setWaitingForSecondOperand(true);
    }
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="calculator-buttons">
        <Button label="C" onClick={handleClear} className="clear-button" />
        <Button label="/" onClick={handleOperator} className="operator-button" />
        <Button label="7" onClick={handleDigit} />
        <Button label="8" onClick={handleDigit} />
        <Button label="9" onClick={handleDigit} />
        <Button label="*" onClick={handleOperator} className="operator-button" />
        <Button label="4" onClick={handleDigit} />
        <Button label="5" onClick={handleDigit} />
        <Button label="6" onClick={handleDigit} />
        <Button label="-" onClick={handleOperator} className="operator-button" />
        <Button label="1" onClick={handleDigit} />
        <Button label="2" onClick={handleDigit} />
        <Button label="3" onClick={handleDigit} />
        <Button label="+" onClick={handleOperator} className="operator-button" />
        <Button label="0" onClick={handleDigit} className="zero-button" />
        <Button label="." onClick={handleDigit} />
        <Button label="=" onClick={handleEquals} className="equals-button" />
      </div>
    </div>
  );
};

export default Calculadora;