import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'

const initialState = {
  error: "",
  tickers: []
};

const reducer = (state, action) => {
  switch (action.type) {
      case 'SET_DATA':
        return {
            ...state,
            loading: false,
            tickers: [...action.payload],
        }
      case 'SET_ERROR':
        return {
            ...state,
            loading: false,
            error: "There are some errors",
            tickers: [],
        }
      default:
        return state;
  }
}

const Stock = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [tickers, setTickers] = useState([]);
    const [ selectedItems, setSelectedItems ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState('');

    const handleSelectItem = (event) => {
      alert('1.A Ticker was Submitted: ' + event.target.value);
      const { name, value } = event.target;
      setSelectedItem({ ...selectedItems, [name]: value });
      setSelectedItems(value);
      console.log('2.A Ticker was Submitted: ' + event.target.value);
      let tickers = state.tickers;
      for (var i = 0; i < tickers.length; i++) { 
        if (event.target.name==tickers[i].name){
            tickers[i].selected=true;
        } else {
            tickers[i].selected=false;
        }
      }
      console.log('3.A Ticker was Submitted: ' + event.target.value);
      dispatch({ type: 'SET_DATA', payload: tickers });
      console.log('4.A Ticker was Submitted: ' + event.target.value);
    }

    const handleSubmit = (event) => {
      alert('A Ticker was Submitted: ' + event.target.value);
      event.preventDefault();
      console.log('SelectedItem:= ' + selectedItem);

      const { value } = event.target.value;
      
      let ticker = '';
      const tickers = state.tickers;
      for (var i = 0; i < tickers.length; i++) { 
          if (tickers[i].selected==true){
            console.log('4.A Ticker was FOUND: ' + event.target.value);
              ticker = tickers[i];
          }
      }
      console.log('5.A Ticker TO SUBMIT..');
       axios.post('/api/current', ticker).then((response) => {
        console.log('4.A Ticker was SUBMITED..');
          console.log(response);
       }).catch(function (error) {
          console.log(error);
       }) 

    }

    useEffect(() => {
        axios.get('/api/tickers')
            .then(res => {
              console.log(res);
              setTickers(res.data);
              dispatch({ type: 'SET_DATA', payload: res.data });
            })
            .catch(err => {
              console.log(err);
              dispatch({ type: 'SET_ERROR' });
            });
    }, []);

    return (
        <form onSubmit={handleSubmit} className="StockWrapper">
        <ul className="StockList">
            { tickers.map(ticker =>
              <li key={ticker.id}>              
                <input id={ticker.id} name={ticker.name}
                  type="checkbox"
                  onChange={handleSelectItem}
                  checked={ticker.selected} 
                />
                <label htmlFor={`item-${ticker.id}`}>{ticker.description}</label>
              </li>) }
              <li><input type="submit" value="Submit"/></li>
        </ul>
        </form>
    )
}

export default Stock;
