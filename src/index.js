function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.main.temp;
  let cityElement = document.querySelector("#city");

  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img
  src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png" class="weather-app-icon"/>`;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.name);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "3d2931e5559b9b4130d14fe62dcabb79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSeachSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSeachSubmit);

function getForecast(city) {
  let apiKey = "bf785f5d7034726661afatbof3354b0c";
  //let apiKey = "3d2931e5559b9b4130d14fe62dcabb79";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?q=${city}&appid=${apiKey}&units=metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
  https: console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-day col-2">
       <div class="weather-forecast-date">${day}</div>
       <div class="weather-forecast-icon">
      <img src="https://openweathermap.org/img/wn/10d.png" width="42" />
      </div>
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">18° </span>
        <span class="weather-forecast-temperature-min">12° </span>
      </div>
     
    </div>
`;
  });

  forecastElement.innerHTML = forecastHtml;
}

searchCity("Paris");
//getForecast("Paris");
