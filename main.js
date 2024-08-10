let apiKey = '017106187624b141cf038a4c591760ec';
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en';

let form = document.getElementById("form");
let searchLocation = document.getElementById("search")
let searchButton = document.querySelector(".loc-button");
let weatherIcon = document.getElementById("weather-icon");
let todayDay = document.querySelector('.today-day');
let todayDate = document.querySelector('.today-date');

let days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

let mounths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Now',
    'Dec'
];

let d = new Date();
let n = d.getDay();
let m = d.getMonth();
todayDay.innerText = days[n];
todayDate.innerText = `${d.getDate()} ${mounths[m]} ${d.getFullYear()}`;


async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("Unable to fetch weather data.");
        }

        const data = await response.json();

        console.log(data)

        document.querySelector(".weather-temp").innerText = Math.round(data.main.temp) + " °C";
        document.querySelector(".weather-main").innerText = data.weather[0].main;
        document.querySelector(".city").innerText = data.name;
        document.querySelector(".pressure").innerText = data.main.pressure + " hPa";
        document.querySelector(".humidity").innerText = data.main.humidity + " %";
        document.querySelector(".wind-speed").innerText = data.wind.speed + " m/s";
        document.querySelector(".temp-min").innerText = Math.round(data.main.temp_min) + " °C";
        document.querySelector(".temp-max").innerText = Math.round(data.main.temp_max) + " °C";

        weatherIcon.classList.remove('fa-location-crosshairs', 'fa-cloud', 'fa-sun', 'fa-cloud-showers-heavy', 'fa-cloud-rain', 'fa-smog');
        if (data.weather[0].main === "Clouds") {
            weatherIcon.classList.add("fa-cloud");
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.classList.add("fa-sun");
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.classList.add("fa-cloud-showers-heavy");
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.classList.add("fa-cloud-rain");
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.classList.add("fa-smog");
        }

    } catch (error) {
        console.error(error);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = searchLocation.value.trim();
    if (city !== "") {
        checkWeather(city);
        searchLocation.value = '';
    }
})