import React, { createContext, useState } from "react";

const CartContext = createContext({ items: [], auth: 'false' });

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], auth: 'true' });


  const addToCart = (item) => {
    setCart((cart) => ({
      items: [...cart.items, item],
      auth: 'true',
    }));
  };
 

  const removeItem = (item) => {
    setCart((cart) => ({
      items: [...cart.items].filter(curr => curr.id !== item.id),
      auth: 'false',
    }));
  };
  return (
    <CartContext.Provider value={{cart, addToCart, removeItem}}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () =>  React.useContext(CartContext);

export {CartProvider, useCart}