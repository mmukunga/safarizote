import React, { useState, useEffect, useReducer } from 'react';
import UserForm, { Select } from "./UserForm";
import axios from 'axios';

  const initialState = {
      name: 'Afgahnistan',
      code: 'AF',
      city: 'Kabul'
  };
  
  const reducer = (state, action) => {
    if (action.type === "reset") {
        return initialState;
    }
  
    const result = { ...state };
    result[action.type] = action.value;
    return result;
  };

  const IMG_URL = 'https://openweathermap.org/img/w';
  
  const Weather = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [list, setList] = useState([]);
    

    React.useEffect(() => {
      const country = {
          name: 'Afghanistan',
          code: 'AF',
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

    /*
    React.useEffect(() => {
      axios.get('/api/cities')
          .then(res => setCities(res.data))
          .catch(err => console.log(err))
    }, [state.country])
    */

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Weather Forecast!!');
        //const { country, city } = state;         
        var headers = {
          'Content-Type': 'application/json' 
        };

        const country = {
            name: 'Afghanistan',
            code: 'AF',
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

        dispatch({ type: "reset" });
    };
    

    const WeatherCard = (props) => {
        return ( 
          <div className="WeatherCard"> 
              <span>{props.weather.loc} {props.weather.date}</span>
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

    const handleChange = e => {
      console.log(e);
      const { name, value } = e.target;
      console.log(e.target.name + ',' + e.target.value);
      console.log(name + ',' + value);
      console.log(countries);
      let selectedCountry = countries.find(country => country.code === value);
      console.log(selectedCountry);
      dispatch({ type: name, value });
    };

    useEffect(() => {
        axios.get('/api/countries')
            .then(response => {
                let array_nodes = [];
                response.data.forEach(function(d) {
                   array_nodes.push({
                     id: d.id,   
                     title: d.name,
                     value: d.code
                   });
                 }); 
                setCountries(array_nodes);
            }).catch(err => console.log(err))
    }, []);

    React.useEffect(() => {
        alert('get cities');
        console.log(state);

        let country = {
              name: 'Afghanistan',
              code: 'AF',
              cities: null
        };
        
        console.log(country);

        axios.post('/api/cities', country)
            .then(response => {
                let array_nodes = [];
                response.data.forEach(function(d) {
                   array_nodes.push({  
                     id: d.id,  
                     title: d.name,
                     value: d.name
                   });
                 }); 
                setCities(array_nodes);
            }).catch(err => console.log(err))
    }, [state.country]);

    return (
        <div className="Weather">
            Weather!
            <UserForm
                cancel={() => {console.log('cancel')}}
                errors={[]}
                onChange={handleChange}
                submit={handleSubmit}
                elements={() => (
                   <>
                      <Select id="country" name="country" data={countries} text="Country" onChange={handleChange}/>
                      <Select id="city" name="country" data={cities} text="City" onChange={handleChange}/>                    
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