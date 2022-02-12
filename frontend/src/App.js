import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';
import Safaris from './pages/Safaris';
import NavBar from "./pages/NavBar";
import AboutUs  from './pages/AboutUs';
import FamilieAlbum from './pages/FamilieAlbum';
import Cart  from './pages/Cart';
import ContactUs from './pages/ContactUs';
import Shoppings from './pages/Shoppings';
import Tipping  from './pages/Tipping';
import Users  from './pages/Users';
import Stock  from './pages/Stock';
import Weather  from './pages/Weather';
import Login    from './pages/Login';
import NotFound from './pages/NotFound';
import {RequireAuth} from './pages/RequireAuth';
import {AuthProvider} from './pages/AuthContext';

function usePageViews() {
  let location = useLocation();
  React.useEffect(async() => {
    await axios.get('https://geolocation-db.com/json/').then((res) => {
      const analytics = {
        ...res.data,
        pageView: location.pathname,
        quantity: 1
      };
      const headers = {
        'Content-Type': 'application/json'
      };
      axios.post('/api/saveAnalytics', analytics, headers).then(() => {});
    });  
  }, [location]);
}


function App() {
  
  usePageViews();
  const location = useLocation();
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-content">
      <AuthProvider>
          <NavBar />
          <Routes> 
            <Route exact path='/' element ={<Safaris />} />
            <Route path = '/cart' element = {<Cart />} />
            <Route path = '/aboutUs' element = {<AboutUs />} />
            <Route path = '/weather' element = {<Weather />} />
            <Route path = '/contactUs' element = {<ContactUs />} />
            <Route path = '/shoppings' element = {<RequireAuth redirectTo="/"><Shoppings /></RequireAuth>} /> 
            <Route path = '/tipping' element = {<RequireAuth redirectTo="/"><Tipping /></RequireAuth>} />
            <Route path = '/stock' element = {<RequireAuth redirectTo="/"><Stock /></RequireAuth>}/>
            <Route path = '/familieAlbum' element = {<RequireAuth redirectTo="/"><FamilieAlbum /></RequireAuth>} />
            <Route path = '/allUsers' element = {<Users />} />
            <Route path = '/signIn' element = {<Login location={location}/>} />
          </Routes>
          </AuthProvider>
      </div>
    </div>
  );
}

export default App;
