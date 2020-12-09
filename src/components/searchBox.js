import React from 'react';
import './searchBox.css';

const searchBox = ({ getCurrentWeather, 
    onInputChange, getForecast}) => {
    return (
        <div className='wrap'>
            <form className='search' onSubmit={(e)=>{ e.preventDefault(); getCurrentWeather(); getForecast(); }}>
                <input className='searchTerm' type='text' placeholder='city' onChange={onInputChange} />
                <button className='searchButton' type='submit'> search </button>
            </form>
        </div>
    );
};

export default searchBox;