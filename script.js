var formEl = document.querySelector('#form');
var city;
var state;
var country;
var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?";
var historyCol = document.getElementById("history");
var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
var current = document.getElementById("current");
var forcast = document.getElementById("forcast");

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

kei = "c65ea3e885f42ab98bbccee90b7f97e5";

formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    city = document.querySelector("input[name='city']").value;
    state = document.querySelector("input[name='state']").value;
    country = document.querySelector("input[name='country']").value;
    getLatLon(city, state, country);
})

var lati = '0';//latitude named this way to avoid err on in calling for response in api
var longe = '0';//longitude se above

var response = new Object();

//function to get latitude and longitude of city by the inputs name, state, and/or country
var getLatLon = function (city, state, country) {
    historySearch(city);

    if (state != 'false') {
        $.ajax({
            url: cityUrl + 'q=' + city + ',' + state + '&limit=1&appid=' + kei,
            success: function (data) {
                lati = data[0].lat;
                longe = data[0].lon;
                getWeather(lati, longe);
            }
        });
    }
    else if (country != 'false') {
        $.ajax({
            url: cityUrl + 'q=' + city + ',' + country + '&limit=1&appid=' + kei,
            success: function (data) {
                lati = data[0].lat;
                longe = data[0].lon;
                getWeather(lati, longe);
            }
        });
    }
    else {
        $.ajax({
            url: cityUrl + 'q=' + city + '&limit=1&appid=' + kei,
            success: function (data) {
                lati = data[0].lat;
                longe = data[0].lon;
                getWeather(lati, longe);
            }
        });
    }

};

function historySearch(city) {
    let liEl = document.createElement("li");
    liEl.className = "btn";
    liEl.innerHTML = city;
    historyCol.appendChild(liEl);
    let temp = document.getElementById("heroCity");
    temp.innerHTML = city;
}

function getWeather(lati, longe) {
    $.ajax({
        url: weatherUrl + 'lat=' + lati + '&lon=' + longe + '&units=imperial&appid=' + kei,
        success: function (data) {
            console.log(data);
            document.getElementById("date").innerHTML = today;
            document.getElementById("temp").innerHTML = "Temp: " + data.current.temp;
            document.getElementById("wind").innerHTML = "Wind " + data.current.wind_speed;
            document.getElementById("humity").innerHTML = "Humidity " + data.current.humidity;
            document.getElementById("uv").innerHTML = "uvi " + data.current.uvi;
            for (let i = 0; i < 5; i++) {
                var card = document.createElement("div");
                card.className = "col";
                /*card.innerHTML= (document.createElement("p").innerHTML= data.daily[i].temp.max);
                card.innerHTML = (document.createElement("p").innerHTML = data.daily[i].wind_speed);
                card.innerHTML = (document.createElement("p").innerHTML = data.daily[i].humidity);*/
                var derp = document.createElement("p"); //derp is temp, called this to avoid refrence error issues
                var wind = document.createElement("p");
                var humidity = document.createElement("p");
                derp.innerHTML = "Temp: " + data.daily[i].temp.max;
                wind.innerHTML = "Wind " + data.daily[i].wind_speed;
                humidity.innerHTML = "Humidity " + data.daily[i].humidity;
                card.append(derp);
                card.append(wind);
                card.append(humidity);

                forcast.append(card);
            }
        }
    });
}

