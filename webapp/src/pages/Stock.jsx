import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Stock = () => {
    const [tickers, setTickers] = useState([]);
    const { selectedItems, setSelectedItems } = useState('');

    const handleSelectItem = (e) => {
      const { name, value } = e.target;
      setSelectedItems({ ...selectedItems, [name]: value });
    }

    const handleSubmit = (event) => {
      alert('A Ticker was Submitted: ' + event.target.value);
      event.preventDefault();
    }

    useEffect(() => {
        axios.get('/api/tickers')
            .then(res => {console.log(res);setTickers(res.data)})
            .catch(err => console.log(err))
    }, []);

    return (
        <form onSubmit={handleSubmit} className="StockWrapper">
        <ul className="StockList">
            { tickers.map(ticker =>
              <li key={ticker.id}>              
                <input
                  onChange={handleSelectItem}
                  type="checkbox"
                  checked={selectedItems && selectedItems.includes(ticker.id)}
                  value={ticker.name}
                  id={`item-${ticker.id}`}
                />
                <label htmlFor={`item-${ticker.id}`}>{ticker.description}</label>
              </li>) }
              <li><input type="submit" value="Submit"/></li>
        </ul>
        </form>
    )
}

export default Stock;
