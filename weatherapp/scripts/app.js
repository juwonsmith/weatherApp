const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time =document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const forecast = new Forecast();


const updateUI = (data) => {
    // const cityDets =data.cityDets;
    // const weather = data.weather;
    //destruture properties
    const{ cityDets, weather} = data;

    //update detaills template\
    details.innerHTML =`
            <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
    `
    //UPDATE THE NIGHT/DAY ICON IMAGES
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // let timeSrc = null;
    // if (weather.IsDayTime){
    //     timeSrc = 'img/day.svg'
    // }else{
    //     timeSrc= 'img/night.svg'
    // }
   ///using tenerary operator
   let timeSrc = weather.IsDayTime ? 'img/day.svg': 'img/night.svg';

    time.setAttribute('src', timeSrc);
     //remove d-none class if present
     if (card.classList.contains('d-none')){
         card.classList.remove('d-none')
     }
}





// const updateCity = async (city) => {
//     const cityDets = await getCity(city);
//     const weather = await getWeather(cityDets.Key);
//     return {cityDets,weather};

// };

cityForm.addEventListener('submit', e => {
//prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();
    //set localstorage
    localStorage.setItem('city', city);

    //update ui with new city
    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err=> console.log(err));
})

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}