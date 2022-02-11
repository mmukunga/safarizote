import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from './pages/Theme';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from "./pages/CartContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
    <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>  
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
