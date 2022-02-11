import React, { useState } from 'react'
import Card from './Card';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import Forecast from './Forecast';

const initialState = {iso2:'KE', city:'Nairobi'};

function Weather({ setPhotos }) {
    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState(initialState);
    const [search, setSearch] = useState("");
    const [query, setQuery]   = useState("Nairobi,KE");

    const getWeather = async () => {
      if (query !== "") {
        axios.post('/api/weather', query).then(response => {
          const { data } = response;
          setWeather(data);
          console.log(data.weather[0].icon);
          axios.post('/api/forecast', query).then(resp => {
            const { data } = resp;
            setForecast(data);
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
            console.log('error in catch', err);
        });
      }
    };

    React.useEffect(() => {
      getWeather();
    }, []);

    React.useEffect(() => {
      getWeather();
    }, [query]);

    const updateSearch = (e) => {
      setFormData({
        ...formData, 
        city: e.target.value
      });
      getSearch(e).then(async (res) => {
        setQuery(res);
        setSearch("");
      });
    };

    const getSearch = async (e) => {
      return new Promise((resolve, reject) => {
        setSearch(e.target.value + ',' + formData.iso2);
        resolve(e.target.value + ',' + formData.iso2);
      });
    }


    React.useEffect(() => {
      axios.get('/api/countries').then(response => {
        setCountries(response.data);
        }).finally(() => {
          console.log('error.message');
        })
    }, []);
    
    React.useEffect(() => {
        const options = {
          headers: {
              'Content-Type': 'application/json; charset = UTF-8',
          }
        };
        
        axios.post('/api/cities', formData.iso2, options).then(response => {
          setCities(response.data);
          }).finally(() => {
            console.log('error.message');
          })
    }, [formData.iso2]);

    function handleChange(evt) {
      evt.preventDefault();
      const {name, value} = evt.target;
      if (name === "country" ) { 
          const country = countries.find(country => country.name === evt.target.value);
          setFormData({
            ...formData,
            iso2: country.iso2
          });
      } else {           
        setFormData({
          ...formData,
          [evt.target.name]: value
        });
      }    
    }

  return (
    <Card className="Weather" styleProps={{width: '98%'}} title="Weather Report">
        Welcome to the Weather page
        <div className="container">
            <form>
            <div className="row">
                <div className="col-25">
                    <label htmlFor="country">Country</label>
                </div>
                <div className="col-75">
                    <select id="country" name="country"  onChange={handleChange}>
                      <option value="">Select one...</option>
                      {countries && countries.map((text,i) => (
                          <option key={i} value={text.name}>{text.name}</option>
                      ))}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    <label htmlFor="city">City</label>
                </div>
                <div className="col-75">
                <select id="city" name="city"  onChange={updateSearch}>
                    <option value="">
                        Select one...
                    </option>
                    {cities && cities.map((text,i) => (
                        <option key={i} value={text.name}>
                            {text.name}
                        </option>
                    ))}
                    </select>
                </div>
            </div>          
            </form>
            {weather.length!=0? <WeatherCard data={weather} /> : 'Loading...'}
            {forecast.length!=0? <Forecast data={forecast} query={query} /> : 'Loading...'}
        </div>
      
    </Card>
    );
}

export default Weather;