import React, { useReducer, useEffect, useState } from 'react';
import UserForm, { Select } from "./UserForm";
import axios from 'axios';

const initialState = {
    country: "AF",
    city: "Kabul"
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
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Weather Forecast!!');
        dispatch({ type: "reset" });
    };
    
    const onChange = e => {
      const { name, value } = e.target;
      dispatch({ type: name, value });
    };

    useEffect(() => {
        axios.get('/api/countries').then(response => {
            console.log(response);
            setCountries(response.data);
            console.log('Countries OK!!');
        }).catch(err => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        axios.post('/api/cities', country).then(response => {
            console.log(response);
            setCities(response.data);
            console.log('Cities OK!!');
        }).catch(err => {
            console.log(err);
        });
    }, [state.country]);

    return (       
        <div className="Weather">
            Weather!
            <UserForm
                cancel={() => {console.log('cancel')}}
                errors={[]}
                onChange={onChange}
                submit={handleSubmit}
                elements={() => (
                    <>
                        <Select id="country" name="country" data={countries} text="Country" onChange={onChange}/>
                        <Select id="city" name="country" data={cities} text="City" onChange={onChange}/>                    
                    </>
                )}
                >    
                </UserForm>
        </div>
    )
}

export default Weather