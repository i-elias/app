"use strict";

const btn = document.querySelector(".password-generator-btn");
const sliders = document.querySelectorAll(".toggle");
let toggledArr = [];

const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

function randomIndex(length) {
  return Math.floor(Math.random() * length);
}

function randomCharacters(char) {
  let randomCharArr = [];
  for (let i = 0; i < 15; i++) {
    randomCharArr.push(char[randomIndex(char.length)]);
  }
  return randomCharArr;
}

function generateCharacters(arr) {
  const alphabets = characters.slice(0, 52);
  const numericals = characters.slice(52, 62);
  const nonAlphaNumericals = characters.slice(62);
  const allCharacterTypes = [alphabets, numericals, nonAlphaNumericals];
  let charArr;
  let numbersVal;
  let alphabetsVal;
  let symbolsVal;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].getAttribute("value") === "numbers") {
      numbersVal = arr[i];
      console.log(numbersVal);
    } else if (arr[i].getAttribute("value") === "alphabets") {
      alphabetsVal = arr[i];
    } else if (arr[i].getAttribute("value") === "symbols") {
      symbolsVal = arr[i];
    }

    if (
      arr.includes(alphabetsVal) &&
      arr.includes(numbersVal) &&
      arr.includes(symbolsVal)
    ) {
      charArr = alphabets.concat(numericals, nonAlphaNumericals);
    } else if (arr.includes(alphabetsVal) && arr.includes(numbersVal)) {
      charArr = alphabets.concat(numericals);
    } else if (arr.includes(alphabetsVal) && arr.includes(symbolsVal)) {
      charArr = alphabets.concat(nonAlphaNumericals);
    } else if (arr.includes(numbersVal) && arr.includes(symbolsVal)) {
      charArr = numericals.concat(nonAlphaNumericals);
    } else if (arr.includes(alphabetsVal)) {
      charArr = alphabets;
    } else if (arr.includes(numbersVal)) {
      charArr = numericals;
    } else if (arr.includes(symbolsVal)) {
      charArr = nonAlphaNumericals;
    }
  }
  return charArr;
}

/* switch - change the text from 'off' to 'on' and vice versa

   btn    - active: add the class name (btn-active)
          - disabled: assign (disabled) attribute and return background color to its original state

   array  - checked: push the slider that triggered the event to the array
          - unchecked: remove the slider the triggered the event from the array   
*/
for (let i = 0; i < sliders.length; i++) {
  sliders[i].addEventListener("change", function (e) {
    const switchState = document.querySelectorAll(".switch-state");
    const currentSlider = e.target;
    if (currentSlider.checked) {
      switchState[i].textContent = "on";
      btn.removeAttribute("disabled");
      btn.classList.add("btn-active");
      toggledArr.push(currentSlider);
    } else {
      switchState[i].textContent = "off";
      const index = toggledArr.indexOf(currentSlider);
      toggledArr.splice(index, 1);
    }
    if (toggledArr.length === 0) {
      btn.disabled = true;
      btn.classList.remove("btn-active");
    }
  });
}

// btn - onclick - generate characters and display randomise characters on both password fields
btn.addEventListener("click", function () {
  const passFieldLeft = document.getElementById("pass-field-left");
  const passFieldRight = document.getElementById("pass-field-right");
  const getChars = generateCharacters(toggledArr);
  const displayChars1 = randomCharacters(getChars);
  const displayChars2 = randomCharacters(getChars);

  passFieldLeft.placeholder = "";
  passFieldRight.placeholder = "";
  passFieldLeft.value = displayChars1.join("");
  passFieldRight.value = displayChars2.join("");
});
