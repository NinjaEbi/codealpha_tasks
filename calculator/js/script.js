let display = document.getElementById('display');
let historyList = document.getElementById('historyList');

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function del() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression);
    display.value = result;

    addToHistory(`${expression} = ${result}`);
  } catch {
    display.value = 'Error';
  }
}

function addToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.appendChild(li);
}

function clearHistory() {
  historyList.innerHTML = '';
}
