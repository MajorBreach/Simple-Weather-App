function getWeatherByGeolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getWeatherData(latitude, longitude);
            },
            (error) => {
                console.error("Error getting geolocation:", error);
            }
        );
    } else {
        alert("Geolocation is not available on this device.");
    }
}

function getWeatherByManualLocation() {
    const locationInput = document.getElementById("locationInput").value;
    if (locationInput.trim() !== "") {
        getWeatherData(null, null, locationInput);
    } else {
        alert("Please enter a valid location.");
    }
}

function getWeatherData(latitude, longitude, locationName) {
    const apiKey = "a86f79ffad64fa69e53c29da83de2b63";
    let apiUrl;

    if (latitude && longitude) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    } else if (locationName) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}&units=metric`;
    }

    if (apiUrl) {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const cityName = data.name;
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description
                const weatherDataContainer = document.getElementById("weatherData");
                weatherDataContainer.innerHTML = `
            <h3>Weather in ${cityName}</h3>
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${weatherDescription}</p>
        `;
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
            });
    }
}