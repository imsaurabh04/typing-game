const typingText = document.getElementById("paragraph");
const input = document.getElementById("input");
const btn = document.querySelector(".btn"); 
const timer = document.querySelector(".timer");
const mistakes = document.querySelector(".mistake");
const wpm = document.querySelector(".wpm");
const cpm = document.querySelector(".cpm");

let screenTimer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let nMistakes = 0;
let isTyping = false;

const loadParagraph = () => {

    const paragraphs = [
        "Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.",

        "When you give joy to other people, you get more joy in return. You should give a good thought to the happiness that you can give out.",

        "It is only when we take chances that our lives improve. The initial and the most difficult risk we need to take is to become honest.",

        "Develop success from failures. Discouragement and failure are two of the surest stepping stones to success.",

        "There are three ways to ultimate success: The first way is to be kind. The second way is to be kind. The third way is to be kind.",

        "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you."
    ]

    let randomInd = Math.floor(Math.random()*paragraphs.length);
    typingText.innerHTML = "";

    for (let ind = 0; ind < paragraphs[randomInd].length; ind++) {
        typingText.innerHTML += `<span>${paragraphs[randomInd][ind]}</span>`;
    }
    typingText.querySelectorAll("span")[0].classList.add("active");
    typingText.addEventListener("click", () => {
        input.focus();
    })
    document.addEventListener("keydown", () => {
        input.focus();
    })
}

const initTimer = () => {
    if(timeLeft > 0) {
        timeLeft--;
        timer.innerText = timeLeft;
        let wpmValue = Math.round(((charIndex - nMistakes)/5) / (maxTime - timeLeft)*60);
        wpm.innerText = wpmValue;
    } else {
        clearInterval(screenTimer);
        input.value = "";
    }   
}

const initTyping = () => {
    let chars = typingText.querySelectorAll("span");
    let typedChar = input.value.charAt(charIndex);

    if(charIndex < chars.length && timeLeft > 0) {

        if(!isTyping) {
            screenTimer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if(typedChar === chars[charIndex].innerText) {
            chars[charIndex].classList.add("correct");
        } else {
            nMistakes++;
            chars[charIndex].classList.add("incorrect");
        }
        
        charIndex++;
        mistakes.innerText = nMistakes;
        cpm.innerText = charIndex - nMistakes;
        if(charIndex === chars.length) {
            clearInterval(screenTimer);
            input.value = "";
        } else {
            chars[charIndex].classList.add("active");
        }
    }
}

const reset = () => {
    loadParagraph();
    clearInterval(screenTimer);
    timeLeft = maxTime;
    charIndex = 0;
    nMistakes = 0;
    isTyping = false;
    timer.innerText = timeLeft;
    mistakes.innerText = nMistakes;
    wpm.innerText = 0;
    cpm.innerText = 0;
    input.value = "";
}

loadParagraph();
input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);
