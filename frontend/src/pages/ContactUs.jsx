import React from 'react';
import Card from './Card';
import axios from "axios";


const initialState = { 
  username: '',email: '',
  phone: '', gender: '',message: ''
}


const ContactUs = () => {
  const [userInfo, setUserInfo] = React.useState(initialState);
  const [errors, setErrors] = React.useState('');
  const [status, setStatus] = React.useState('');

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name  = target.name;
    setUserInfo(prev => ({ ...prev, [name]: value }));

  };

  const handleSubmit =(event) => {
    const username = userInfo.username;
    event.preventDefault();
     
    if ( !userInfo.username 
      || !userInfo.email 
      || !userInfo.gender 
      || !userInfo.message ) {
         setStatus("Please fill all fields" );
    }

      const headers = {
        "Content-type": "application/json"
      };

      axios.post('/api/contactUs', userInfo, headers).then((response) => {
        setUserInfo({...userInfo, userData: response.data});
        setStatus('Message status:= ' + response.status);
      })
  };

  return (
    <Card className="Contact" styleProps={{width:'98%'}} title="Contact Us">
      <div className="container">
      {status && <div style={{color:'red'}}>{status}</div>}
      <form onSubmit={handleSubmit}>
        <h3>{userInfo.value}</h3>
        <div className="row">
          <div className="col-25">
            <label htmlFor="username">Name</label>
          </div>
          <div className="col-75">
            <input type="text" id="username" name="username" onChange={handleChange} placeholder="Your name.."/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="email">Your Email</label>
          </div>
          <div className="col-75">
            <input type="email" id="email" name="email" onChange={handleChange} placeholder="Show message.."/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="phone">Your Phone</label>
          </div>
          <div className="col-75">
            <input type="phone" id="phone" name="phone" onChange={handleChange} placeholder="Show message.."/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="gender">Gender</label>
          </div>
          <div className="col-75">
            <select name="gender" onChange={handleChange}>
              <option value="M">Man</option>
              <option value="F">Lady</option>
              <option value="O">Other</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="message">Message</label>
          </div>
          <div className="col-75">
            <textarea id="message" name="message" onChange={handleChange} placeholder="Write something.." style={{height:'200px'}}></textarea>
          </div>
        </div>
        <div className="row">
          <input type="submit" value="Submit"/>
        </div>
      </form>
      </div>
    </Card>
  )
};

export default ContactUs;