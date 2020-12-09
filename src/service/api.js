import { BELGRADE, ZAGREB } from '../mock/currentMock';

import { DateTime } from 'luxon';



const apiData = {
    base: 'http://api.openweathermap.org/data/2.5/',
    key: '3b865e9d75feec9107c8761d050c3a8f',
    mock: false
};

class Api {

    constructor() {
        this.key = '';
    }

    getCurrentWeather(city) {
        var promise;

        if (apiData.mock) {
            promise = this.getCurrentMock(city);
        } else {
            promise = fetch(`${apiData.base}weather?q=${city}&APPID=${apiData.key}`)
                .then(res => res.json());
        }

        return promise
            .then(res => {
                return  {
                    main: res.weather[0].main,
                    description: res.weather[0].description,
                    temperature: res.main.temp - 273.15,
                    temp_min: res.main.temp_min - 273.15,
                    temp_max: res.main.temp_max - 273.15,
                    humidity: res.main.humidity,
                    city_name: res.name,
                    country: res.country
                }
                ;
            });
    }
    getForecast(city) {
        var promise;


        if (apiData.mock) {
            promise = this.getCurrentMock(city);
        } else {
            promise = fetch(`${apiData.base}forecast?q=${city}&APPID=${apiData.key}`)
                .then(res => res.json());
        }

        return promise

            .then(res => {
                var daysForecast = [];
                var date = res.list[0].dt;

                res.list.forEach(
                    (item) => {
                        if (DateTime.fromSeconds(item.dt) >= DateTime.fromSeconds(date).plus({days: 1})) {
                            daysForecast.push(item);
                            date = item.dt;
                        }
                    }
                );
                
                console.log(daysForecast);

                return daysForecast;
            });
    }

    /**
         * @param {string} city
         */
    getCurrentMock(city) {
        return new Promise((ex) => {
            switch (city.toLowerCase()) {
            case 'belgrade':
                return ex(BELGRADE);
            case 'zagreb':
                return ex(ZAGREB);
            }
        });
    }

    
}



export default Api;