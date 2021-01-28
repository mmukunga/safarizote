import React from 'react';
import axios from 'axios';

const Weather = (props) => {
    const [country, setCountry] = React.useState('');
    const [city, setCity] = React.useState('');
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
        <div>
            <h1>Weather</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                  type="country"
                  name="country"
                  placeholder="Country"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  required
              />
              </div>
              <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                  type="city"
                  name="city"
                  placeholder="City"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  required
              />
              </div>
              <button type="submit">Send</button>  
            </form>
        </div>
    );
}

export default Weather;

