// Calculation History Log Panel
$(document).ready(function() {
  // Create list element to hold history entries
  var historyList = document.getElementById('history-list');
  // Append each calculation entry to the list
  calculationHistory.forEach(function(entry) {
    var listItem = document.createElement('li');
    listItem.textContent = entry.date + ': ' + entry.result;
    historyList.appendChild(listItem);
  });
  // Add event listener to clear history button
  document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
});
// ... rest of app.js remains the same ...
