import React from 'react';
import axios from 'axios';
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
        const res = await axios.get('https://geolocation-db.com/json/');
        console.log(res.data);
        return res.data;
    }

    onAuthStateChanged(auth, (user) => {
      const repData = getData();
      console.log(repData);
      localStorage.setItem('ip', repData.IPv4);
      setCurrentUser(user)
     })
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
