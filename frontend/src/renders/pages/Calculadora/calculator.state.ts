import type { Action, CalculatorState } from './calculator.types';

// O estado inicial da calculadora
export const initialState: CalculatorState = {
  displayValue: '0',
  expression: '',
  operator: null,
  firstOperand: null,
  waitingForSecondOperand: false,
  isResult: false,
  errorMessage: null,
};

// Função auxiliar
const performCalculation: { [key: string]: (a: number, b: number) => number } = {
  '/': (first, second) => first / second,
  '*': (first, second) => first * second,
  '+': (first, second) => first + second,
  '-': (first, second) => first - second,
};

// Reducer
export function calculatorReducer(state: CalculatorState, action: Action): CalculatorState {
  
  switch (action.type) {
    case 'clear':
      return initialState;

    case 'add_digit': {
      const digit = action.payload;
      const newState = { ...state, errorMessage: null };

      if (newState.isResult) {
        // Inicia um novo cálculo a partir do resultado anterior
        return {
          ...initialState,
          displayValue: digit,
          expression: digit,
          firstOperand: parseFloat(digit),
        };
      }

      if (newState.waitingForSecondOperand) {
        return {
          ...newState,
          displayValue: digit,
          expression: newState.expression + digit,
          waitingForSecondOperand: false,
        };
      }

      return {
        ...newState,
        displayValue: newState.displayValue === '0' && digit !== '.' ? digit : newState.displayValue + digit,
        expression: newState.expression + digit,
      };
    }

    case 'set_operator': {
      const nextOperator = action.payload;
      const inputValue = parseFloat(state.displayValue);
      const newState = { ...state, errorMessage: null, isResult: false };

      if (newState.isResult) {
        // Encadeia uma operação a partir do resultado
        return {
          ...newState,
          operator: nextOperator,
          firstOperand: inputValue,
          expression: `${inputValue}${nextOperator}`,
          waitingForSecondOperand: true,
        };
      }
      
      if (newState.waitingForSecondOperand) {
        // Permite trocar o operador (ex: 5 + -> 5 *)
        return {
          ...newState,
          operator: nextOperator,
          expression: newState.expression.slice(0, -1) + nextOperator,
        };
      }

      if (newState.firstOperand === null) {
        // Primeiro operador da expressão
        return {
          ...newState,
          firstOperand: inputValue,
          expression: newState.expression + nextOperator,
          operator: nextOperator,
          waitingForSecondOperand: true,
        };
      }
      
      if (newState.operator) {
        // Realiza cálculo encadeado (ex: 5 + 3 *)
        const result = performCalculation[newState.operator](newState.firstOperand, inputValue);
        const formattedResult = parseFloat(result.toPrecision(15)); // Garante precisão
        return {
          ...newState,
          displayValue: String(formattedResult),
          firstOperand: formattedResult,
          expression: `${formattedResult}${nextOperator}`,
          operator: nextOperator,
          waitingForSecondOperand: true,
        };
      }

      return state;
    }

    case 'calculate': {
      if (!state.operator || state.firstOperand === null) {
        return { ...state, errorMessage: "Operação inválida!" };
      }

      const secondOperand = parseFloat(state.displayValue);
      if (state.operator === '/' && secondOperand === 0) {
        return { ...state, errorMessage: "Divisão por zero!" };
      }

      const result = performCalculation[state.operator](state.firstOperand, secondOperand);
      const formattedResult = parseFloat(result.toPrecision(15)); // Garante precisão

      return {
        ...state,
        displayValue: String(formattedResult),
        expression: `${state.expression} = ${String(formattedResult)}`,
        firstOperand: formattedResult,
        operator: null,
        waitingForSecondOperand: true,
        isResult: true,
      };
    }

    case 'change_sign': {
      const newValue = parseFloat(state.displayValue) * -1;
      return {
        ...state,
        displayValue: String(newValue),
        expression: state.isResult ? state.expression : String(newValue),
        errorMessage: null,
      };
    }

    case 'percentage': {
      const newValue = parseFloat(state.displayValue) / 100;
      return {
        ...state,
        displayValue: String(newValue),
        expression: state.isResult ? state.expression : String(newValue),
        errorMessage: null,
      };
    }
    
    case 'set_error': {
        return { ...state, errorMessage: action.payload };
    }

    default:
      return state;
  }
}