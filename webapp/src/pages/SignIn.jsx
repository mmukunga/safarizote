import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { Redirect } from "react-router-dom";

const initialState = {
    email: '',
    password: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            const { name, value } = action.payload;
            return { ...state, [name]: value };
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
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });

        setCount(prevCount => prevCount + 1);
        localStorage.setItem('token', state.email + count);
    };

    console.log('COUNT:= ' + count);
    console.log('FROM:= ' + from);

    if (localStorage.getItem('token') != null) {
        const userToken = localStorage.getItem('token');
        console.log(userToken);
        console.log(state);
        console.log('..1.SignIn FROM..');
        console.log(from);
        console.log('..2.SignIn FROM..');
        return <Redirect to={from} />;
    }

    return (
        <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
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