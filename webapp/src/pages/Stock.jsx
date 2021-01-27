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
    const [timestamp, setTimestamp] = useState([]);
    const [close, setClose] = useState([]);
    const [high, setHigh] = useState([]);
    const [low, setLow] = useState([]);
    const [open, setOpen] = useState([]);
    const [volume, setVolume] = useState([]);

    const handleSelectItem = (event) => {
      alert('1.A Ticker was Submitted: ' + event.target.value);
      const { name, value } = event.target;

      console.log('2.A Ticker was Submitted: ' + event.target.value);
      let tickers = state.tickers;
      for (var i = 0; i < tickers.length; i++) { 
        if (event.target.name==tickers[i].name){
          alert('HOOKED..');
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
      event.preventDefault();
      alert('A Ticker was Submitted..');
      let ticker = '';
      const tickers = state.tickers;
      console.log(tickers);

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
        setTimestamp(response.data.chart.result[0].timestamp);
        setClose(response.data.chart.result[0].indicators.quote[0].close);
        setHigh(response.data.chart.result[0].indicators.quote[0].high);
        setLow(response.data.chart.result[0].indicators.quote[0].low);
        setOpen(response.data.chart.result[0].indicators.quote[0].open);
        setVolume(response.data.chart.result[0].indicators.quote[0].volume);
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


    const Quote = ({name, list}) => {
      return (
        <div className="Quote">
          <p>{name}</p>
          <ul style={{listStyle: 'none'}}>
            {list.map((item, idx) => (
              <li key={idx}>{ name === 'Timestamp' ? (new Date(item)).toLocaleDateString() : item.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      );
    };


    return (
        <div className="Stock">
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

        <div id="StockTable">
          <div id="StockRow">
            <div id="timestamp">
              <Quote name="Timestamp" list={timestamp}/>
            </div>
            <div id="close">
              <Quote name="Close" list={close}/>
            </div>
            <div id="low">
              <Quote name="Low" list={low}/>
            </div>
            <div id="high">
              <Quote name="High" list={high}/>
            </div>
            <div id="open">
              <Quote name="Open" list={open}/>
            </div>
            <div id="volume">
              <Quote name="Volume" list={volume}/>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Stock;
