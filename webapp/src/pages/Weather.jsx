import React, { useEffect, useState } from 'react';
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
    const [state, dispatch] = useReducer(reducer, initialState);
    const { country, city } = state;

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
        axios.get('/api/cities')
            .then(res => setCountries(res.data))
            .catch(err => console.log(err))
    }, [country]);

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
            { data.map(item => <h1 key={item._id}>{item.title}</h1>) }
        </div>
    )
}

export default Weather