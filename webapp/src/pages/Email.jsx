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
            name: state.name,
            email: state.email,
            phone: state.phone,
            message: state.message
        }).then(response => {
            console.log(response)
        });
    }
    return (
        <Card title="ContactUs" text="Contact Us">
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
            <div class="col-25">      
                <label htmlFor="name">Name</label>
            </div> 
            <div class="col-25">  
                <input
                    type="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />
            </div> 
            </div>
            <div className="form-group">
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
            <div className="form-group">
            <div class="col-25">      
                <label htmlFor="phone">Phone</label>
            </div> 
            <div class="col-25"> 
                <input
                    type="phone"
                    className="form-control"
                    name="phone"
                    onChange={handleChange}
                />
            </div> 
            </div>
            <div className="form-group">
            <div class="col-25">      
                <label htmlFor="message">Message</label>
            </div> 
            <div class="col-25">  
                <textarea id="message" name="message" 
                    placeholder="Write something.." 
                    className="form-control"
                    onChange={handleChange}
                />
            </div> 
            </div>
            <div className="form-group">
               <button type="submit">Send</button>
            </div>  
        </form>
        </Card>   
    );
}

export default Email;