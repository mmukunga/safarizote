import React, { useState, useEffect } from "react";
import axios from "axios";

const api = "https://rickandmortyapi.com/api/character/";
//http://finance.yahoo.com/webservice/v1/symbols/FB/quote?format=json&view=%E2%80%8C%E2%80%8Bdetail
const Stock = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  

  const Characters = ({ data }) => (
    <ul>
      {data.map(item => (
        <li key={item.id}>
          <dl>
            <dt>Name:</dt>
            <dd>{item.name}</dd>
            <dt>Species:</dt>
            <dd>{item.species}</dd>
            <dt>Status:</dt>
            <dd>{item.status}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    axios.get(api).then(res =>  {
          setIsLoaded(true);
          setItems(res.data);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <Characters data={items} />;
  }
};

export default Stock;
