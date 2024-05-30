const APIKey = '036bf4f3697d4187b09201454242805';
const baseURL = 'http://api.weatherapi.com/v1/';

async function getData(city) {
  const method = 'forecast.json';
  const response = await fetch(
    `${baseURL}${method}?key=${APIKey}&q=${city}&days=3`,
    { mode: 'cors' }
  );
  const parsed = await response.json();
  return processData(parsed);
}

function processData(obj) {
  const dayZero = obj.forecast.forecastday[0].day;
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
    forecastInfo: [],
  };

  const days = obj.forecast.forecastday
  //for each one- .date, .day.condition.icon, .day.daily_chance_of_rain, .day.avghumidity, .day.mintemp_f, .day.maxtemp_f

  days.forEach(dayItem =>{
    const dayObj = {
      date: dayItem.date,
      conditionIcon: dayItem.day.condition.icon,
      chanceOfRain: dayItem.day.daily_chance_of_rain,
      humidity: dayItem.day.avghumidity,
      minTemp: dayItem.day.mintemp_f,
      maxTemp: dayItem.day.maxtemp_f,
    }
    dataObj.forecastInfo.push(dayObj)
  })

  console.log(dataObj)
  return dataObj;
}

export { getData, processData };
