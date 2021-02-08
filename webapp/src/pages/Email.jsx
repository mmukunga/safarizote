import React from 'react';
import axios from 'axios';
import Card from './Card';

const initialState = {
    name: "Simon Mukunga",
    email: "mkunsim@gmail.com",
    phone: '212 212 212',
    message: 'Email- Just Testing!! Great Stuff!!'
};

const reducer = function (state, action) {
    switch(action.type) {
        case 'SET_EMAIL':
            const {name, value} = action.payload;
            return {...state, [name]: value};
        case 'RESET_ALL':
            return {...state, ...action.payload};    
        default:
            return state;
    }
}

const Email = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [replyMsg, setReplyMsg] = React.useState('Reply Message');

    const handleChange = (event) => {
        dispatch({type: 'SET_EMAIL', payload: event.target});
    }

    const clearState = () => {
       dispatch({type: 'RESET_ALL', payload: initialState});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/email', {
            name: state.name,
            email: state.email,
            phone: state.phone,
            message: state.message
        }).then(response => {
            console.log(response);
            setReplyMsg(response.data);
            clearState();
        });
    }
    return (
        <Card title="ContactUs" text="Contact Us">
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="row">
            <div className="col-25">      
                <label htmlFor="name">Name</label>
            </div> 
            <div className="col-75">  
                <input
                    type="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />
            </div> 
            </div>
            <div className="row">
            <div className="col-25">      
                <label htmlFor="email">Email</label>
            </div> 
            <div className="col-75">  
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
            <div className="col-25">      
                <label htmlFor="phone">Phone</label>
            </div> 
            <div className="col-75"> 
                <input
                    type="phone"
                    className="form-control"
                    name="phone"
                    onChange={handleChange}
                />
            </div> 
            </div>
            <div className="row">
            <div className="col-25">      
                <label htmlFor="message">Message</label>
            </div> 
            <div className="col-75">  
                <textarea id="message" name="message"
                    className="expand" 
                    rows="5" 
                    cols="33" 
                    placeholder="Write something.." 
                    className="form-control"
                    onChange={handleChange}
                />
            </div> 
            </div>
            <div className="row">
               <button type="submit">Send</button>
            </div>  
        </form>
        </Card>   
    );
}

export default Email;