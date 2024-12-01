// Basic math operations
const add = (a, b) => parseFloat(a) + parseFloat(b);
const subtract = (a, b) => parseFloat(a) - parseFloat(b);
const multiply = (a, b) => parseFloat(a) * parseFloat(b);
const divide = (a, b) => (b === "0" ? "NOPE" : parseFloat(a) / parseFloat(b));

const operators = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

// Calculator state
let a = undefined;
let b = undefined;
let operator = undefined;
let result = undefined;

const operate = (a, b, operator) => operator(a, b);

// DOM elements
const elements = {
  numberButtons: document.querySelectorAll(".number"),
  equalsButton: document.querySelector("#equals"),
  clearButton: document.querySelector(".clear"),
  clearAllButton: document.querySelector(".clear-all"),
  commaButton: document.querySelector(".comma"),
  display: document.querySelector(".result-display"),
  calculationDisplay: document.querySelector(".calculation-display"),
  operatorButtons: document.querySelectorAll(".operator"),
};

// Update displays
const updateDisplay = (content) => {
  elements.display.textContent = content;
};

const updateCalculationDisplay = (content) => {
  elements.calculationDisplay.textContent = content;
};

// Handle number input
elements.numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateDisplay(elements.display.textContent + button.textContent);
  });
});

// Handle operator input
elements.operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const displayContent = elements.display.textContent;

    // First number input
    if (a === undefined || (operator === undefined && displayContent !== "")) {
      a = displayContent || a;
      operator = operators[button.textContent];
      updateCalculationDisplay(`${a} ${button.textContent}`);
      updateDisplay("");
      return;
    }

    // Second number input
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

// Handle equals
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

// Handle clear and clear all
elements.clearButton.addEventListener("click", () => {
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
