

const slider = document.getElementById("slider-value");
const pwdLength = document.getElementById("pwd-length");



slider.addEventListener("input", () => {

    const min = slider.min;
    const max = slider.max;
    const val = slider.value;

    slider.style.backgroundSize = (val - min) * 100 / (max - min) + "% 100%";
    pwdLength.innerText = val;
})