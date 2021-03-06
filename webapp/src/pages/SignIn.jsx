import React from 'react';
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
    const { from } = props.location.state || { from: { pathname: "/" } };
    console.log('d1.AboutUs');
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
            console.log('adding token');
            console.log(response);
            console.log(response.data);
            localStorage.setItem('token', state.email);
            console.log('added token');
            console.log(localStorage.getItem('token'));
            console.log('added token OK');
        }).catch(error => {
            console.log(error);
        });
    }

    console.log('1.MAJI');
    console.log(localStorage.getItem('token'));
    console.log('2.MAJI');

    const userToken = localStorage.getItem('token');
    console.log('UserToken:= ' + userToken);
    console.log('STATE:= '  + state);
    console.log('1.FROM:= ' + from);
    console.log(from);
    console.log('2.FROM:= ' + from);

    if (userToken !== null) {
        console.log(userToken);
        console.log('SignIn FROM:= ' + from);
        return <Redirect to={from} />;
    }  
    console.log('token NOT FOUND!!');
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
