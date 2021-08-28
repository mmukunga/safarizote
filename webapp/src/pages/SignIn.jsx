import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { Redirect } from "react-router-dom";

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
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [count, setCount] = useState(0);
    const [verified, setVerified] = useState(false);
    const [loginData, setLoginData] = useState({});

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
            const userAuth = {
               email: response.data.email,
               password: response.data.password,
               token: response.data.token,
               dateCreated: new Date()
            };
            dispatch({ type: 'SET_TOKEN', payload: userAuth });
            localStorage.setItem('userToken', response.data.token);
            console.log(userAuth);
            setCount(prevCount => prevCount + 1);
            setLoginData({...userAuth});
            console.log('counter count:= ' + count); 
        }).catch(error => {
            console.log(error);
        });      
    };
    
    React.useEffect(() => {
        console.log('1.SignIn..');
        console.log(localStorage.getItem('userToken'));
        console.log(loginData);
        console.log('2.SignIn..');
        if (state.email != '' && localStorage.getItem('userToken') != null) {
            console.log('3A.SignIn..');
            const token = localStorage.getItem('userToken');
            console.log('3B.SignIn..');
            console.log(token);
            console.log('3C.SignIn..');           
            console.log(state.email);
            console.log(loginData);  
            const userAuth = {
                email: state.email,
                password: state.password,
                token: token,
                dateCreated: new Date()
            };
            console.log(userAuth);            
            axios.post('/api/verify', userAuth).then(response => {
                console.log('1.verify..');
                console.log(response);
                console.log(response.data);
                setVerified(true);
                console.log('2.verify..');
                return <Redirect to={from} />;
            }).catch(error => {
                console.log('1.ERROR..');
                console.log(error);
                console.log('2.ERROR..');
            });
            
        }
    }, [loginData]); // Only re-run the effect if count changes

    if (verified) {
        console.log('1.VERIFIED!!');
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