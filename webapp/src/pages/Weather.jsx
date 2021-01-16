import React, { useState, useEffect, useReducer } from 'react';
import UserForm, { Select } from "./UserForm";
import axios from 'axios';

const initialState = {
    country: {},
    city: {}
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
        axios.get('/api/countries')
            .then(res => setCountries(res.data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get('/api/cities', state.country)
            .then(res => setCities(res.data))
            .catch(err => console.log(err))
    }, [state.country]);

    console.log(state.county);

    return (
        <div className="Weather">
            Weather!
            Country: {state.country} City: {state.city}
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
    );
}

export default Weather