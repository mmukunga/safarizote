import React from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import Card from './Card';

const initialFormData = Object.freeze({
  email: '',
  token: '',
  phone: "12345",
  dateCreated:"2022-01-30T18:35:24.00Z"
});

const Login = () => {
  const [status, setStatus] = React.useState('');
  const [formData, updateFormData] = React.useState(initialFormData);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  const handleChange = (e) => {
    const {name, value} = e.target;
    updateFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state?.path || "/shoppings");
    login(formData).then((response) => {
        setStatus(response.data.token);
        navigate(state?.path || "/shoppings");
    });
  };

  return (
    <Card className="Login" styleProps={{width:'49%'}} title="Login">
    <div className='container'>
    Allowed List - <NavLink to="/allUsers" className="btn btn-link">Click here</NavLink>
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-25">
          <label htmlFor="email">Email</label>
        </div>
        <div className="col-75">
          <input type="text" id="email" name="email" onChange={handleChange} placeholder="Your Email.."/>
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label htmlFor="token">Token</label>
        </div>
        <div className="col-75">
          <input type="text" id="token" name="token" onChange={handleChange} placeholder="Your token.."/>
        </div>
      </div>
      <div className="row">
        <input type="submit" value="Submit"/>
      </div>
    </form>              
        <span style={{color:'red'}}>{status} 
        <NavLink to="/contactUs" className="btn btn-link">Contact Us</NavLink>
        </span>
    </div>  
    </Card>
  )
}

export default Login;