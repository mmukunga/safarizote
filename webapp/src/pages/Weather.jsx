import React, { useState, useEffect, useReducer } from 'react';
import UserForm, { Select } from "./UserForm";
import axios from 'axios';

   const initialState = {
       country: 'AF',
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
          console.log(response);
          setWeather(response.data);
          console.log('Weather Data OK!!');
      }).catch(err => {
          console.log(err);
      });

      axios.post('/api/forecast', country, headers).then(response => {
          console.log('1.FORECAST..');
          console.log(response);
          setList(response.data.list);
          console.log('2.FORECAST..');
          setForecast(response.data);
          console.log('Weather Forecast Data OK!!');
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
            name: 'Afghanistan',
            code: 'AF',
            cities: null
        };

        axios.post('/api/weather', country, headers).then(response => {
            console.log(response);
            setWeather(response.data);
            console.log('Weather Data OK!!');
        }).catch(err => {
            console.log(err);
        });

        axios.post('/api/forecast', country, headers).then(response => {
            console.log(response);
            setForecast(response.data);
            console.log('Weather Forecast Data OK!!');
        }).catch(err => {
            console.log(err);
        });

        dispatch({ type: "reset" });
    };
    

    const WeatherCard = (props) => {
        return (
          <div style={{ border:'1px solid green', margin: '1em', width: '500px' }}>
            <span className="pt-3 text-center">{props.weather.loc} {props.weather.date}</span>
            <img src={`https://openweathermap.org/img/w/${props.weather.weather[0].icon}.png`} alt="wthr img" style={{ width: '70px' }}/>
            <div> 
                { props.weather != null && props.weather.main
                ?<div className="Temperature">
                    <div className="Cell">
                      <small>Current</small>
                      <div>{props.weather.main.temp}°</div>
                    </div>
                    <div className="Cell">
                      <small>Main</small>
                      <div>{props.weather.weather[0].main}</div>
                    </div>
                    <div className="Cell">
                      <small>Description</small>
                      <div>{props.weather.weather[0].description}</div>
                    </div>
                  </div>
                : <div>No Data Found!! </div>
                 }
            </div>
          </div>
        )
      }

      const ForecastCard = (props) => {
        return (
          <div style={{ border:'1px solid green', margin: '1em', width: '100px'}}>
            { props.forecast != null  
           ?  <div className="Temperature">
                  <span className="pt-3 text-center">{props.forecast.temp.day} {props.date} {props.forecast.weather[0].description}</span>
                  <img src={`https://openweathermap.org/img/w/${props.forecast.weather[0].icon}.png`} alt="wthr img" style={{ width: '70px' }}/>
                    <div className="Cell">
                      <small>High</small>
                      <div>{props.forecast.temp.day}°</div>
                    </div>
                    <div className="Cell">
                      <small>Now</small>
                      <div>{props.forecast.temp.min}°</div>
                    </div>
                    <div className="Cell">
                      <small>Main</small>
                      <div>{props.forecast.weather[0].main}</div>
                    </div>
                    <div className="Cell">
                      <small>Description</small>
                      <div>{props.forecast.weather[0].description}</div>
                    </div>
                 </div>   
            : <div> No  data </div>
            }
          </div>
        )
      }
     

    const ForecastList = props => {
      return (
      <div>
          {props.cards.map(card => (
              <ForecastCard {...card} />
          ))}
      </div>
      )
    };

    const handleChange = e => {
      console.log(e);
      const { name, value } = e.target;
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

    useEffect(() => {
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
                    /*high={weather.main.temp_max}
                    current={weather.main.temp}
                    low={weather.main.temp_min}
                    main={weather.main}*/
                    /*detail={weather.main}
                    icon={weather.weather[0].icon}*/
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