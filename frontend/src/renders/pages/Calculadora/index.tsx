import React, { useState } from 'react';
import Display from '../../components/Display';
import Button from '../../components/Button';
import './styles.css';

const Calculadora: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);
  
  // Novo estado para rastrear se um cálculo foi finalizado
  const [isResult, setIsResult] = useState<boolean>(false);

  const handleClear = () => {
    setDisplayValue('0');
    setExpression('');
    setOperator(null);
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
    setIsResult(false);
  };

  const handleDigit = (digit: string) => {
    // Se um resultado foi obtido, limpa a expressão para um novo cálculo
    if (isResult) {
      setExpression(digit);
      setDisplayValue(digit);
      setFirstOperand(parseFloat(digit));
      setIsResult(false);
      setWaitingForSecondOperand(false);
      return;
    }
    
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setExpression(expression + digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
      setExpression(expression + digit);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    // Se a última ação foi um resultado, reinicia o cálculo com o resultado
    if (isResult) {
        setExpression(`${displayValue}${nextOperator}`);
        setOperator(nextOperator);
        setFirstOperand(inputValue);
        setIsResult(false);
        setWaitingForSecondOperand(true);
        return;
    }
    
    if (firstOperand === null) {
      setFirstOperand(inputValue);
      setExpression(expression + nextOperator);
    } else if (operator) {
      const result = performCalculation[operator as keyof typeof performCalculation](firstOperand, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(result);
      setExpression(`${result}${nextOperator}`);
    } else {
      setExpression(expression + nextOperator);
      setFirstOperand(inputValue);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = {
    '/': (first: number, second: number) => first / second,
    '*': (first: number, second: number) => first * second,
    '+': (first: number, second: number) => first + second,
    '-': (first: number, second: number) => first - second,
  };

  const handleEquals = () => {
    if (operator && firstOperand !== null) {
      const secondOperand = parseFloat(displayValue);
      const result = performCalculation[operator as keyof typeof performCalculation](firstOperand, secondOperand);
      
      const finalExpression = `${expression} = ${String(result)}`;
      setExpression(finalExpression);
      
      setDisplayValue(String(result));
      setFirstOperand(result); // O resultado se torna o primeiro operando para a próxima operação
      setOperator(null);
      setWaitingForSecondOperand(true);
      setIsResult(true); // Indica que um resultado foi obtido
    }
  };

  return (
    <div className="calculator">
      <Display value={displayValue} expression={expression} />
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