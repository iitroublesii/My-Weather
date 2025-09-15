let useFar = true; // default to Fahrenheit

function fetchWeather(city, latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const display = document.getElementById("weather-display");

  display.innerHTML = `<div class="spinner"></div>`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = data.current_weather;

      const temperature = useFar
        ? `${cToF(weather.temperature).toFixed(1)}°F`
        : `${weather.temperature.toFixed(1)}°C`;

      const output = `
        <h2>Weather in ${city}</h2>
        <ul>
          <li><strong>Temperature:</strong> ${temperature}</li>
          <li><strong>Windspeed:</strong> ${weather.windspeed} km/h</li>
          <li><strong>Wind Direction:</strong> ${weather.winddirection}°</li>
          <li><strong>Weather Code:</strong> ${weather.weathercode}</li>
        </ul>
      `;

      display.innerHTML = output;
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
      display.innerHTML = `<p>⚠️ Failed to load weather data.</p>`;
    });
}

function cToF(celsius) {
  return (celsius * 9) / 5 + 32;
}

function toggleTempUnit() {
  useFar = !useFar; // flip between true/false

  const toggleBtn = document.getElementById("temp-toggle");
  toggleBtn.textContent = useFar ? "Switch to °C" : "Switch to °F";
}
