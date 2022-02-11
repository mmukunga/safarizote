import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Shopping from './Shopping';
import Card from './Card';

const Shoppings = () => {
  const [error, setError] = useState(null);
  const [shoppings, setShoppings] = useState([]);
  const [shopping, setShopping] = React.useState({});
  const [formStatus, setFormStatus] = React.useState('');

  const httpClient = axios.create({baseURL: '/api', timeout: 1000});
  const getShoppings = () => httpClient.get('/shoppings');


  const handleChange = e => {
    const { name, value } = e.target;
    setShopping(prevState => ({ ...prevState, [name]: value }));
};

const handleSubmit = e => {
  e.preventDefault();
  setShoppings(prevState => ([...prevState, shopping]));
  
  const formData = new FormData();
  Object.entries(shopping).forEach(([key, value]) => {
      formData.append(key, value);
  });

  axios.post('/api/shoppings', formData)
       .then(function (response) {
      setFormStatus(response.data.statusText);
      if (response.status===200) {
        setFormStatus("Your Message has been Sent.");
      } else {
        setFormStatus("ERROR");
      }
      setShopping({
          product: "",
          shop: "",
          price: ""
      });
  }).catch(function (error) {
      console.log(error);
  });

};

  useEffect(() => {
    getShoppings().then(response => {
      setShoppings(response.data);
    });
  }, []);

  return (
    <Card className="Shoppings" styleProps={{width:'98%'}} title="Shopping">
     <div className='container'>
           <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="product">Product</label>
                </div>
                <div className="col-75">
                   <input type="text" id="product" name="product" onChange={handleChange}/>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="shop">Shop</label>
                </div>
                <div className="col-75">
                    <select id="shop" name="shop" onChange={handleChange}>
                      <option value="JOKA FRYSJA">Joka</option>
                      <option value="IKEA Furuset">IKEA Furuset</option>
                      <option value="ICA">ICA</option>
                      <option value="REMA 1000">REMA 1000</option>
                    </select>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="price">Price</label>
                </div>
                <div className="col-75">
                  <input type="text" id="price" name="price" onChange={handleChange}/>
                </div>
              </div>
              <div className="row">
                  <input type="submit" data-testid="Add To List" value="Add To List"/>
              </div>
            </form>
        <h2 className="shoppinglist">Shopping List</h2>
        {error && <h4 className="error">{error}</h4>}
        {shoppings && shoppings.map((shopping, idx) => (
          <Shopping shopping={shopping} key={idx} />
        ))}
      </div>
    </Card>
  );
};

export default Shoppings;