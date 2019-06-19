class Forecast {
    constructor() {
        this.key = 'oR1L5biEhzsqNvFZvpkXEuqYIiHohHNR';
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }
    async updateCity(city) {
        //update city
        const cityDetails = await this.getCity(city);
        //pass city value to getCity() to get city key ,!!forecast script has to be above app.js
        const weather = await this.getWeather(cityDetails.Key);//KEY is in Key property
        //weather is an object

        return {
            cityDetails, weather
        }
        //object shorthand notation {cityDetails:cityDetails,weather:weather}
        //equal to {cityDetails,weather}
    }
    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        //use ? to follow the query parameters and use & to follow the other one
        const response = await fetch(this.cityURL + query);
        //response =fetch().then()
        const data = await response.json();
        //data = response.json.then()
        return data[0];
    };

    async getWeather(cityKey) {
        const query = `${cityKey}?apikey=${this.key}`;
        //city is not part of query is just after / 
        const response = await fetch(this.weatherURL + query);
        const data = await response.json();
        return data[0];
    }
}
