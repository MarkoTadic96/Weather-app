import { DateTime } from 'luxon';
import React from 'react';
import 'tailwindcss/tailwind.css';
import './forecastContainer.css';

const forecastContainer = ({ forecast }) => {
    return (
        <div className='forecastDays'>
            <div className='date'> {DateTime.fromSeconds(forecast.dt).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)} </div>
            <div className='forecastData'>
                <div> {forecast.weather[0].description} </div>
                <div>
                    humidity: {forecast.main.humidity} %
                </div>
                <div>
                    {Math.round(forecast.main.temp - 273.5)} °c
                </div>
            </div>



        </div>);
};

export default forecastContainer;