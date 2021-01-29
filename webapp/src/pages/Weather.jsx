import React from 'react';
import axios from 'axios';
import Card from './Card';

const initialState = {
    cityName: 'Kabul',
    countryCode: "AF",
    cities: null
};

const reducer = function (state, action) {
    switch(action.type) {
        case 'SET_COUNTRY':
            const {name, value} = action.payload;
            return {...state, [name]: value};
        default:
            return state;
    }
}

const Weather = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const handleChange = (event) => {
        dispatch({type: 'SET_COUNTRY', payload: event.target})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/weather', {
            country: country,
            city: city
        }).then(response => {
            console.log(response)
        });
    }
    return (
        <Card title="Weather" text="Weather Forecast">
            <h1>Weather</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select id="country" name="country" onChange={handleChange}>    
                    <option value="none">Select Country</option>    
                    <option value="AF">Afghanistan</option>    
                    <option value="AU">Australia</option>    
                    <option value="USA">USA</option>    
                </select>  
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <select id="city" name="city" onChange={handleChange}>    
                    <option value="none">Select City</option>    
                    <option value="Kabul">Kabul</option>    
                    <option value="Jalalabad">Jalalabad</option>    
                    <option value="Baghdad">Baghdad</option>    
                </select>  
              </div>
              <button type="submit">Send</button>  
            </form>
       </Card>   
    );
}

export default Weather;

