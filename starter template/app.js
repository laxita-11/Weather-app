// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

const weather = {
    temperature:{
        // value:;
        unit:"celsius"
    }
    // description:;
    // iconId:;
    // city:;
    // country:;

};

const KELVIN = 273;
const key = '99e3a7630b56557ba97838e0462691a1';

//Check if browser supports geolocation
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>"
}

// // SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> $(error.message) </p>`;
}

//Get weather from API provider

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            console.log(data);
            return data;
        })

    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })

    .then(function(){
        displayWeather();
    })
}

// getWeatherData();
// function getWeatherData(){
//     navigator.geolocation.getCurrentPosition((success) => {
//         console.log(success);

//         let{latitude, longitude} = success.coords;
//         fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${key}`).then(res => res.json()).then(data => {
//             console.log(data);
//             displayWeather(data);
//         })
//     })
// }



function displayWeather(){
    iconElement.innerHTML = `<img src = "icons/${weather.iconId}.png">`;
    tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function celciusToFahrenheit(temperature){
    return (temperature *9/5) +32;
}

tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    if(weather.temperature.unit === "celsius"){
        let fahrenheit = celciusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }
    else{
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});

