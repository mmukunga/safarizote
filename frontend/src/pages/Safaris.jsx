import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import Safari from './Safari';
import Card from './Card';
import Pagination from './Pagination';
import Checkout from './Checkout';

import { useCart } from "./CartContext";;

const Safaris = () => {
  const [error, setError] = useState(null);
  const [safaris, setSafaris] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const { cart } = useCart();
  const [show, setShow] = React.useState(false);

  const httpClient = axios.create({baseURL: '/api', timeout: 1000});
  const getSafaris = () => httpClient.get('/safaris');

  const showModal = () => {
    setShow({ show: !show });
  };


  
  const MainCart = props => (<><NavLink to="/cart">Cart({props.cartItemNumber})🛒</NavLink></>);

  const cartItemNumber = ({cart})  => {
    const total = cart.items.reduce((curr, next) => curr.quantity + next.quantity);
    return cart.items.length;
  }

  useEffect(() => {
    async function fetchSafaris() {
      try {
        const { data } = await getSafaris();
        setSafaris(data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch safaris');
      }
    }

    fetchSafaris();
  }, []);
  
  return (
    <Card className="Safaris" styleProps={{width:'98%'}} title="Safari Tours">
      <MainCart cartItemNumber={cart.items.reduce((count, curItem) => {
              return count + curItem.quantity;
            }, 0)}/>
      {error && <h4 className="error">{error}</h4>}
      {safaris && safaris.length > 0 ? (
                <Pagination
                  data={safaris}
                  RenderComponent={Safari}
                  title="Safaris"
                  pageLimit={5}
                  dataLimit={2}
                />
            ) : (
            <h1>No Photos to display</h1>
            )}

      {loading ? (
        <p>Fetching todos</p>
      ) : (
        <p data-testid="safaris-size">There are {safaris && safaris.length} safaris
          <Checkout show={show} handleClose={showModal}/>
          <button type="button" onClick={showModal}>Open</button>
        </p>
      )}


    </Card>
  );
};

export default Safaris;