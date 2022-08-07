import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Routes, Route} from "react-router-dom";
import { AuthProvider } from './pages/AuthProvider';
import { SafariContextProvider } from "./pages/SafariContext";
import { ThemeProvider } from "./pages/ThemeProvider";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './pages/firebase'
import './App.css';

import Safaris from './pages/Safaris';
import AboutUs from './pages/AboutUs';
import Cart from './pages/Cart';
import Navbar from './pages/NavBar';
import Tipping from './pages/Tipping';
import Shopping from './pages/Shoppings';
import ContactUs from './pages/ContactUs';
import StockList from './pages/StockList';
import BackUp from './pages/BackUp';
import Weather from './pages/Weather';
import Login from './pages/Login';
import AppLogger from './pages/AppLogger';
import Register from './pages/Register';
import {ProtectedRoute} from './pages/ProtectedRoute';

const App = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [timeActive, setTimeActive] = React.useState(false);

  React.useEffect(() => {
    const getData = async()=>{
      axios.get('https://geolocation-db.com/json/').then((response) => {
        console.log(response);
        const data = { ...response.data };
        let analytics = {
          ipv4: data.IPv4,
          city: data.city,
          countryCode: data.country_code,
          countryName: data.country_name,
          latitude: data.latitude,
          longitude: data.longitude,
          postal: data.postal,
          state: data.state
        };
        axios.post('/api/findByIPv4', {ipv4: analytics.ipv4})
             .then(response => {
              console.log(response);
              if (response.data && response.data[0].ipv4 == analytics.ipv4) {
                 analytics = { id: response.data[0].id, ...analytics, dateCreated: moment() };  
              }
              axios.post('/api/saveAnalytics', analytics)
                 .then(response => localStorage.setItem('user', response));
              });
      });
    }

    onAuthStateChanged(auth, (user) => {
      getData();    
      setCurrentUser(user);
    });
  }, []);

    return (
      <>  
          <SafariContextProvider>
          <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
          <ThemeProvider><Navbar/></ThemeProvider>
              <Routes>
                  <Route path='/' element={<Safaris />} />
                  <Route path="/contactUs" element={<ContactUs/>} />
                  <Route path="/aboutUs" element={<AboutUs/>} />
                  <Route path="/shoppings" element={ <ProtectedRoute><Shopping/></ProtectedRoute>} />
                  <Route path="/tipping" element={ <ProtectedRoute><Tipping/></ProtectedRoute>} />
                  <Route path="/backUps" element={ <ProtectedRoute><BackUp/></ProtectedRoute>} />
                  <Route path="/stocks" element={ <ProtectedRoute><StockList/></ProtectedRoute>} />
                  <Route path="/errorLog" element={ <ProtectedRoute><AppLogger/></ProtectedRoute>} />
                  <Route path="/cart" element={<Cart cartItems={cartItems}/>} />
                  <Route path="/weather" element={<Weather/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
              </Routes>    
          </AuthProvider>  
          </SafariContextProvider>
      </>
  )
}

export default App;
