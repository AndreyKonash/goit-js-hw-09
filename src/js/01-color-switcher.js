function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalId = null;

function startChangingColor() {
  refs.startBtn.disabled = true;
  intervalId = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangingColor() {
  refs.startBtn.disabled = false;
  clearInterval(intervalId);
}

refs.startBtn.addEventListener('click', startChangingColor);
refs.stopBtn.addEventListener('click', stopChangingColor);
