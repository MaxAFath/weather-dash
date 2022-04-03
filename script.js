var formEl = document.querySelector('#form');
var city = 'london';
var state = "false";
var country = "false";
var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?";

var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
var current = {};
var hourly

kei="c65ea3e885f42ab98bbccee90b7f97e5";



var lati = '0';//latitude named this way to avoid erron in calling for response in api
var longe = '0';//longitude se above

var response = new Object();

//function to get latitude and longitude of city by the inputs name, state, and/or country
var getLatLon = function(city, state, country){
    let temp;
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

getLatLon(city, state, country);

function getWeather(lati, longe){
    $.ajax({
        url:weatherUrl+'lat='+lati+'&lon='+longe+'&units=imperial&appid='+kei,
        success:function(data){
            console.log(data);
        }
    });
}