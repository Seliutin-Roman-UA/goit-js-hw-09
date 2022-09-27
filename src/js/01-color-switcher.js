//const btnStart = document.querySelector("button[data-start]");
//const btnStop = document.querySelector("button[data-stop]");
const btn = document.querySelectorAll("button");
let timerId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor(btnTarget) {
  document.body.style.backgroundColor = getRandomHexColor();
  btnTarget.setAttribute("disabled", "disabled");
}

// btnStart.addEventListener('click', () => {
//     console.log("Hello btnStart");
//     timerId = setInterval(changeColor, 1000);
// })

// btnStop.addEventListener("click", () => {
//   clearInterval(timerId);
//   btnStart.removeAttribute("disabled");
// });

function handleButtonClic(e) {
  switch (true) {
    case e.target.hasAttribute("data-start"):
      timerId = setInterval(changeColor, 1000, e.target);
      break;
    case e.target.hasAttribute("data-stop"):
      clearInterval(timerId);
      e.target.previousElementSibling.removeAttribute("disabled");
      break;
  }
}

[...btn].forEach((item) => item.addEventListener("click", handleButtonClic));
