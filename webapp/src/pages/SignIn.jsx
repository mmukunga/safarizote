import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { Redirect } from "react-router-dom";

const initialState = {
    email: '',
    password: '',
    token: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            const { name, value } = action.payload;
            return { ...state, [name]: value };
        case 'SET_TOKEN':
            const loginToken = action.payload.token;
            return { ...state, token: loginToken };    
        default:
            return state;
    }
}

const SignIn = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [count, setCount] = useState(0);

    const { from } = props.location.state || { from: { pathname: "/" } };

    const handleChange = (event) => {
        dispatch({ type: 'SET_EMAIL', payload: event.target })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('/api/login', {
            email: state.email,
            password: state.password
        }).then(response => {
            console.log(response);
            dispatch({ type: 'SET_TOKEN', payload: response.data })
        }).catch(error => {
            console.log(error);
        });

        localStorage.setItem('userAuth', state);

        setCount(prevCount => prevCount + 1);
        console.log('counter count:= ' + count);       
    };

    if (localStorage.getItem('userAuth') != null) {
        const userAuth = localStorage.getItem('userAuth');
        axios.post('/api/verify', {
            token: userAuth.token,
            uasername: userAuth.email
        }).then(response => {
            console.log('1.verify..');
            console.log(response);
            console.log(response.data);
            console.log('2.verify..');
        }).catch(error => {
            console.log(error);
        });

        return <Redirect to={from} />;
    }

    return (
        <Card className="InnerCard" fontColor="black">
            Please Login Here!!
            <form class="form-inline" onSubmit={handleSubmit}>
                <input type="email" id="email" name="email" placeholder="Enter email"
                    onChange={handleChange} required />
                <input type="password" id="password" name="password" placeholder="Enter password"
                    onChange={handleChange} required />
                <input type="submit" name="Submit" />
            </form>
        </Card>
    );
}

export default SignIn;