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
            const userLogin = {
               email: response.data.email,
               password: response.data.password,
               token: response.data.token
            };
            dispatch({ type: 'SET_TOKEN', payload: userLogin });
            localStorage.setItem('userAuth', userLogin);
        }).catch(error => {
            console.log(error);
        });

        setCount(prevCount => prevCount + 1);
        console.log('counter count:= ' + count);       
    };
    
    console.log('1.SignIn..');
    console.log(localStorage.getItem('userAuth'));
    console.log('2.SignIn..');

    if (localStorage.getItem('userAuth') != null) {
        console.log('3A.SignIn..');
        const userAuth = localStorage.getItem('userAuth');
        console.log('3B.SignIn..');
        console.log(userAuth);
        console.log(userAuth.username);
        console.log(userAuth.password);
        console.log(userAuth.token);
        console.log('3C.SignIn..');
        if (typeof(userAuth.token) !== 'undefined') {
            axios.post('/api/verify', {
                token: userAuth.token,
                username: userAuth.email
            }).then(response => {
                console.log('1.verify..');
                console.log(response);
                console.log(response.data);
                console.log('2.verify..');
                return <Redirect to={from} />;
            }).catch(error => {
                console.log('1.ERROR..');
                console.log(error);
                console.log('2.ERROR..');
            });
        }  
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