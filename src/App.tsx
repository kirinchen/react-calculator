
import React, { useState } from 'react';
import Display from './components/Display';
import Button, { ButtonType } from './components/Button';

const App: React.FC = () => {
    const [displayValue, setDisplayValue] = useState<string>('0');
    const [firstOperand, setFirstOperand] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

    const inputDigit = (digit: string) => {
        if (waitingForSecondOperand) {
            setDisplayValue(digit);
            setWaitingForSecondOperand(false);
        } else {
            setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
        }
    };

    const inputDecimal = () => {
        if (waitingForSecondOperand) {
            setDisplayValue('0.');
            setWaitingForSecondOperand(false);
            return;
        }
        if (!displayValue.includes('.')) {
            setDisplayValue(displayValue + '.');
        }
    };

    const clearInput = () => {
        setDisplayValue('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    const toggleSign = () => {
        setDisplayValue(
            displayValue.startsWith('-')
                ? displayValue.substring(1)
                : '-' + displayValue
        );
    };



    const inputPercent = () => {
        const currentValue = parseFloat(displayValue);
        if (currentValue === 0) return;
        setDisplayValue(String(currentValue / 100));
    };

    const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(displayValue);

        if (firstOperand === null) {
            setFirstOperand(inputValue);
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            setDisplayValue(String(Number(result.toPrecision(15))));
            setFirstOperand(result);
        }

        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (first: number, second: number, op: string): number => {
        switch (op) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    };

    const handleEquals = () => {
        const inputValue = parseFloat(displayValue);
        if (operator && firstOperand !== null) {
            const result = calculate(firstOperand, inputValue, operator);
            setDisplayValue(String(Number(result.toPrecision(15))));
            setFirstOperand(null);
            setOperator(null);
            setWaitingForSecondOperand(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
            <div className="w-full max-w-xs sm:max-w-sm">
                <div className="bg-black rounded-3xl shadow-lg p-4 sm:p-6 space-y-4">
                    <Display value={displayValue} />
                    <div className="grid grid-cols-4 gap-3 sm:gap-4">
                        <Button label={displayValue !== '0' ? "C" : "AC"} type={ButtonType.Function} onClick={clearInput} />
                        <Button label="+/-" type={ButtonType.Function} onClick={toggleSign} />
                        <Button label="%" type={ButtonType.Function} onClick={inputPercent} />
                        <Button label="÷" type={ButtonType.Operator} onClick={() => performOperation('/')} isActive={operator === '/'} />

                        <Button label="7" type={ButtonType.Number} onClick={() => inputDigit('7')} />
                        <Button label="8" type={ButtonType.Number} onClick={() => inputDigit('8')} />
                        <Button label="9" type={ButtonType.Number} onClick={() => inputDigit('9')} />
                        <Button label="×" type={ButtonType.Operator} onClick={() => performOperation('*')} isActive={operator === '*'} />

                        <Button label="4" type={ButtonType.Number} onClick={() => inputDigit('4')} />
                        <Button label="5" type={ButtonType.Number} onClick={() => inputDigit('5')} />
                        <Button label="6" type={ButtonType.Number} onClick={() => inputDigit('6')} />
                        <Button label="-" type={ButtonType.Operator} onClick={() => performOperation('-')} isActive={operator === '-'} />

                        <Button label="1" type={ButtonType.Number} onClick={() => inputDigit('1')} />
                        <Button label="2" type={ButtonType.Number} onClick={() => inputDigit('2')} />
                        <Button label="3" type={ButtonType.Number} onClick={() => inputDigit('3')} />
                        <Button label="+" type={ButtonType.Operator} onClick={() => performOperation('+')} isActive={operator === '+'} />
                        
                        <Button label="0" type={ButtonType.Number} onClick={() => inputDigit('0')} wide />
                        <Button label="." type={ButtonType.Number} onClick={inputDecimal} />
                        <Button label="=" type={ButtonType.Operator} onClick={handleEquals} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
