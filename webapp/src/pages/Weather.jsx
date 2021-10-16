import React from 'react';
import axios from 'axios';
import Card from './Card';

  const initialState = {
      city: 'Kabul',
      iso2: "AF",
      name: "Afghanistan",
      cities: null
  };

  const reducer = function (state, action) {
      switch(action.type) {
          case 'SET_COUNTRY':
              return {...state, ...action.payload};
          case 'SET_CITY':
              return { 
                  ...state, city: action.payload
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
    const [cities, setCities] = React.useState([]);
    const [weather, setWeather] = React.useState({});
    const [forecast, setForecast] = React.useState([]);
    const [list, setList] = React.useState([]);

    React.useEffect(() => {
      document.title = "Get the World weather forecast. Access hourly, 1 day and 5 day forecasts along with up to the minute reports and videos from safarizote.herokuapp.com";
    }, []);

    React.useEffect(() => {
      axios.get('/api/countries')
        .then(response => {
            console.log(response);
            setCountries(response.data);
        }).catch(err => console.log(err));

         let country = {
              name: 'Kabul',
              iso2: "AF",
              cities: null
        };
 
      axios.post('/api/cities', country)
        .then(response => {
            console.log(response);
            setCities(response.data);
            const cities = response.data;
            dispatch({ type: 'SET_CITIES', payload: cities });
        }).catch(err => console.log(err));

    }, []);

    React.useEffect(() => {
      var headers = {
        'Content-Type': 'application/json' 
      };

      const country = {
            name: state.city,
            iso2: state.iso2,
            cities: null
      };

      axios.post('/api/weather', country, headers)
        .then(response => {
            setWeather(response.data);
        }).catch(err => { console.log(err)});

      axios.post('/api/forecast', country, headers)
        .then(response => {
          setList([...response.data]);
          setForecast(response.data);
       }).catch(err => {console.log(err)});

    }, [countries]);

    React.useEffect(() => { 

      let country = {
        name: state.name,
        iso2: state.iso2,
        cities: null
      };

      axios.post('/api/cities', country)
        .then(response => {  
            console.log(response);
            setCities(response.data);
            const cities = response.data;
            dispatch({ type: 'SET_CITIES', payload: cities });
        }).catch(err => console.log(err));

    }, [state.iso2]);

    const handleChange = (event) => {
        if (event.target.name === "countryCode") {
            const filteredCountry = countries.find(country => {
               return (country.iso2 === event.target.value);
            });          
            let newCountry = { ...state, 
                iso2: filteredCountry.iso2, 
                name: filteredCountry.name
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
            name: state.name,
            iso2: state.iso2,
            cities: null
        };

        axios.post('/api/weather', country, headers).then(response => {
            setWeather(response.data);
        }).catch(err => {
            console.log(err);
        });

        axios.post('/api/forecast', country, headers).then(response => {
            setList([...response.data]);
            setForecast(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <Card className="InnerCard" fontColor="black">
        {state ? `${state.city} - ${state.name}, ${state.iso2}` : ''}
        <form class="form-inline"  onSubmit={handleSubmit}>
          <select id="countryCode" name="countryCode" onChange={handleChange}>    
              <option value="none">Select Country</option>   
              {countries.map((country) => (
                  <option value={country.iso2}>{country.name}</option>
              ))}    
          </select>
          <select id="cityName" name="cityName" onChange={handleChange}>    
              <option value="none">Select City</option>    
              {state.cities && state.cities.map((city) => (
                  <option value={city.name}>{city.name}</option>
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

        <h3>Weather Forecast</h3>
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