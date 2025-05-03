const screen = document.querySelector('.screen');
const numbersContainer = document.querySelector('.numbers');
const operatorsContainer = document.querySelector('.operators');

function createNumberButtons() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '='];
    numbers.forEach(number => {
        const button = document.createElement('button');
        button.textContent = number;
        button.classList.add('number');
        button.addEventListener('click', () => appendToScreen(number));
        numbersContainer.appendChild(button);
    });
}
createNumberButtons();

function appendToScreen(value) {
    const operators = ['+', '-', 'x', '/', 'C','.'];

    if (value === 'C') {
        screen.textContent = '';
    } else if (value === '=') {
        try {
            const expression = screen.textContent.replace(/x/g, '*');
            screen.textContent = eval(expression);
        } catch (error) {
            screen.textContent = 'Error';
        }
    } else {
        const lastChar = screen.textContent.slice(-1);

        // Prevent multiple operators in a row
        if (operators.includes(lastChar) && operators.includes(value) && value !== '.') {
            return;
        }

        // Prevent multiple decimals in the same number
        if (value === '.') {
            // Get the current number being typed (after last operator)
            const parts = screen.textContent.split(/[\+\-x\/]/);
            const currentNumber = parts[parts.length - 1];
            if (currentNumber.includes('.')) {
                return; // Already has a decimal
            }
        }

        screen.textContent += value;
    }
}


function createOperatorButtons() {
    const operators = ['+', '-', 'x', '/', 'C'];
    operators.forEach(operator => {
        const button = document.createElement('button');
        button.textContent = operator;
        button.classList.add('operator');
        button.addEventListener('click', () => appendToScreen(operator));
        operatorsContainer.appendChild(button);
    });
}
createOperatorButtons();