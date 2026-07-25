const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherResult = document.getElementById("weatherResult");

const apiKey = "b486b737f7363741c9fd4114179651a6";

searchButton.addEventListener("click", function () {
    
    
    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.innerHTML = "Please enter a city.";
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            if (data.cod !== 200) {
                weatherResult.innerHTML = "City not found.";
                return;
            }

            const icon = data.weather[0].icon;
            
            weatherResult.innerHTML =
                `
                <h2>${data.name}</h2>

                <img src="https://openweathermap.org/img/wn/${icon}@2x.png">

                <p>Temperature:${Math.round(data.main.temp)}&deg;C</p>
                
                <p>Weather: ${data.weather[0].description
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
        })
        .catch(function() {
            weatherResult.innerHTML = "Something went wrong.";
        });

});