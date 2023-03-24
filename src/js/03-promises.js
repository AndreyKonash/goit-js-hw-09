// const form = document.querySelector('.form');

// function createPromise(position, delay, shouldResolve) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// form.addEventListener('submit', onFormSubmit);

// function onFormSubmit(event) {
//   event.preventDefault();

//   const { delay, step, amount } = event.target.elements;
//   const delayValue = Number(delay.value);
//   const stepValue = Number(step.value);

//   if (delayValue < 1 || stepValue < 1 || amount.value < 1) {
//     Notify.failure(`All fields must be more than zero`);
//   }

//   const promises = [];
//   for (let i = 1; i <= amount.value; i += 1) {
//     const shouldResolve = Math.random() > 0.3;
//     promises.push(createPromise(i, delayValue, shouldResolve));
//   }

//   Promise.all(promises)
//     .then(results => {
//       results.forEach(({ position, delay }) => {
//         Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
//       });
//     })
//     .catch(results => {
//       const result = results[0];
//       Notify.failure(
//         `Rejected promise ${result.position} in ${result.delay}ms`
//       );
//     });

//   event.currentTarget.reset();
// }

import { Notify } from 'notiflix';

const refs = {
  formInputEl: document.querySelector('.form'),
};

let timeId = null;

refs.formInputEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  clearTimeout(timeId);

  const { delay, step, amount } = event.target.elements;
  let stepValue = Number(delay.value);

  if (delay.value < 1 || step.value < 1 || amount.value < 1) {
    Notify.failure(`All fields must be more than zero`);
    return;
  }

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, stepValue)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise #${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise #${position} in ${delay}ms`);
      });
    stepValue += Number(step.value);
  }

  event.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    timeId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
