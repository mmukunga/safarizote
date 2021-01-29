import React from 'react';
import axios from 'axios';
import Card from './Card';

const initialState = {
    name: '',
    email: "abc@gmail.com",
    phone: '',
    message: ''
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

const Email = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    const handleChange = (event) => {
        dispatch({type: 'SET_EMAIL', payload: event.target})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/email', {
            email: email,
            message: message
        }).then(response => {
            console.log(response)
        });
    }
    return (
        <Card title="ContactUs" text="Contact Us">
        <h1>Contact Us!</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
                type="name"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
                type="phone"
                className="form-control"
                name="phone"
                onChange={handleChange}
            />
            </div>
            <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" 
                placeholder="Write something.." 
                className="form-control"
                onChange={handleChange}
            />
            </div>
            <button type="submit">Send</button>  
        </form>
        </Card>   
    );
}

export default Email;