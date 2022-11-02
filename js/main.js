
const slider = document.getElementById("slider-value");
const pwdLength = document.getElementById("pwd-length");
const levelBars = document.querySelectorAll(".lvl-bar");
const allInputs = document.querySelectorAll("input");
const generateButton = document.getElementById("generate");
const projectColors = ["#24232B", "#FCA18D", "#FAB647", "#E6E583", "#95FA99"];

slider.addEventListener("input", () => {

    const min = slider.min;
    const max = slider.max;
    const val = slider.value;

    slider.style.backgroundSize = (val - min) * 100 / (max - min) + "% 100%";
    pwdLength.innerText = val;
});


levelBars.forEach(checkbox => {
    checkbox.addEventListener("click", () => {
        console.log("click")
    })
});

generateButton.addEventListener("click", () => {
    let selectedBoxes = 0, color = "", level = 0;
    allInputs.forEach(checkbox => {
        if (checkbox.checked) {
            selectedBoxes += 1;
        }
    })





    // incorrect part just to make things color
    // need to check genereated password instead;
    level = selectedBoxes;
    if (parseInt(pwdLength.innerText) >= 14) {
        level += 1
    }

    color = projectColors[level];
    console.log(projectColors[level]);





    levelBars.forEach(bar => {
        if (level > 0) {
            bar.style.backgroundColor = color;
            bar.style.borderColor = color;
            level -= 1;
        }
        else {
            bar.style.backgroundColor = projectColors[0];
            bar.style.borderColor = "#CCCBD2";
        }
            
        
    })

})