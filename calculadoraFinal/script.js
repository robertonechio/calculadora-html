const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = "";
let result = 0;
let shoudResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        if(!value){
            if(button.id === "clear") clearDisplay();
            if(button.id === "calculate") calculate();
            return;
        }

        if(["+", "-", "*", "/"].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

function updateDisplay() {
    display.innerText = currentInput || "0";
}

function appendNumber(number) {
   if(currentInput.includes(".") && number === ".") return;
   currentInput += number;
   updateDisplay();
}

function setOperator(op) {
    if(currentInput === "") return;
    operator = op;
    previousInput = currentInput;
    currentInput = "";
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay();
}

function calculate() {
    if(previousInput === "" || currentInput === "") return;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    switch(operator) {
        case "+" : result = num1 + num2; break;
        case "-" : result = num1 - num2; break;
        case "*" : result = num1 * num2; break;
        case "/" : result = num1 / num2; break;
        default: break;
    }
    currentInput = result;
    previousInput = "";
    operator = "";
    updateDisplay();
}