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

    React.useEffect(() => {
      axios.get('/api/countries')
        .then(response => {
            let filteredCountries = [];
            console.log(response);
            setCountries([response.data]);
        }).catch(err => console.log(err));
         let country = {
              name: 'Kabul',
              code: "AF",
              cities: null
        };
    }, []);

    const handleChange = (event) => {
        console.log(countries);
        if (event.target.name === "countryCode") {
            const filteredCountry = countries.find(country => {
               return (country.countryCode === event.target.value);
            });
            console.log(filteredCountry);
            let newCountry = { ...state, 
                countryCode: filteredCountry.countryCode, 
                countryName: filteredCountry.countryName
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
        <Card className="InnerCard" fontColor="black">
        {state.cityName} - {state.countryName}, {state.countryCode} 
        <form class="form-inline"  onSubmit={handleSubmit}>
          <select id="countryCode" name="countryCode" onChange={handleChange}>    
                <option value="none">Select Country</option>   
                {countries.map((country) => (
                    <option value={country.countryName}>{country.countryCode}</option>
                ))}    
            </select>
          <select id="cityName" name="cityName" onChange={handleChange}>    
                  <option value="none">Select City</option>    
                  {state.cities && state.cities.map((city) => (
                      <option value={city.cityName}>{city.cityName}</option>
                  ))}
                </select>  
          <button type="submit">Submit</button>
        </form>
        
        {weather != null && weather.main
          ? <WeatherCard 
            title='Current Local Weather'
            date={new Date((weather.dt)*1000).toLocaleDateString("en-US")}
            weather={weather}
            />     
          : <div>No Weather</div>   
        }

        <p>Forecast</p>
        {forecast != null 
          ? <ForecastList cards={list} />
          : <div>No Forecast</div>   
        }

        </Card>   
    );
  }

  const WeatherCard = (props) => {
    const unix_tm = props.weather.dt;
    return ( 
      <div className="WeatherCard"> 
         <div  className="Current">
          Cod: {props.weather.cod} Date: {new Date(unix_tm*1000).toLocaleDateString()}
            <img src={`${IMG_URL}/${props.weather.weather[0].icon}.png`} 
                  alt="wthr img" 
                  className="wthrImg"/>
          </div>      
          <div className="Current">
              <div className="CellDiv"><small>Temp</small> {props.weather.main.temp}°</div>
              <div className="CellDiv">{props.weather.weather[0].description}</div>
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
        <div>High</div>
        <div>{props.temp.day}°</div>
        <div>Now</div>
        <div>{props.temp.min}°</div>
        <div>{props.weather[0].description}</div>         
      </div>
    )
  }
 
  export default Weather;