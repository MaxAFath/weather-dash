var formEl = document.querySelector('#form');
var city;
var state;
var country;
var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?";
var historyCol = document.getElementById("history");
var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
var current = {};
var hourly

kei="c65ea3e885f42ab98bbccee90b7f97e5";

formEl.addEventListener("submit", function(event){
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
var getLatLon = function(city, state, country){
    historySearch(city);

    if(state != 'false'){
        $.ajax({
            url:cityUrl+'q='+city+','+state+'&limit=1&appid='+kei,
            success:function(data){
                lati = data[0].lat;
                longe = data[0].lon;
                getWeather(lati, longe);
            }
        });
    }
    else if( country != 'false'){
        $.ajax({
            url:cityUrl+'q='+city+','+country+'&limit=1&appid='+kei,
            success:function(data){
                lati = data[0].lat;
                longe = data[0].lon;
                getWeather(lati, longe);
            }
        });
    }
    else{
        $.ajax({
            url:cityUrl+'q='+city+'&limit=1&appid='+kei,
            success:function(data){
                lati = data[0].lat;
                longe = data[0].lon;
                getWeather(lati, longe);
            }
        });
    }
    
};

function historySearch(city){
    let liEl = document.createElement("li");
    liEl.className = "city";
    liEl.innerHTML= city;
    historyCol.appendChild(liEl);
}

function getWeather(lati, longe){
    $.ajax({
        url:weatherUrl+'lat='+lati+'&lon='+longe+'&units=imperial&appid='+kei,
        success:function(data){
            console.log(data);
        }
    });
}