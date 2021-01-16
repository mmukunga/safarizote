import React, { useState, useEffect, useReducer } from 'react';
import UserForm, { Select } from "./UserForm";
import axios from 'axios';

   const initialState = {
       country: {
           name:'Afghanistan', 
           code:'AF'
       },
       city: {
           country: 'AF', 
           name: 'Kabul'
       }
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
                     name: d.name,
                     id: d.code
                   });
                 });    
                 console.log(array_nodes);
                //setCountries(array_nodes);
            }).catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get('/api/cities', state.country)
            .then(res => {
                console.log(res);
                let array_nodes = [];
                res.data.forEach(function(d) {
                   array_nodes.push({ 
                     country: d.country, 
                     id: d.id,  
                     name: d.name
                   });
                 });    
                 console.log(array_nodes);
                 //setCities(array_nodes);
            }).catch(err => console.log(err))
    }, [state.country]);

    //console.log(countries);
    //console.log(cities);

    return (
        <div className="Weather">
            Weather!
            Country: {state.country} City: {state.city}
        </div>
    );
}

export default Weather