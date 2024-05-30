async function getData(city) {
  try {
    const method = 'forecast.json';
    const response = await fetch(
      `https://api.weatherapi.com/v1/${method}?key=036bf4f3697d4187b09201454242805&q=${city}&days=3`,
      { mode: 'cors' }
    );

    if (!response.ok) {
      throw new Error(`City not found: ${city}`);
    }

    const parsed = await response.json();
    return processData(parsed);
  } catch (error) {
    alert(error);
    return null;
  }
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

  const days = obj.forecast.forecastday;
  days.forEach((dayItem) => {
    const dayObj = {
      date: dayItem.date,
      conditionIcon: dayItem.day.condition.icon,
      chanceOfRain: dayItem.day.daily_chance_of_rain,
      humidity: dayItem.day.avghumidity,
      minTemp: dayItem.day.mintemp_f,
      maxTemp: dayItem.day.maxtemp_f,
    };
    dataObj.forecastInfo.push(dayObj);
  });
  return dataObj;
}

export { getData, processData };
