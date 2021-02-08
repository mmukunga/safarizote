import React from 'react';
import axios from 'axios';
import Card from './Card';
import { Redirect, useLocation } from "react-router-dom";

const initialState = {
    email: "abc@gmail.com",
    password: ''
};

const reducer = function (state, action) {
    switch(action.type) {
        case 'SET_EMAIL':
            const {name, value} = action.payload;
            return {...state, [name]: value};
        default:
            return state;
    }
}

const SignIn = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const handleChange = (event) => {
        dispatch({type: 'SET_EMAIL', payload: event.target})
    }

    console.log('!!BINGO!!');
    let location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', {
            email: state.email,
            password: state.password
        }).then(response => {
            console.log(response);
            localStorage.setItem('token', response.data);
        });
    }

    const userToken = localStorage.getItem('token');
    console.log('UserToken:= ' + userToken);

    if (userToken !== null) {
        console.log('!!!!userToken!!!! TO:= ' + userToken);
        console.log(userToken);
        console.log('!!!!REDIRECT!!!! TO:= ' + location.state || { from: { pathname: "/" }});
        return <Redirect to={location.state || { from: { pathname: "/" }} } />
    }

    return (
        <Card title="Login" text="Please Login Here!">
        <form  className="form-container" onSubmit={handleSubmit}>
            <div className="row">
            <div class="col-25">     
               <label htmlFor="email">Email</label>
            </div> 
            <div class="col-25"> 
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
            </div> 
            </div>
            <div className="row">
            <div class="col-25">     
                <label htmlFor="password">Password</label>
            </div> 
            <div class="col-25"> 
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
            </div> 
            </div>
            <div className="row">
              <button type="submit">Login</button>
            </div>  
        </form>
        </Card>   
    );
}

export default SignIn;
