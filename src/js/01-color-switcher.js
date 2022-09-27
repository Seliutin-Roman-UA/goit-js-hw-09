const btn = document.querySelectorAll('button');
let timerId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function handleButtonClic(e) {
  switch (true) {
    case e.target.hasAttribute('data-start'):
      e.target.setAttribute('disabled', 'disabled');
      timerId = setInterval(
        () => {
          document.body.style.backgroundColor = getRandomHexColor();
        },
        1000);
      break;
    case e.target.hasAttribute('data-stop'):
      clearInterval(timerId);
      e.target.previousElementSibling.removeAttribute('disabled');
      break;
  }
}

[...btn].forEach(item => item.addEventListener('click', handleButtonClic));
