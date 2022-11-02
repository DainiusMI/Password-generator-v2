
const slider = document.getElementById("slider-value");
const pwdLength = document.getElementById("pwd-length");

const levelBars = document.querySelectorAll(".lvl-bar");
const allInputs = document.querySelectorAll("input");



// checkboxes DOM
const uppercase = document.getElementById("uppercase-id");
const lowercase = document.getElementById("lowercase-id");
const numbers = document.getElementById("numbers-id");
const symbols = document.getElementById("symbols-id");

const generateButton = document.getElementById("generate");


// slider graphics update
slider.addEventListener("input", () => {

    const min = slider.min;
    const max = slider.max;
    const val = slider.value;

    slider.style.backgroundSize = (val - min) * 100 / (max - min) + "% 100%";
    pwdLength.innerText = val;
});


function generate() {
    const numbersArr = [...Array(10).keys()];
    const iterator = Array.from(Array(26)).map((e, i) => i +65);
    const lettersArr = iterator.map((x) => String.fromCharCode(x).toLowerCase());

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

    console.log(characterPool)
}



const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));




generateButton.addEventListener("click", () => {

    let selectedBoxes = 0, level = 0;

    allInputs.forEach(checkbox => {
        if (checkbox.checked) {
            selectedBoxes += 1;
        }
    })


    generate()


    // incorrect part just to make things color
    // need to check genereated password instead;
    level = selectedBoxes;


    if (parseInt(pwdLength.innerText) >= 14) {
        level += 1
    }



    colorBars(level);
});

function colorBars(num) {

    const projectColors = ["", "#FCA18D", "#FAB647", "#E6E583", "#95FA99"];
    color = projectColors[num];

    levelBars.forEach(bar => {
        if (num > 0) {
            bar.style.backgroundColor = color;
            bar.style.borderColor = color;
            num -= 1;
        }
        else {
            bar.style.backgroundColor = "#24232B";
            bar.style.borderColor = "#CCCBD2";
        }
            
        
    })
};