function add(num1, num2) {
  return num1 + num2;
};

function subtract(num1, num2) {
  return num1 - num2;
};

function multiply(num1, num2) {
  return num1 * num2;
};

function divide(num1, num2) {
  return num1 / num2;
};





let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;

let previousOperator = null; 
let previousSecondOperand = null;

const MAX_DIGITS = 12; 

function formatNumber(numString) {
  if (numString === null || numString === undefined || numString === "NaN") return numString;
  
  let str = numString.toString();
  
  
  if (str.includes('e')) return str; 

  
  let parts = str.split('.');
  let integerPart = parts[0];
  let decimalPart = parts[1];

  
  let formattedInteger = "";
  if (integerPart !== "") {
     
     formattedInteger = Number(integerPart).toLocaleString("en-US");
  }

  
  if (decimalPart !== undefined) {
    return `${formattedInteger}.${decimalPart}`;
  } else {
    return formattedInteger;
  }
}

function operate(num1, num2, operator) {
  switch (operator) {
    case '+': return add(num1, num2);
    case '-': return subtract(num1, num2);
    case '*': return multiply(num1, num2);
    case '/': return divide(num1, num2);

  }
}

const display = document.querySelector("#display");


function operandInput(buttonId) {
  let digitPressed;
  switch (buttonId) {
    case "zero":
      digitPressed = "0";
      break;
    case "one":
      digitPressed = "1";
      break;
    case "two":
      digitPressed = "2";
      break;
    case "three":
      digitPressed = "3";
      break;
    case "four":
      digitPressed = "4";
      break;
    case "five":
      digitPressed = "5";
      break;
    case "six":
      digitPressed = "6";
      break;
    case "seven":
      digitPressed = "7";
      break;
    case "eight":
      digitPressed = "8";
      break;
    case "nine":
      digitPressed = "9"
      break;

  }


  if (result !== null && !operator) {
    firstOperand = null;
    result = null;
  }

 
  let currentOperand = !operator ? firstOperand : secondOperand;
  
  if (currentOperand !== null) {
      let rawDigitCount = currentOperand.replace(/\./g, '').length;
      if (rawDigitCount >= MAX_DIGITS) return; 
  }

  if (!operator) {
    if (!firstOperand) firstOperand = digitPressed;
    else firstOperand += digitPressed;
    display.textContent = formatNumber(firstOperand);
  } else {
    if (!secondOperand) secondOperand = digitPressed;
    else secondOperand += digitPressed;
    display.textContent = formatNumber(secondOperand);
  }
}


const digitContainer = document.querySelector(".numButtons");
const digits = digitContainer.querySelectorAll(".digit")

digits.forEach((digit) => {
  digit.addEventListener("click", (e) =>
    operandInput(e.target.id)
  );

});



function operatorInput(buttonId) {
  let operatorPressed;
  switch (buttonId) {
    case "add":
      operatorPressed = "+";
      break;
    case "subtract":
      operatorPressed = "-";
      break;
    case "multiply":
      operatorPressed = "*";
      break;
    case "divide":
      operatorPressed = "/";
      break;
  }


  if (!secondOperand)
    operator = operatorPressed;

  else {
    if (secondOperand === "0" && operator === "/")
      display.textContent = NaN;

    else {

      display.textContent = firstOperand = result = operate(Number(firstOperand), Number(secondOperand), operator);

      secondOperand = null
      operator = operatorPressed;
    }
  }
}


const operatorContainer = document.querySelector(".otherButtons");
const operators = operatorContainer.querySelectorAll(".operator")

operators.forEach((operator) => {
  operator.addEventListener("click", (e) =>
    operatorInput(e.target.id)
  );

});




const equalButton = document.querySelector("#equalTo");
equalButton.addEventListener("click", () => {

 if (!operator && previousOperator) {
    operator = previousOperator;
    secondOperand = previousSecondOperand;
  }


  if (!firstOperand && operator && secondOperand) {
    firstOperand = "0";
  } else if (!firstOperand || !operator) {
    return;
  } else if (!secondOperand) {
    secondOperand = firstOperand;
  }


  if (secondOperand === "0" && operator === "/") {
    display.textContent = NaN;
  } else {
    previousOperator = operator;
    previousSecondOperand = secondOperand;
   
    let rawResult = operate(Number(firstOperand), Number(secondOperand), operator);
    
    
    if (Math.abs(rawResult) > 99999999999) {
       
       result = rawResult.toExponential(6); 
    } else {
       
       result = Number(rawResult.toPrecision(MAX_DIGITS)).toString(); 
    }
    
    firstOperand = result;
    
    display.textContent = formatNumber(result);
    
    secondOperand = operator = null;
  }

});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  firstOperand = secondOperand = operator = result = null;
  previousOperator = previousSecondOperand = null;
  display.textContent = 0;
});



const decimalButton = document.querySelector("#decimal");

decimalButton.addEventListener("click", () => {
  
  if (result !== null && !operator) {
    firstOperand = "0.";
    result = null;
    display.textContent = firstOperand;
    return;
  }

  
  if (!operator) {
    if (!firstOperand) {
      firstOperand = "0.";
    } else if (!firstOperand.includes(".")) {
      firstOperand += ".";
    }
    display.textContent = formatNumber(firstOperand);
  } 
  
  else {
    if (!secondOperand) {
      secondOperand = "0.";
    } else if (!secondOperand.includes(".")) {
      secondOperand += ".";
    }
    display.textContent = formatNumber(secondOperand);
  }
});



const backspaceButton = document.querySelector("#backSpace");

backspaceButton.addEventListener("click", () => {
  
  if (result !== null && !operator) return;

  
  if (!operator) {
    if (firstOperand) {
      firstOperand = firstOperand.toString().slice(0, -1);
      if (firstOperand === "" || firstOperand === "-") firstOperand = null;
      
      display.textContent = firstOperand ? formatNumber(firstOperand) : "0";
    }
  } 
  
  else {
    if (secondOperand) {
      secondOperand = secondOperand.toString().slice(0, -1);
      if (secondOperand === "" || secondOperand === "-") secondOperand = null;
      
     
      display.textContent = secondOperand ? formatNumber(secondOperand) : formatNumber(firstOperand);
    }
  }
});



window.addEventListener('keydown', (e) => {
   
    if (e.key === '/' || e.key === 'Enter') {
        e.preventDefault();
    }

    
    const keyMap = {
        '0': '#zero',
        '1': '#one',
        '2': '#two',
        '3': '#three',
        '4': '#four',
        '5': '#five',
        '6': '#six',
        '7': '#seven',
        '8': '#eight',
        '9': '#nine',
        '.': '#decimal',
        'Backspace': '#backSpace',
        'Escape': '#clear', 
        '+': '#add',
        '-': '#subtract',
        '*': '#multiply',
        '/': '#divide',
        'Enter': '#equalTo',
        '=': '#equalTo'
    };

   
    const buttonId = keyMap[e.key];
    
   
    if (buttonId) {
        const button = document.querySelector(buttonId);
        if (button) {
            button.click();
        }
    }
});




