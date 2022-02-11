import React from 'react';
import { CartProvider } from "./CartContext";
import Safaris from './Safaris';
import Card from './Card';

const Home = () => (
  <Card className="Home" styleProps={{width:'98%'}} title="Home">
   <CartProvider>
      <Safaris />
    </CartProvider>
  </Card>
);

export default Home;