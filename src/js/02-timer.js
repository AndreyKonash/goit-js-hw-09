import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let countDownInterval;
let selectedDate;
let currentDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notify.failure('Please choose a date in the future');
      //   window.alert('Please choose a date in the future');
      refs.dateTimePicker.value = '';
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};
flatpickr(refs.dateTimePicker, options);

refs.startBtn.addEventListener('click', startTimer);

function startTimer() {
  clearInterval(countDownInterval);

  selectedDate = new Date(refs.dateTimePicker.value);
  currentDate = new Date();

  const remainingTime = selectedDate.getTime() - currentDate.getTime();

  if (remainingTime <= 0) {
    return;
  }

  countDownInterval = setInterval(() => {
    const remainingTime = selectedDate.getTime() - new Date().getTime();

    if (remainingTime <= 0) {
      clearInterval(countDownInterval);
      refs.daysEl.textContent = '00';
      refs.hoursEl.textContent = '00';
      refs.minutesEl.textContent = '00';
      refs.secondsEl.textContent = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    refs.daysEl.textContent = addLeadingZero(days);
    refs.hoursEl.textContent = addLeadingZero(hours);
    refs.minutesEl.textContent = addLeadingZero(minutes);
    refs.secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
