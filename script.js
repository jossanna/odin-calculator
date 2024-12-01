function add(a, b) {
  return Number((parseFloat(a) + parseFloat(b)).toFixed(5));
}
function subtract(a, b) {
  return Number((parseFloat(a) - parseFloat(b)).toFixed(5));
}
function multiply(a, b) {
  return Number((parseFloat(a) * parseFloat(b)).toFixed(5));
}
function divide(a, b) {
  return b === "0"
    ? "NOPE"
    : Number((parseFloat(a) / parseFloat(b)).toFixed(5));
}

const operators = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

let a = undefined;
let b = undefined;
let operator = undefined;
let result = undefined;

const operate = (a, b, operator) => operator(a, b);

const elements = {
  numberButtons: document.querySelectorAll(".number"),
  equalsButton: document.querySelector("#equals"),
  clearAllButton: document.querySelector(".clear-all"),
  negativeButton: document.querySelector(".negative"),
  commaButton: document.querySelector(".comma"),
  display: document.querySelector(".result-display"),
  calculationDisplay: document.querySelector(".calculation-display"),
  operatorButtons: document.querySelectorAll(".operator"),
  backspaceButton: document.querySelector(".backspace"),
};

console.log(elements.operatorButtons);

const updateDisplay = (content) => {
  elements.display.textContent = content;
};

const updateCalculationDisplay = (content) => {
  elements.calculationDisplay.textContent = content;
};

const keyboardMap = {
  Enter: () => elements.equalsButton.click(),
  Backspace: () => elements.backspaceButton.click(),
  Escape: () => elements.clearAllButton.click(),
  "+": () => elements.operatorButtons[3].click(),
  "-": () => elements.operatorButtons[2].click(),
  "*": () => elements.operatorButtons[1].click(),
  "/": () => elements.operatorButtons[0].click(),
  ".": () => elements.commaButton.click(),
};

for (let i = 0; i <= 9; i++) {
  keyboardMap[i.toString()] = () => {
    const numberButton = Array.from(elements.numberButtons).find(
      (button) => button.textContent === i.toString()
    );
    if (numberButton) numberButton.click();
  };
}

document.addEventListener("keydown", (event) => {
  const handler = keyboardMap[event.key];
  if (handler) handler();
});

elements.numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      button.classList.contains("comma") &&
      elements.display.textContent.includes(".")
    ) {
      return;
    }

    updateDisplay(elements.display.textContent + button.textContent);
  });
});

elements.operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const displayContent = elements.display.textContent;

    if (a === undefined || (operator === undefined && displayContent !== "")) {
      a = displayContent || a;
      operator = operators[button.textContent];
      updateCalculationDisplay(`${a} ${button.textContent}`);
      updateDisplay("");
      return;
    }

    if (displayContent === "") {
      operator = operators[button.textContent];
      updateCalculationDisplay(`${a} ${button.textContent}`);
      return;
    }

    if (b === undefined && displayContent !== "") {
      b = displayContent;
      result = operate(a, b, operator);
      updateCalculationDisplay(
        `${elements.calculationDisplay.textContent} ${b} ${button.textContent}`
      );
      updateDisplay("");
      a = result;
      b = undefined;
      operator = operators[button.textContent];
      return;
    }

    if (button.id === "equals") return;

    operator = operators[button.textContent];
    updateCalculationDisplay(
      `${elements.calculationDisplay.textContent} ${button.textContent}`
    );
    updateDisplay("");
  });
});

elements.equalsButton.addEventListener("click", () => {
  const displayContent = elements.display.textContent;

  if (b === undefined && displayContent !== "") {
    b = displayContent;
    result = operate(a, b, operator);
    updateCalculationDisplay(`${elements.calculationDisplay.textContent} ${b}`);
  }

  updateDisplay(result);
  a = result;
  b = undefined;
  operator = undefined;
  result = undefined;
});

elements.backspaceButton.addEventListener("click", () => {
  updateDisplay(elements.display.textContent.slice(0, -1));
});

elements.clearAllButton.addEventListener("click", () => {
  updateDisplay("");
  updateCalculationDisplay("");
  a = undefined;
  b = undefined;
  operator = undefined;
  result = undefined;
});

elements.negativeButton.addEventListener("click", () => {
  updateDisplay(elements.display.textContent * -1);
});
