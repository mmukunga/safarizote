import React, { useState, useEffect} from 'react';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Safaris from './pages/Safaris';

function App() {
  const [message, setMessage] = useState("");
  const [customers, setCustomers] =  useState([]);
 
  useEffect(() => {
    axios.get('/api/hello')
      .then(response => {
         console.log(response);
         setMessage(response.data);
      });
  },[])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
          const result = await axios.get('/api/customers');
          console.log(result);
          setCustomers(result.data);
      } catch (e) {
          console.log(e);
      }
    }
    fetchData();
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className="App-title">{message}</h3>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Router>
        <div>
          <ul>
            <li><Link to="/safaris">Safaris</Link></li>
          </ul>
          <Route path="/safaris" component={Safaris} />
        </div>
      </Router>
      <ul>
          {customers.map(customer => 
             <li key={customer.name}>{customer.name}</li>)
          } 
          </ul>
    </div>
  );
}

export default App;
