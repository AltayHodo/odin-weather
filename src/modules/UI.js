import { getData } from './data.js';

let isFahrenheit = true;
let currentDataObj = null;

async function renderUI(city) {
  currentDataObj = await getData(city);

  if (!currentDataObj) {
    return;
  }

  updateUI(currentDataObj);
}

function updateUI() {
  const name = document.querySelector('.name');
  const condition = document.querySelector('.condition');
  const currentTemp = document.querySelector('.current-temp');
  const tempRange = document.querySelector('.temp-range');

  name.textContent = `${currentDataObj.cityName}, ${currentDataObj.countryName}`;
  condition.textContent = `${currentDataObj.condition}`;
  currentTemp.textContent = `${convertTemp(currentDataObj.currentTemp)}°`;
  tempRange.textContent = `H: ${convertTemp(
    currentDataObj.maxTemp
  )}° L: ${convertTemp(currentDataObj.minTemp)}°`;

  const sunrise = document.querySelector('.sunrise');
  const sunset = document.querySelector('.sunset');
  const chanceOfRain = document.querySelector('.chance-of-rain');
  const humidity = document.querySelector('.humidity');
  const feelsLike = document.querySelector('.feels-like');

  sunrise.textContent = `${currentDataObj.sunrise}`;
  sunset.textContent = `${currentDataObj.sunset}`;
  chanceOfRain.textContent = `${currentDataObj.chanceOfRain}%`;
  humidity.textContent = `${currentDataObj.humidity}%`;
  feelsLike.textContent = `${convertTemp(currentDataObj.feelsLike)}°`;

  const forecastRows = document.querySelector('#forecast-rows');
  forecastRows.innerHTML = '';
  currentDataObj.forecastInfo.forEach((day) => {
    const forecastRow = document.createElement('tr');
    forecastRow.innerHTML = `
      <td>${day.date}</td>
      <td><img src=${day.conditionIcon} alt="weather-icon"></td>
      <td>${day.chanceOfRain}%</td>
      <td>${day.humidity}%</td>
      <td>${convertTemp(day.minTemp)}° - ${convertTemp(day.maxTemp)}°</td>
    `;
    forecastRows.appendChild(forecastRow);
  });
}

function convertTemp(temp) {
  if (isFahrenheit) {
    return temp;
  } else {
    return (((temp - 32) * 5) / 9).toFixed(1);
  }
}

function toggleTempUnit() {
  isFahrenheit = !isFahrenheit;
  document.querySelector('.farenheit').classList.toggle('active');
  document.querySelector('.celcius').classList.toggle('active');
  updateUI();
}

renderUI('phoenix');

const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', updateCity);

function updateCity() {
  const newCity = document.querySelector('#search').value;
  if (newCity === '') return;
  renderUI(newCity);
}

const toggleTempButton = document.querySelector('#toggle-temp-button');
toggleTempButton.addEventListener('click', toggleTempUnit);

export default renderUI;
