// Mini Calculator Application Logic

let currentState = {
    display: '0',
    previousExpression: '',
    shouldResetDisplay: false
};

function updateDisplay() {
    const screenElem = document.getElementById('display-screen');
    if (!screenElem) return;
    
    screenElem.innerHTML = `
        <div class="previous-expression">${currentState.previousExpression}</div>
        <div class="current-value">${currentState.display}</div>
    `;
}

function appendNumber(number) {
    if (currentState.display === '0' || currentState.shouldResetDisplay) {
        currentState.display = number;
        currentState.shouldResetDisplay = false;
    } else {
        currentState.display += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (currentState.shouldResetDisplay) {
        currentState.display = '0.';
        currentState.shouldResetDisplay = false;
    } else if (!currentState.display.includes('.')) {
        currentState.display += '.';
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentState.shouldResetDisplay) {
        currentState.shouldResetDisplay = false;
    }
    
    const lastChar = currentState.display.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentState.display = currentState.display.slice(0, -1) + operator;
    } else {
        currentState.display += operator;
    }
    updateDisplay();
}

function clearDisplay() {
    currentState.display = '0';
    currentState.previousExpression = '';
    currentState.shouldResetDisplay = false;
    updateDisplay();
}

function deleteLastChar() {
    if (currentState.shouldResetDisplay) {
        clearDisplay();
        return;
    }
    
    if (currentState.display.length > 1) {
        currentState.display = currentState.display.slice(0, -1);
    } else {
        currentState.display = '0';
    }
    updateDisplay();
}

function calculateResult() {
    if (currentState.shouldResetDisplay) return;

    let expression = currentState.display;
    
    // Check division by zero pattern (e.g. /0 or /0.0)
    if (/\/0(\.0*)?($|[^\d.])/.test(expression)) {
        currentState.previousExpression = expression + ' =';
        currentState.display = 'Error: Div by 0';
        currentState.shouldResetDisplay = true;
        updateDisplay();
        return;
    }

    try {
        // Sanitize string to allow only numbers and basic operators
        const sanitizedExpr = expression.replace(/[^0-9+\-*/.]/g, '');
        if (!sanitizedExpr) return;

        const resultValue = Function(`'use strict'; return (${sanitizedExpr})`)();
        
        let formattedResult = Number.isInteger(resultValue) ? resultValue.toString() : parseFloat(resultValue.toFixed(8)).toString();

        currentState.previousExpression = expression + ' =';
        currentState.display = formattedResult;
        currentState.shouldResetDisplay = true;
        updateDisplay();

        // Add to history log if available
        if (typeof addHistoryEntry === 'function') {
            addHistoryEntry(expression, formattedResult);
        }
    } catch (e) {
        currentState.previousExpression = expression + ' =';
        currentState.display = 'Error';
        currentState.shouldResetDisplay = true;
        updateDisplay();
    }
}

// Keyboard input support
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLastChar();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
});

// Initialize display when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});
