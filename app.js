let numberButtons = document.querySelectorAll('.number')
let display = document.querySelector('#display')
let lastOperationDisplay = document.querySelector('#lastOperationDisplay')
let clearDisplay = document.querySelector('#clear')
let operator = document.querySelectorAll('.operator')
let equals = document.querySelector('#equals')
let erase = document.querySelector('#delete')
let decimal = document.querySelector('#decimal')


let currentOperation = null
let firstOperand = ''
let secondOperand = ''

window.addEventListener('keydown', keyboardInput)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operator.forEach((button) =>
  button.addEventListener('click', () => setOperator(button.textContent))
)


function appendNumber(number) {
    if (display.textContent === '0')
      resetScreen()
    display.textContent += number
  } 

equals.addEventListener('click', setEqual)
clearDisplay.addEventListener('click', clear)
erase.addEventListener('click', eraseinput)
decimal.addEventListener('click', point)

function eraseinput(){
    display.textContent = display.textContent
    .toString()
    .slice(0, -1)
}

function clear() {
    lastOperationDisplay.textContent = ''
    display.textContent = '0'
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
  }

function resetScreen() {
  display.textContent = ''
  shouldResetScreen = false
}

function setOperator(button){
    if (currentOperation !== null) setEqual()
    firstOperand = display.textContent
    lastOperationDisplay.textContent = `${firstOperand} ${button}` 
    currentOperation = button
    resetScreen()
}

function setEqual() {
    secondOperand = display.textContent
    if(firstOperand == ''){
        return `0 ${currentOperation}`
    }else{
    lastOperationDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand}` 
    display.textContent = round(operate(currentOperation, firstOperand, secondOperand))
    }
}

function round(number) {
    return Math.round(number * 1000) / 1000
  }


function point() {
  if (display.textContent === '')
    display.textContent = '0'
  if (display.textContent.includes('.')) return
  display.textContent += '.'
}


function add(a, b){
    return a + b
}

function substract(a, b) {
    return a - b
  }

function multiply(a, b){
    return a * b
}

function divide(a, b){
    return a / b
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '-':
        return substract(a, b)
      case 'x':
        return multiply(a, b)
      case '÷':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
    }
  }

  function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return 'x'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '+') return '+'
  }

  function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') point()
    if (e.key === '=' || e.key === 'Enter') setEqual()
    if (e.key === 'Backspace') eraseinput()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperator(convertOperator(e.key))
  }