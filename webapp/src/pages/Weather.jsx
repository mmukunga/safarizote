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
            .then(res => {
                console.log(res);
                let array_nodes = [];
                res.data.forEach(function(d) {
                   array_nodes.push({
                     id: d.id,   
                     title: d.name,
                     value: d.code
                   });
                 });    
                 console.log(array_nodes);
                setCountries(array_nodes);
            }).catch(err => console.log(err))
    }, []);

    useEffect(() => {
        let country = {name: 'Afghanistan', code: 'AF', cities: null};
        axios.post('/api/cities', country)
            .then(response => {
                console.log(response);
                let array_nodes = [];
                res.data.forEach(function(d) {
                   array_nodes.push({  
                     id: d.id,  
                     title: d.country,
                     value: d.name
                   });
                 });    
                console.log(array_nodes);
                setCities(array_nodes);
            }).catch(err => console.log(err))
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
    );
}

export default Weather