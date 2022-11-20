
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

class GeneratePassword {
    constructor() {
        this.uppercase = uppercase.checked;
        this.lowercase = lowercase.checked;
        this.numbers = numbers.checked;
        this.symbols = symbols.checked;
        this.characters = {
            numbers: [...Array(10).keys()],
            letters: Array.from(Array(26)).map((e, i) => i +65).map((x) => String.fromCharCode(x).toLowerCase()),
            symbols: ["`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", "|", "\", \":", ";", "<", ">", ".", "?", "/"]
        };
        this.characterPool = this.formCharPool();
        this.createdPassword = '';
    }
    formCharPool() {
        let charPoolArr = [];
        if (this.uppercase) {
            this.characters.letters.map(letter => charPoolArr.push(letter.toUpperCase()));
        }
        if (this.lowercase) {
            this.characters.letters.map(letter => charPoolArr.push(letter));
        }
        if (this.numbers) {
            this.characters.numbers.map(number => charPoolArr.push(number));
        }
        if (this.symbols) {
            this.characters.symbols.map(symbol => charPoolArr.push(symbol));
        }
        return charPoolArr;
    }
    createPassword() {
        if (this.characterPool.length > 0) {
            for (let i = 0; i < passwordLength; i++) {
                this.createdPassword += this.formCharPool()[Math.floor(Math.random() * this.formCharPool().length)];
            }
        }

    }
}

class RenderPassword extends GeneratePassword {
    constructor(createdPassword) {
        super(createdPassword);
        this.level = 0;
        this.levelDescription = ["AWFUL", "PITTY", "WEAK", "MEDIUM", "STRONG"];
        this.levelColors = ["", "#FCA18D", "#FAB647", "#E6E583", "#95FA99"];
        this.barColor = "";
    }
    testPassword() {
        let level = 0;
        if (passwordLength < 14) {
            level -= 1;
        }
        if (/[A-Z]/.test(this.createdPassword)) {
            level += 1;
        }
        if (/[a-z]/.test(this.createdPassword)) {
            level += 1;
        }
        if (/\d/.test(this.createdPassword)) {
            level += 1;
        }
        if (/\W/.test(this.createdPassword)) {
            level += 1;
        }
        return level;
    }
    render() {
        console.log(this.level)
        pwdStrength.innerHTML = this.levelDescription[this.level];
        levelBars.forEach(bar => {
            if (this.level > 0) {
                bar.style.backgroundColor = this.barColor;
                bar.style.borderColor = this.barColor;
                this.level -= 1;
            }
            else {
                bar.style.backgroundColor = "#24232B";
                bar.style.borderColor = "#CCCBD2";
            }
        })
        displayScreen.innerText = this.createdPassword;
    }
    generate() {
        this.createPassword();
        this.level = this.testPassword();
        this.barColor = this.levelColors[this.level];
        this.render();
    }
}

generateButton.addEventListener("click", () => {
    let run = false;
    allInputs.forEach(checkbox => {
        if (checkbox.checked) {
           run = true;
        }
    })
    if (run) {
        const newPassword = new RenderPassword();
        newPassword.generate();
    }
    run = false;
});



// copy to clipboard
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
    console.log(iterator)
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





