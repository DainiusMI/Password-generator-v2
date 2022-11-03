
const displayScreen = document.getElementById("screen");

const slider = document.getElementById("slider");
const displayLength = document.getElementById("pwd-length");
let passwordLength = parseInt(displayLength.innerText);

const allInputs = document.querySelectorAll("input");
// checkboxes
const uppercase = document.getElementById("uppercase-id");
const lowercase = document.getElementById("lowercase-id");
const numbers = document.getElementById("numbers-id");
const symbols = document.getElementById("symbols-id");

const levelBars = document.querySelectorAll(".lvl-bar");
const pwdStrength = document.getElementById("level");

const generateButton = document.getElementById("generate");

const clipboard = document.getElementById("clipboard");

clipboard.addEventListener("click", () => {
    if (displayScreen.innerText && displayScreen.innerText !== "none") {
        navigator.clipboard.writeText(displayScreen.innerText);
    }
})


// slider graphics update
slider.addEventListener("input", () => {

    const min = slider.min;
    const max = slider.max;
    const val = slider.value;

    slider.style.backgroundSize = (val - min) * 100 / (max - min) + "% 100%";
    displayLength.innerText = val;
    passwordLength = val;
})


function generate() {
    const numbersArr = [...Array(10).keys()];
    const iterator = Array.from(Array(26)).map((e, i) => i +65);
    const lettersArr = iterator.map((x) => String.fromCharCode(x).toLowerCase());
    const symbolsArr = ["`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", "|", "\", \":", ";", "<", ">", ".", "?", "/"];

    let characterPool = [];

    if (uppercase.checked) {
        characterPool = characterPool.concat(lettersArr.map((l) => l.toUpperCase()));
    }
    if (lowercase.checked) {
        characterPool = characterPool.concat(lettersArr);
    }
    if (numbers.checked) {
        characterPool = characterPool.concat(numbersArr);
    }
    if (symbols.checked) {
        characterPool = characterPool.concat(symbolsArr);
    }
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
        result += characterPool[Math.floor(Math.random() * characterPool.length)];
    }
    return result;
}

function checkLevel() {
    let level = 0;
    let levelArr = ["PITTY", "WEAK", "MEDIUM", "STRONG"]
    if (passwordLength < 14) {
        level -= 1;
    }
    if (/[A-Z]/.test(generate())) {
        level += 1;
    }
    if (/[a-z]/.test(generate())) {
        level += 1;
    }
    if (/\d/.test(generate())) {
        level += 1;
    }
    if (/\W/.test(generate())) {
        level += 1;
    }
    pwdStrength.innerHTML = levelArr[level-1];
    return level
}

function colorBars(level) {
    const projectColors = ["", "#FCA18D", "#FAB647", "#E6E583", "#95FA99"];
    color = projectColors[level];

    levelBars.forEach(bar => {
        if (level > 0) {
            bar.style.backgroundColor = color;
            bar.style.borderColor = color;
            level -= 1;
        }
        else {
            bar.style.backgroundColor = "#24232B";
            bar.style.borderColor = "#CCCBD2";
        }
    })
}


generateButton.addEventListener("click", () => {

    let run = false;
    allInputs.forEach(checkbox => {
        if (checkbox.checked) {
           run = true;
        }
    })
    if (run) {
        displayScreen.innerText = generate();
        colorBars(checkLevel());
    }
    run = false;
});


