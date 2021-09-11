import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { Redirect, useLocation } from "react-router-dom";

const initialState = {
    email: '',
    password: '',
    token: '',
    dateCreated: new Date()
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            const { name, value } = action.payload;
            return { ...state, [name]: value };
        case 'SET_TOKEN':
            const loginData = action.payload;
            return { ...state, loginData };    
        default:
            return state;
    }
}

const SignIn = (props) => {
    const { location } = useLocation();
    const { from } = location || { from: { pathname: "/" } };
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);

    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [count, setCount] = useState(0);
    const [verified, setVerified] = useState(false);
    const [loginData, setLoginData] = useState({});

    const login = () => {
        fakeAuth.authenticate(() => {
          setRedirectToReferrer(true);
        });
      };
    
    if (redirectToReferrer) {
    return <Redirect to={from} />;
    }

    const fakeAuth = {
        isAuthenticated: false,
        authenticate(cb) {
          this.isAuthenticated = true;
          setTimeout(cb, 100);
        }
      };

    const handleChange = (event) => {
        dispatch({ type: 'SET_EMAIL', payload: event.target })
    }


    return (
        <Card className="InnerCard" fontColor="black">
            Please Login Here!!
            <form class="form-inline" onSubmit={login}>
                <input type="email" id="email" name="email" placeholder="Enter email"
                    onChange={handleChange} required />
                <input type="password" id="password" name="password" autocomplete="current-password"
                    onChange={handleChange} required />
                <input type="submit" name="Submit" />
            </form>
        </Card>
    );
}

export default SignIn;