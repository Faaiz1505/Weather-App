document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.getElementById("city-input");
  const searchBtn = document.getElementById("search-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const weatherIcon = document.getElementById("weather-icon");
  const humidity = document.getElementById("humidity");
  const errorMsg = document.getElementById("error-message");
  const Api_Key = "3d416c00c72f18c18674efa8ea284810";

  cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn.click();
    }
  });

  searchBtn.addEventListener("click", async function () {
    const city = cityInput.value.trim();
    if (city === "") {
      cityInput.classList.add("error");
      cityInput.value = "";
      cityInput.placeholder = "Please enter valid city name!";
      setTimeout(() => {
        cityInput.classList.remove("error");
        cityInput.placeholder = "Enter city name...";
      }, 2000);
      return;
    }
    if (!city) return;
    cityInput.value = "";

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });
  async function fetchWeatherData(city) {
    // get weather data from API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_Key}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather, wind } = data;
    cityName.textContent = name;
    temperature.textContent = ` ${main.temp} °C`;
    description.textContent = `Weather: ${weather[0].description}`;
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}" />`;
    humidity.textContent = `Humidity: ${main.humidity}%`;

    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }
  function showError() {
    weatherInfo.classList.add("hidden");
    setTimeout(() => {
      errorMsg.classList.add("hidden");
    }, 3000);
    errorMsg.classList.remove("hidden");
  }
});
