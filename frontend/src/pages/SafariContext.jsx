import React, { useReducer } from "react";
import { cartReducer } from "./CartReducer";
import axios from 'axios';

const fetchSafaris = async() => {
  return axios.get('/api/safaris');
}

export const SafariContext = React.createContext();

export const SafariContextProvider = ({ children }) => {
  const [safaris, setSafaris] = React.useState([]);
  const [cartState, dispatch] = useReducer(cartReducer, { cart: [] });

  React.useEffect(() => {
    fetchSafaris().then((response) => {
      setSafaris(response.data);
      console.log(safaris);
    });
  }, []);

  const addToCart = safari => {
    setTimeout(() => {
      dispatch({ type: 'ADD_TO_CART', safari: safari });
    }, 700);
  };

  const removeFromCart = safariId => {
    setTimeout(() => {
      dispatch({ type: 'REMOVE_FROM_CART', safariId: safariId });
    }, 700);
  };

  const values = {
    safaris: safaris,
    cart: cartState.cart,
    addToCart: addToCart,
    removeFromCart: removeFromCart
  }
 
  return (
    <SafariContext.Provider value={values}>
      {children}
    </SafariContext.Provider>
  );
};
