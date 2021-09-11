import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Card from './Card';
import UserService from './UserService';

const SignIn = () => {
    const { state } = useLocation();
    const { from } = state || { from: { pathname: "/" } };
    const [loading, setLoading] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [form, setForm] = React.useState({
        email: '',
        password: ''
      });
    const [error, setError] = React.useState(null);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
          username: '',
          password: '',
        };
    
        setLoading(true);
    
        UserService.loginUser(user).then(res => {
            console.log(res);
            localStorage.setItem('access_token', res.token);
            setLoading(false);
            console.log(res);
            setIsLoggedIn(true);
            history.push('/');
          }).catch(err => {
            setError(err.message);
            console.log(err);
            setLoading(false);
          });
    };
    
    const handleChange = (event) => {
        console.log(event.target);
        setForm({...form,
            [event.target.name]: event.target.value});
    }


    if (isLoggedIn) {
        return <Redirect to={from} />;
      }

    return (
        <Card className="InnerCard" fontColor="black">
            Please Login Here!!
            <form class="form-inline" onSubmit={handleSubmit}>
                <input type="email" id="email" name="email" placeholder="Enter email"
                    onChange={handleChange} required />
                <input type="password" id="password" name="password" autocomplete="current-password"
                    onChange={handleChange} required />
                <input type="submit" name="Submit" />
            </form>
        </Card>
    );
}

export default SignIn;