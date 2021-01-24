import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Stock = () => {
    const [tickers, setTickers] = useState([]);
    const { items, selectedItems } = useState('');

    const handleSelectItem = (e) => {
      const { name, value } = e.target;
      selectedItems({ ...items, [name]: value });
    }

    useEffect(() => {
        axios.get('/api/tickers')
            .then(res => setTickers(res.data))
            .catch(err => console.log(err))
    }, []);

    return (
        <ul>
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
    )
}

export default Stock;
