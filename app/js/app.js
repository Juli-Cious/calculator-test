// Core Calculator State Machine & Advanced Arithmetic Engine

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
    let isErrorState = false;

    function updateDisplay() {
        if (displayScreen) {
            displayScreen.textContent = currentInput;
        }
    }

    // Initialize display
    updateDisplay();

    // Helper for float precision (up to 10 decimal places, removing noise)
    function formatResult(num) {
        if (typeof num === 'string') return num;
        if (isNaN(num) || !isFinite(num)) return 'Error';
        // Round to 10 decimal places to eliminate floating point artifacts like 0.30000000000000004
        return String(Number(Number(num).toFixed(10)));
    }

    // Numeric buttons (0-9, and decimal point if present)
    numBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.getAttribute('data-value') || btn.textContent.trim();
            
            // Graceful error recovery: clicking any digit after an Error resets the error state
            if (isErrorState) {
                currentInput = '0';
                isErrorState = false;
            }

            if (shouldResetScreen) {
                currentInput = value === '.' ? '0.' : value;
                shouldResetScreen = false;
            } else {
                if (value === '.' && currentInput.includes('.')) return;
                if (currentInput === '0' && value !== '.') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
            }
            updateDisplay();
        });
    });

    // Operation buttons (+, -, *, /, ^, %, sqrt)
    opBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const op = btn.getAttribute('data-value') || btn.textContent.trim();

            if (isErrorState) return;

            // Handle unary operations immediately (like sqrt)
            if (op === 'sqrt' || op === '√') {
                let curr = parseFloat(currentInput);
                if (curr < 0) {
                    currentInput = 'Error: Invalid Input';
                    isErrorState = true;
                    previousOperand = null;
                    currentOperator = null;
                    shouldResetScreen = true;
                    updateDisplay();
                    return;
                }
                let result = Math.sqrt(curr);
                currentInput = formatResult(result);
                shouldResetScreen = true;
                updateDisplay();
                return;
            }

            if (currentOperator !== null && !shouldResetScreen) {
                calculate();
                if (isErrorState) return;
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
                    currentInput = 'Error: Division by Zero';
                    isErrorState = true;
                    previousOperand = null;
                    currentOperator = null;
                    shouldResetScreen = true;
                    updateDisplay();
                    return;
                } else {
                    result = prev / curr;
                }
                break;
            case '^':
                result = Math.pow(prev, curr);
                break;
            case '%':
                if (curr === 0) {
                    currentInput = 'Error: Division by Zero';
                    isErrorState = true;
                    previousOperand = null;
                    currentOperator = null;
                    shouldResetScreen = true;
                    updateDisplay();
                    return;
                } else {
                    result = prev % curr;
                }
                break;
            default:
                return;
        }

        currentInput = formatResult(result);
        previousOperand = null;
        currentOperator = null;
        shouldResetScreen = true;
        updateDisplay();
    }

    // Equals button
    if (equalsBtn) {
        equalsBtn.addEventListener('click', () => {
            if (isErrorState) return;
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
            isErrorState = false;
            updateDisplay();
        });
    }
});
