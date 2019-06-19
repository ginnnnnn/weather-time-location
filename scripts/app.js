const cityForm = document.querySelector('form');
//select form element
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const clock = document.querySelector('.clock');

const forecast = new Forecast();
//create a forecast class object

const updateUI = ({ cityDetails, weather }) => {

    // console.log(cityDetails, weather)
    localStorage.setItem('city', cityDetails.EnglishName);

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>`

    //update day and night time img
    if (weather.IsDayTime) {
        time.setAttribute('src', 'img/day.svg')
    } else {
        time.setAttribute('src', 'img/night.svg')
    }
    icon.setAttribute('src', `img/icons/${weather.WeatherIcon}.svg`)


    //update time

    const now = new Date();
    const inputTimeOffset = cityDetails.TimeZone.GmtOffset * 60 * 60 * 1000;
    // console.log('inputTimeOffset', inputTimeOffset)
    const localTimeOffset = now.getTimezoneOffset() * 60000;
    // console.log('localTimeOffset', localTimeOffset)
    const utc = localTimeOffset + now.getTime();
    // console.log("utc", utc)
    const inputMilSecs = utc + inputTimeOffset
    // console.log("inputMilSecs", inputMilSecs);
    const inputTime = new Date(inputMilSecs);
    // console.log("inputTime", inputTime.toLocaleString());
    const hours = inputTime.getHours() < 10 ? `0${inputTime.getHours()}` : inputTime.getHours();
    const minutes = inputTime.getMinutes() < 10 ? `0${inputTime.getMinutes()}` : inputTime.getMinutes();
    clock.innerHTML = `
    <span>${hours}</span>:
    <span>${minutes}</span>
    `

    //remove d-none class ,only the first time user see this page has d-none
    if (card.classList.contains('d-none')) {
        //classList method
        card.classList.remove('d-none');
    }

};
//this will be called in updateCity()



cityForm.addEventListener('submit', e => {
    e.preventDefault();
    //add submit event and prevent refresh
    // console.log(e.target.city.value);
    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset()//this method will clear the form field
    forecast.updateCity(city).then(data => {
        updateUI(data)
    }).catch(err => console.log(err))
})

const storedCity = localStorage.getItem('city');
if (storedCity) {
    //null is false
    forecast.updateCity(storedCity).then(data => {
        updateUI(data)
    }).catch(err => console.log(err))
}
