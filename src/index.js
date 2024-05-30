const APIKey = '036bf4f3697d4187b09201454242805';

async function getData() {
  const location = 'phoenix';
  const method = 'current';
  const response = await fetch(
    `http://api.weatherapi.com/v1/${method}.json?key=${APIKey}&q=${location}`,
    { mode: 'cors' }
  );
  const parsed = await response.json();
  console.log(parsed)
}

getData();

