import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btn = document.querySelector('[data-start]');
const inputData = document.querySelector('#datetime-picker');
let choseData;
let timerId;
btn.setAttribute('disabled', 'disabled');

const calendars = flatpickr(inputData, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choseData = selectedDates[0];
    if (choseData <= new Date()) {
      Notify.failure(`❌ Please choose a date in the future`);
      btn.setAttribute('disabled', 'disabled');
    }
    if (choseData > new Date()) {
      btn.removeAttribute('disabled');
      changeCounter(choseData);
    }
  },
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setTextContent(partOfData) {
  document.querySelector('[data-days]').textContent = partOfData.days
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-hours]').textContent = partOfData.hours
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-minutes]').textContent = partOfData.minutes
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = partOfData.seconds
    .toString()
    .padStart(2, '0');
}

function changeCounter() {
  const dataNow = new Date();
  let distinctionInData = choseData.getTime() - dataNow.getTime();

  if (distinctionInData <= 0) {
    stopTimer();
    return;
  }
  let partOfData = convertMs(distinctionInData);
  setTextContent(partOfData);
}
function stopTimer() {
  clearInterval(timerId);
  let partOfData = convertMs(0);
  setTextContent(partOfData);
  btn.style.color = '#000000';
  btn.textContent = 'Start';
  inputData.removeAttribute('disabled');
}

btn.addEventListener('click', () => {
  switch (btn.textContent) {
    case 'Start':
      timerId = setInterval(changeCounter, 1000);
      btn.style.color = '#ff0000';
      btn.textContent = 'Stop';
      inputData.setAttribute('disabled', 'disabled');
      break;
    case 'Stop':
      stopTimer();
      break;
  }
});
