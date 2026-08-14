// Core Calculator State Machine & Basic Arithmetic Engine

document.addEventListener('DOMContentLoaded', () => {
    const displayScreen = document.getElementById('display-screen');
    const clearBtn = document.getElementById('clear-btn');
    const equalsBtn = document.getElementById('equals-btn');
    const numBtns = document.querySelectorAll('.num-btn');
    const opBtns = document.querySelectorAll('.op-btn');

    let currentInput = '0';
    let previousOperand = null;
    let currentOperator = null;
    let shouldResetScreen = false;

    function updateDisplay() {
        if (displayScreen) {
            displayScreen.textContent = currentInput;
        }
    }

    // Initialize display
    updateDisplay();

    // Numeric buttons (0-9)
    numBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.getAttribute('data-value') || btn.textContent.trim();
            if (shouldResetScreen) {
                currentInput = value;
                shouldResetScreen = false;
            } else {
                if (currentInput === '0') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
            }
            updateDisplay();
        });
    });

    // Basic operation buttons (+, -, *, /)
    opBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const op = btn.getAttribute('data-value') || btn.textContent.trim();
            if (currentOperator !== null && !shouldResetScreen) {
                calculate();
            }
            previousOperand = currentInput;
            currentOperator = op;
            shouldResetScreen = true;
        });
    });

    function calculate() {
        if (currentOperator === null || previousOperand === null) return;

        let prev = parseFloat(previousOperand);
        let curr = parseFloat(currentInput);
        let result = 0;

        switch (currentOperator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
            case '×':
                result = prev * curr;
                break;
            case '/':
            case '÷':
                if (curr === 0) {
                    result = 'Error';
                } else {
                    result = prev / curr;
                }
                break;
            default:
                return;
        }

        currentInput = String(result);
        previousOperand = null;
        currentOperator = null;
        shouldResetScreen = true;
        updateDisplay();
    }

    // Equals button
    if (equalsBtn) {
        equalsBtn.addEventListener('click', () => {
            if (currentOperator === null || previousOperand === null) return;
            calculate();
        });
    }

    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            currentInput = '0';
            previousOperand = null;
            currentOperator = null;
            shouldResetScreen = false;
            updateDisplay();
        });
    }
});
