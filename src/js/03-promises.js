import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btn = document.querySelector('button');
const form = document.querySelector('.form');

function createPromise(position, delay) {
  const promis = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promis;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let delay = +form.elements['delay'].value;
  let step = +form.elements['step'].value;
  let amount = +form.elements['amount'].value;

  

  for (let i = 1, j = delay; i <= amount; i++, j += step) {
    
    createPromise(i, j)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
