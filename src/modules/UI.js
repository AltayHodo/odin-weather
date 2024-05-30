import { getData } from './data';
async function renderUI() {
  const currentDataObj = await getData();
  console.log(currentDataObj);
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
}

renderUI();

export default renderUI;
