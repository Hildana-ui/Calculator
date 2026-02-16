const add = (a, b) => {
    return a + b;
};

const subtract = (a, b) => {
    return a - b;
};

const multiply = (a, b) => {
    return a * b;
};

const divide = (a, b) => {
    return a / b;
};


function clear() {
    a = "";
    b= "";
    operator = null;

    display.textContent = 0;
}


const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
    clear()
});


let a = "";
let b = "";
let operator = null;
let resetDisplay = false;

const display = document.getElementById("display");

function handleNum(num) {
    if (resetDisplay) {
        a = "";
        resetDisplay = false;
    }

    if (operator === null) {
        a += num;
        display.textContent = a;
    } else {
        b += num;
        display.textContent = b;
    }
}

const numBtns = document.querySelectorAll(".num");

numBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        handleNum(btn.textContent);
    });
});

function handleOperator(op) {
    if (a === "") return;

    if (b != "") {
        const result = operate(
            Number(a),
            operator,
            Number(b)
        );

        a = result.toString();
        display.textContent = result;
        b = "";
    }

    operator = op;
} 

let operators = document.querySelectorAll(".op");

operators.forEach(opBtn => {
    opBtn.addEventListener("click", () => {
        handleOperator(opBtn.textContent);
    })
})


function handleEquals() {
    if (a !== "" && b !== "" && operator !== null) {
        const result = operate(
            Number(a),
            operator,
            Number(b)
        );

        display.textContent = result;

        a = result.toString();
        b = "";
        operator = null;
        resetDisplay = true;
    }
};

const equalsBtn = document.querySelector(".equals");

equalsBtn.addEventListener("click", handleEquals);




function operate(a, operator, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return b === 0 ? "Error" : divide(a, b);
    } else {
        return "ERROR";
    }
};

function handleBackspace() {
    if (operator === null) {
        if (a.length > 1) {
            a = a.slice(0, -1);
        } else {
            a = "";
        }

        display.textContent = a || "0";
    } else {
        if (b.length > 1) {
            b = b.slice(0, -1);
        } else {
            b = "";
        }

        display.textContent = b || "0";
    }
    resetDisplay = false;
};

document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
        handleBackspace();
    }
});


const backspaceBtn = document.querySelector(".backspace");
backspaceBtn.addEventListener("click",  handleBackspace);