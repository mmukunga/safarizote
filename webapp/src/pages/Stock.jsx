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
            .then(res => setTickers(res.data))
            .catch(err => console.log(err))
    }, []);

    return (
        <form> onSubmit={handleSubmit}
        <ul className="StockList">
            { tickers.map(ticker =>
              <li key={ticker.id}>              
                <input
                  onChange={handleSelectItem}
                  type="checkbox"
                  checked={selectedItems.includes(ticker.id)}
                  value={ticker.name}
                  id={`item-${ticker.id}`}
                />
                <label htmlFor={`item-${ticker.id}`}>{ticker.description}</label>
              </li>) }
        </ul>
        <input type="submit" value="Submit"/>
        </form>
    )
}

export default Stock;
