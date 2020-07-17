displayClock =  document.querySelector('#displayClock');

const timeIncrement = () => {

  const now = new Date;

  const hour = dateFns.format(now, 'hh');
  const minute = dateFns.format(now, 'mm');
  const seconds = dateFns.format(now, 'ss');
  const timeOfDay = dateFns.format(now, 'A')

  console.log(dateFns.format(now, 'mm'))

  displayClock.textContent = `${hour}:${minute}:${seconds} ${timeOfDay}`
};

setInterval(() => {
  timeIncrement()
}, 1000)