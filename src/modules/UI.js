import { getData } from './data';
async function renderUI(city) {
  const currentDataObj = await getData(city);
  const name = document.querySelector('.name');
  const condition = document.querySelector('.condition');
  const currentTemp = document.querySelector('.current-temp');
  const tempRange = document.querySelector('.temp-range');

  name.textContent = `${currentDataObj.cityName}, ${currentDataObj.countryName}`;
  condition.textContent = `${currentDataObj.condition}`;
  currentTemp.textContent = `${currentDataObj.currentTemp}°`;
  tempRange.textContent = `H: ${currentDataObj.maxTemp}° L: ${currentDataObj.minTemp}°`;

  const sunrise = document.querySelector('.sunrise');
  const sunset = document.querySelector('.sunset');
  const chanceOfRain = document.querySelector('.chance-of-rain');
  const humidity = document.querySelector('.humidity');
  const feelsLike = document.querySelector('.feels-like');

  sunrise.textContent = `${currentDataObj.sunrise}`;
  sunset.textContent = `${currentDataObj.sunset}`;
  chanceOfRain.textContent = `${currentDataObj.chanceOfRain}%`;
  humidity.textContent = `${currentDataObj.humidity}%`;
  feelsLike.textContent = `${currentDataObj.feelsLike}°`;


  const forecastRows = document.querySelector('#forecast-rows');
  forecastRows.innerHTML = ''
  currentDataObj.forecastInfo.forEach((day) => {
    const forecastRow = document.createElement('tr');
    forecastRow.innerHTML = `
      <td>${day.date}</td>
      <td><img src=${day.conditionIcon} alt="weather-icon"></td>
      <td>${day.chanceOfRain}%</td>
      <td>${day.humidity}%</td>
      <td>${day.minTemp}° - ${day.maxTemp}°</td>
    `;
    forecastRows.appendChild(forecastRow);
  });
}

renderUI('phoenix');

const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', updateCity);

function updateCity() {
  const newCity = document.querySelector('#search').value;
  if (newCity === '') return;
  renderUI(newCity);
}

export default renderUI;
