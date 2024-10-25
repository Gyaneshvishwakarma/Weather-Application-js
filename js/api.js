const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '1e831e8af7fc63fe7841ed2091989b7c';

$(document).ready(function () { 
    weatherFn('Jabalpur'); 
});

async function weatherFn(cName) {
    // Trim spaces from the city name
    cName = cName.trim();
    const apiUrl = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#weather-info').fadeIn();
}
