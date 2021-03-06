import React from 'react';
import axios from 'axios';
import Card from './Card';
import { Redirect } from "react-router-dom";

const initialState = {
    email: "m@gmail.com",
    password: '12345'
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
    const { from } = props.location.state || { from: { pathname: "/" } };

    const handleChange = (event) => {
        dispatch({type: 'SET_EMAIL', payload: event.target})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', {
            email: state.email,
            password: state.password
        }).then(response => {
            console.log('SignIn fromDB:= ' + response);
            alert('adding token');
            localStorage.setItem('token', response.data);
            alert('added token');
        }).catch(error => {
            console.log(error);
        });
    }

    const userToken = localStorage.getItem('token');
    console.log('UserToken:= ' + userToken);

    if (userToken !== null) {
        console.log(userToken);
        console.log('SignIn FROM:= ' + from);
        return <Redirect to={from} />;
    }
    alert('token NOT FOUND!!');
    
    return (
        <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
          Please Login Here!!
          <form class="form-inline" onSubmit={handleSubmit}>
             <input type="email" id="email" name="email" placeholder="Enter email"
                onChange={handleChange}
                required/>
              <input type="password" id="password" name="password" placeholder="Enter password"
                onChange={handleChange}
                required/>
              <button type="submit">Submit</button>
          </form>
        </Card>   
    );
}

export default SignIn;
