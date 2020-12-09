import { Component } from 'react';
import React from 'react';
import Logo from './components/logo';
import SearchBox from './components/searchBox';
import Api from './service/api.js';
import './index.css';
import ForecastContainer from './components/forecastContainer';
import 'tailwindcss/tailwind.css';
import './components/app.css';
import rain from './assets/rain.png';
import snow from './assets/snow.png';
import sunny from './assets/sunny.png';



class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            weather: {
                main: '',
                description: '',
                temperature: 0,
                temp_min: 0,
                temp_max: 0,
                humidity: '',
                city_name: '',
                country: ''
            },
            forecasts: [],
            error: null
        };

        this.city = 'New York';

        this.api = new Api();

        this.componentDidMount = () => {
            this.getCurrentWeather();
            this.getForecast();
        };

        this.onInputChange = (event) => {

            this.city = event.target.value;
        };

        this.getCurrentWeather = () => {
            this.api.getCurrentWeather(this.city)
                .then(res => {
                    console.log(res);
                    this.setState({
                        weather: res,
                        error: null
                    });

                })
                .catch(err => {
                    this.setState({
                        error: `Can't get weather for ${this.city}`,
                        weather: null,
                        forecasts: []
                    });
                });
        };

        this.getForecast = () => {
            this.api.getForecast(this.city)
                .then(res => {
                    this.setState({
                        forecasts: res,
                        error: null
                    });

                })
                .catch(err => {
                    this.setState({
                        error: `Can't get forecast for ${this.city}`,
                        weather: null,
                        forecasts: []
                    });
                });
        };
    }


    background() {
        if (!this.state.weather) {
            return 'url(' + sunny + ')';
        }
        if (this.state.weather.main.toLowerCase() == 'rain') {
            return 'url(' + rain + ')';
        }
        else if (this.state.weather.main.toLowerCase() == 'snow') {
            return 'url(' + snow + ')';
        }
        else {
            return 'url(' + sunny + ')';
        }

    }

    render() {
        return (
            <div className='App' style={{ backgroundImage: this.background()}}>

                <Logo />
                <div>
                    <SearchBox
                        getCurrentWeather={this.getCurrentWeather}
                        onInputChange={this.onInputChange}
                        getForecast={this.getForecast}
                    />
                </div>
                { this.state.error &&
                <div className="error">{this.state.error}</div>
                }
                { this.state.weather &&
                <div className='weather'>
                    <div className='city'> {this.state.weather.city_name} </div>
                    <div className='description'> {this.state.weather.description} </div>
                    <div className='temp'> {Math.round(this.state.weather.temperature)} °c </div>
                    <div className='humidity'> humidity: {this.state.weather.humidity} % </div>
                    <div className='forecast' >
                        {
                            this.state.forecasts.map((forecast, index) => {
                                return (
                                    <div className='forecastBox' key={index}>

                                        <div> <ForecastContainer forecast={forecast} /> </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                }
            </div>
        );
    }
}



export default App;