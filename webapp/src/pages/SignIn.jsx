import React from 'react';
import axios from 'axios';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', {
            email: email,
            password: password
        }).then(response => {
            console.log(response)
        });
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    required
                />
              </div>
              <button type="submit">Login</button>  
            </form>
        </div>
    );
}

export default SignIn;
