import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from './Card';

const Stocks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stock, setStock] = useState([]);
  const [search, setSearch] = useState();
  const [query, setQuery] = useState('AAPL');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearch({...search, [name]: value});
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      const from = search.from;
      const symbol = search.body;
      axios.get(`/api/stockMarket?From=${from}&Body=${symbol}`).then(response => {
          setStock( (prevState) => [...prevState, ...response.data]);
          setIsLoading(false);
      }).catch(err => {
          console.log(err);
      });
  }

  return (
    <Card className="Stock" styleProps={{width: '98%'}} title="Stock Exchange">
       Search For A Stock. Example. AAPL<br/><br/>
      <div className="container">
      <form onSubmit={handleSubmit}>  
      <div className="row">
          <div className="col-25">
            <label htmlFor="query">Pick your favorite flavor:</label>
          </div>
          <div className="col-75">
          <select id="body" name="body" onChange={handleChange}>
            <option value="NAS.OL">Norwegian Chuttle Oslo</option>
            <option value="AAPL.US">Apple MAC USA</option>
            <option value="TEL.OL">Telenor ASA Oslo</option>
            </select>
          </div>
        </div>     
        <div className="row">
           <input type="submit" value="Submit"/>
        </div>
      </form>  
      </div>     
      <br/><br/>
      {isLoading && <span>Loading... Please allow the system a few seconds to gather all the information</span>}
      {!isLoading &&
        <div className="table">
          <table >
          <thead>
            <tr>
              <th>code</th>
              <th>timestamp</th>
              <th>gmtoffset</th>
              <th>open</th>
              <th>high</th>
              <th>low</th>
              <th>close</th>
              <th>volume</th>
              <th>previousClose</th>
              <th>change</th>
              <th>change_p</th>
            </tr> 
            </thead> 
            <tbody>          
            {stock && stock.map((el,i) => (
              <tr key={i}>
                <td>{el.code}</td>
                <td>{ (new Date(el.timestamp * 1000)).toLocaleString()}</td>
                <td>{el.gmtoffset}</td>
                <td>{el.open}</td>
                <td>{el.high}</td>
                <td>{el.low}</td>
                <td>{el.close}</td>
                <td>{el.volume}</td>
                <td>{el.previousClose}</td>
                <td>{el.change}</td>
                <td>{el.change_p}</td>
              </tr>             
              ))}
            </tbody>  
          </table>
        </div>
      }
    </Card>  
  );
}

export default Stocks;