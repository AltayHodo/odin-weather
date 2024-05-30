const APIKey = '036bf4f3697d4187b09201454242805';
const baseURL = 'http://api.weatherapi.com/v1/';

async function getData() {
  const location = 'phoenix';
  const method = 'forecast.json';
  const response = await fetch(
    `${baseURL}${method}?key=${APIKey}&q=${location}&days=3`,
    { mode: 'cors' }
  );
  const parsed = await response.json();
  return processData(parsed)

}


function processData(obj) {
  console.log(obj)

  const dayZero = obj.forecast.forecastday[0].day
  const dataObj = {
    cityName: obj.location.name,
    countryName: obj.location.country,
    currentTemp: obj.current.temp_f,
    minTemp: dayZero.mintemp_f,
    maxTemp: dayZero.maxtemp_f,
    condition: dayZero.condition.text,
    feelsLike: obj.current.feelslike_f,
    humidity: obj.current.humidity,
    chanceOfRain: dayZero.daily_chance_of_rain,
    sunset: obj.forecast.forecastday[0].astro.sunset, 
    sunrise: obj.forecast.forecastday[0].astro.sunrise, 
  }
  return dataObj;
}

export { getData, processData }