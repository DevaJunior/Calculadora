export interface CalculatorState {
  displayValue: string;
  expression: string;
  operator: string | null;
  firstOperand: number | null;
  waitingForSecondOperand: boolean;
  isResult: boolean;
  errorMessage: string | null;
}

export type Action =
  | { type: 'clear' }
  | { type: 'change_sign' }
  | { type: 'percentage' }
  | { type: 'add_digit'; payload: string }
  | { type: 'set_operator'; payload: string }
  | { type: 'calculate' }
  | { type: 'set_error', payload: string };