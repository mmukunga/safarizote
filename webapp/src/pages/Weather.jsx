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
    const [forecast, setForecast] = useState({});
    const [cards, setCards] = useState([])


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
          console.log(response);
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
    

    const Card = props => {
        return (
          <div style={{ margin: '1em', width: '100%' }}>
             <h2 id="current-city">{props.loc}</h2>
             <span className="date">{props.date}</span>
            <img alt="avatar" style={{ width: '70px' }} src={props.icon} />
            <div className="pt-3 text-center">{props.condition}</div>
            <div>{props.icon}</div>
            <div>
                <div className="Temperature">
                    <div className="Cell">
                      <small>High</small>
                      <div>{props.high}°</div>
                    </div>
                    <div className="Cell">
                      <small>Now</small>
                      <div>{props.current}°</div>
                    </div>
                    <div className="Cell">
                      <small>Low</small>
                      <div>{props.low}°</div>
                    </div>
                  </div>
            </div>
          </div>
        )
      }

    const CardList = props => (
    <div>
        {props.cards.map(card => (
        <Card {...card} />
        ))}
    </div>
    )

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
                Current Weather
                <strong className="pt-3 text-light">Current Local Weather</strong>
                {weather != null && weather.main
                 ?  <Card 
                    date={new Date((weather.dt)*1000).toLocaleDateString("en-US")}
                    loc={weather.name}
                    high={weather.main.temp_max}
                    current={weather.main.temp}
                    low={weather.main.temp_min}
                    detail={weather.main}
                    icon={weather.icon}
                    />     
                  : <div>No Weather</div>   
              }
            </div>
        </div>
    );
}

export default Weather