var formEl = document.querySelector('#form');

var cityInput = function(event){
    event.preventDefault();
    const cityName = document.querySelector("input[name='city']").ariaValueMax;
    document.append(cityName);
}