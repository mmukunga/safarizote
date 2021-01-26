import React, { useState, useEffect, useReducer } from 'react';
import UserForm, { Select } from "./UserForm";
import axios from 'axios';

  const initialState = {
      id: '',
      countryCode: 'AF',
      countryName: 'Afghanistan',
      cityName: 'Kabul'
  };
  
  const reducer = (state, action) => {
    switch(action.type) {
      case 'SET_COUNTRY':
        console.log(action.payload);
        return {
          ...state, ...action.payload
        };
      case 'SET_CITY':
        return { 
          ...state, cityName: action.payload
        };  
      default:
        return state;
    }
  }

  const IMG_URL = 'https://openweathermap.org/img/w';
  
  const Weather = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [list, setList] = useState([]);
    

    function handleChange(evt) {
      if (evt.target.name === "countryCode") {
        alert('country');
        console.log(evt.target.value);
        const filteredCountry = countries.find(country => country.code === evt.target.value);
        console.log(filteredCountry);
        let newCountry = { ...state };
        console.log(newCountry);
        newCountry = { ...state, ...filteredCountry };
        console.log(newCountry);
        dispatch({ type: 'SET_COUNTRY', payload: newCountry});
        console.log('1.SET_COUNTRY...');
      } else {
        alert('City');
        dispatch({ type: 'SET_CITY', payload: evt.target.value });
        console.log('1.SET_CITY...');
      }
    }
    
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
      alert('get cities');
      console.log(state);

      let country = {
            name: state.countryName,
            code: state.countryCode,
            cities: null
      };
      
      console.log(country);
      axios.post('/api/cities', country)
          .then(response => {
              console.log('1.CITIES..');
              console.log(response);
              console.log('2.CITIES..');
              let filteredCity = [];
              response.data.forEach(function(city) {
                filteredCity.push({  
                   id: city.id,  
                   value: city.name,
                   title: city.name
                 });
               }); 
              setCities(filteredCity);
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

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Weather Forecast!!');
        //const { country, city } = state;         
        var headers = {
          'Content-Type': 'application/json' 
        };

        const country = {
            name: state.countryName,
            code: state.countryCode,
            cities: null
        };

        axios.post('/api/weather', country, headers).then(response => {
            setWeather(response.data);
        }).catch(err => {
            console.log(err);
        });

        axios.post('/api/forecast', country, headers).then(response => {
            setForecast(response.data);
        }).catch(err => {
            console.log(err);
        });

        dispatch({ type: "RESET" });
    };
    

    const WeatherCard = (props) => {
      console.log(props);
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

      const ForecastCard = (props) => {
        console.log(props);
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
     
    const ForecastList = props => {
      return (
      <div className="ForecastList">
          {props.cards.map(card => (
              card.temp !=null && <ForecastCard {...card} />
          ))}
      </div>
      )
    };

    return (
        <div className="Weather">
            Weather! {state.cityName} - {state.countryName}, {state.countryCode} 
            <UserForm
                cancel={() => {console.log('cancel')}}
                errors={[]}
                onChange={handleChange}
                submit={handleSubmit}
                elements={() => (
                   <>
                      <Select id="countryCode" name="countryCode" text="Country"  data={countries} onChange={handleChange}/>
                      <Select id="cityName" name="cityName" text="City" data={cities} onChange={handleChange}/>                    
                   </>
                )}
                >    
            </UserForm>

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


        </div>
    );
}

export default Weather