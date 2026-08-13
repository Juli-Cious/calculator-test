// Calculation History Log Panel

let calculationHistory = [];

function addHistoryEntry(equation, result) {
    const entry = {
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        equation: equation,
        result: result
    };
    calculationHistory.unshift(entry);
    renderHistory();
}

function clearHistory() {
    calculationHistory = [];
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;
    
    historyList.innerHTML = '';
    
    if (calculationHistory.length === 0) {
        historyList.innerHTML = '<li class="empty-history">No calculation history yet</li>';
        return;
    }

    calculationHistory.forEach(function(entry) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span style="color: #94a3b8;">${entry.equation}</span> <strong style="color: #60a5fa;">= ${entry.result}</strong>`;
        historyList.appendChild(listItem);
    });
}

// Initial rendering on page load
document.addEventListener('DOMContentLoaded', function() {
    renderHistory();
    const clearBtn = document.getElementById('clear-history-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearHistory);
    }
});
