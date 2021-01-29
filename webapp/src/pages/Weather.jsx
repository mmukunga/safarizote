import React from 'react';
import axios from 'axios';
import Card from './Card';

const initialState = {
    cityName: 'Kabul',
    countryCode: "AF",
    countryName: "Afghanistan",
    cities: null
};

const reducer = function (state, action) {
    switch(action.type) {
        case 'SET_COUNTRY':
            return {...state, ...action.payload};
        case 'SET_CITY':
            return { 
                ...state, cityName: action.payload
            };  
        case 'SET_CITIES':
            return { 
                ...state, cities: action.payload
            };            
        default:
            return state;
    }
}

const IMG_URL = 'https://openweathermap.org/img/w';

const Weather = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [countries, setCountries] = React.useState([]);
    const [weather, setWeather] = React.useState({});
    const [forecast, setForecast] = React.useState([]);
    const [list, setList] = React.useState([]);

    useEffect(() => {
        axios.get('/api/countries')
            .then(response => {
                let filteredCountries = [];
                response.data.forEach(function(d) {
                  filteredCountries.push({
                     id: d.id,   
                     title: d.name,
                     value: d.code
                   });
                 }); 
                setCountries(filteredCountries);
            }).catch(err => console.log(err))
    }, []);

    
    React.useEffect(() => {
        let country = {
              name: state.countryName,
              code: state.countryCode,
              cities: null
        };
  
        axios.post('/api/cities', country)
            .then(response => {
                let filteredCity = [];
                response.data.forEach(function(city) {
                  filteredCity.push({  
                     id: city.id,  
                     value: city.name,
                     title: city.name
                   });
                 }); 
                dispatch({ type: 'SET_CITIES', payload: filteredCity });
            }).catch(err => console.log(err))
    }, [state.countryCode]);

    React.useEffect(() => {
        const country = {
            name: state.countryName,
            code: state.countryCode,
            cities: null
        };
          
        var headers = {
          'Content-Type': 'application/json' 
        };
  
        const fetchData = async () => {
          axios.post('/api/weather', country, headers).then(response => {
            setWeather(response.data);
        }).catch(err => {
            console.log(err);
        });
  
        axios.post('/api/forecast', country, headers).then(response => {
            setList(response.data.list);
            setForecast(response.data);
        }).catch(err => {
            console.log(err);
        });
        };
  
        fetchData();
  
    }, []);

    const handleChange = (event) => {
        if (event.target.name === "countryCode") {
            const filteredCountry = countries.find(country => {
               return (country.value === event.target.value);
            });
            let newCountry = { ...state, 
                countryCode: filteredCountry.value, 
                countryName: filteredCountry.title
            };
            dispatch({ type: 'SET_COUNTRY', payload: newCountry});
        } else {
          dispatch({ type: 'SET_CITY', payload: event.target.value });
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();   
        var headers = {
          'Content-Type': 'application/json' 
        };

        const country = {
            name: state.cityName,
            code: state.countryCode,
            cities: null
        };

        axios.post('/api/weather', country, headers).then(response => {
            setWeather(response.data);
        }).catch(err => {
            console.log(err);
        });

        axios.post('/api/forecast', country, headers).then(response => {
            setList(response.data.list);
            setForecast(response.data);
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <Card title="Weather" text="Weather Forecast">
            {state.cityName} - {state.countryName}, {state.countryCode} 
            <form className="form-container" onSubmit={handleSubmit}>
              <div className="form-group">
                <div class="col-25">   
                    <label htmlFor="country">Country</label>
                </div>
                <div class="col-25"> 
                <select id="countryCode" name="countryCode" className="dropdown" onChange={handleChange}>    
                    <option value="none">Select Country</option>   
                    {countries.map((country) => (
                        <option value={country.title}>{country.value}</option>
                    ))}    
                </select> 
                </div> 
              </div>
              <div className="form-group">
                <div class="col-25">   
                    <label htmlFor="city">City</label>
                </div>
                <div class="col-25"> 
                    <select id="cityName" name="cityName" className="dropdown" onChange={handleChange}>    
                        <option value="none">Select City</option>    
                        {state.cities.map((city) => (
                            <option value={city.cityName}>{city.cityName}</option>
                        ))}
                    </select>  
                </div>
              </div>
              <div className="form-group">
                <button type="submit">Send</button> 
              </div> 
            </form>

            <div className="day-container">
                {weather != null && weather.main
                 ?  <WeatherCard 
                    title='Current Local Weather'
                    width='500px'
                    date={new Date((weather.dt)*1000).toLocaleDateString("en-US")}
                    weather={weather}
                    />     
                  : <div>No Weather</div>   
              }
            </div>

            <div className="5days-container">
                {forecast != null 
                  ? <ForecastList cards={list} />
                  : <div>No Forecast</div>   
              }
            </div>
       </Card>   
    );
}


const WeatherCard = (props) => {
    return ( 
      <div className="WeatherCard"> 
          <span>loc: {props.weather.loc} date: {props.weather.date}</span>
          <img src={`${IMG_URL}/${props.weather.weather[0].icon}.png`} alt="wthr img" className="wthrImg"/>
          <div className="Cells">
            <div className="Cell">
              <small>Current</small>
              <div>{props.weather.main.temp}°</div>
            </div>
            <div className="Cell">
              <small>Sky</small>
              <div>{props.weather.weather[0].main}</div>
            </div>
            <div className="Cell">
              <div>{props.weather.weather[0].description}</div>
            </div>
          </div>
      </div>
    )
  }

  
const ForecastList = props => {
    return (
    <div className="ForecastList">
        {props.cards.map(card => (
            card.temp !=null && <ForecastCard {...card} />
        ))}
    </div>
    )
  };

const ForecastCard = (props) => {
    return (
        <div className="ForecastCard">
          <span>{props.date}</span>
          <img src={`${IMG_URL}/${props.weather[0].icon}.png`} alt="wthr img" className="wthrImg"/>
          <div className="Cells">
            <div className="Cell">
              <small>High</small>
              <div>{props.temp.day}°</div>
            </div>
            <div className="Cell">
              <small>Now</small>
              <div>{props.temp.min}°</div>
            </div>
            <div className="Cell">
              <small>Main</small>
              <div>{props.weather[0].main}</div>
            </div>
            <div className="Cell">
              <small>&nbsp;</small>
              <div>{props.weather[0].description}</div>
            </div>
          </div>
        </div>
    )
  }
 
export default Weather;

