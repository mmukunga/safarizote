import React, {useState} from 'react';
import axios from 'axios';
import Card from './Card';
import { Redirect } from "react-router-dom";

const initialState = {
    email: '',
    password: ''
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_EMAIL':
            const {name, value} = action.payload;
            return {...state, [name]: value};
        default:
            return state;
    }
}

const SignIn = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [count, setCount] = useState(0);

    const nameEl = React.useRef(null);
    const { from } = props.location.state || { from: { pathname: "/" } };

    const handleChange = (event) => {
        dispatch({type: 'SET_EMAIL', payload: event.target})
    }

    const handleSubmit = e => {
      e.preventDefault();
      alert(nameEl.current.value);
      setCount(prevCount => prevCount + 1);
    };
    
    console.log('HER:= ' + nameEl);   
    console.log('COUNT:= ' + count);
    console.log('FROM:= '  + from);

    if (count > 5) {
        const userToken = localStorage.getItem('token');
        console.log(userToken);
        console.log(state);
        console.log('SignIn FROM:= ' + from);
        return <Redirect to={from} />;
    }  

    return (
       <form onSubmit={handleSubmit}>
         <label>Name:
           <input type="text" ref={nameEl} />
         </label>
         <input type="email" id="email" name="email" placeholder="Enter email"
            onChange={handleChange} required/>
         <input type="password" id="password" name="password" placeholder="Enter password"
            onChange={handleChange} required/>
         <input type="submit" name="Submit" />
       </form>
     );
  }


  export default SignIn;