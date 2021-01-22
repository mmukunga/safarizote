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
          <div style={{ margin: '1em' }}>
            <img alt="avatar" style={{ width: '70px' }} src={props.icon} />
            <div>
              <div style={{ fontWeight: 'bold' }}>{props.loation}</div>
              <div>{props.date}</div>
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
            
            <div>
                Current Weather
                <strong className="pt-3 text-light">Current Local Weather</strong>
                <div className="day-container">
                <Card 
                    date={weather.when.split(',')}
                    loc={weather.location}
                    detail={weather.detail}
                    icon={weather.icon}
                    high={weather.temp_max}
                    current={weather.temp}
                    low={weather.temp_min}
                />
                </div>
            </div>
            <div>
                Weather Forecast
                <CardList cards={cards} />
            </div>
        </div>
    );
}

export default Weather