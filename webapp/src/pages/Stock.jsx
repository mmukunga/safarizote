import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'

const initialState = {
  error: "",
  tickers: [],
  ticker: ''
};

const reducer = (state, action) => {
  switch (action.type) {
      case 'SET_DATA':
        return {
            ...state,
            error: '',
            tickers: [...action.payload],
        }
        case 'SET_TICKER':
          return {
              ...state,
              error: '',
              ticker:action.payload,
          }  
      case 'SET_ERROR':
        return {
            ...state,
            error: "There are some errors",
            tickers: [],
        }
      default:
        return state;
  }
}

const Stock = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //const [tickers, setTickers] = useState([]);
    const [timestamp, setTimestamp] = useState([]);
    const [close, setClose] = useState([]);
    const [high, setHigh] = useState([]);
    const [low, setLow] = useState([]);
    const [open, setOpen] = useState([]);
    const [volume, setVolume] = useState([]);
    const [dateTime, setDateTime] = useState('');
    const [stockCompany, setStockCompany] = useState('');
    //const [ticker, setTicker] = useState('');

    const handleSelectItem = (event) => {
      const { name, value } = event.target;

      let tickers = state.tickers;
      for (var i = 0; i < tickers.length; i++) { 
        if (event.target.name===tickers[i].name) {
            tickers[i].selected=true;
            setStockCompany(tickers[i].description);
        } else {
            tickers[i].selected=false;
        }
      }
      dispatch({ type: 'SET_DATA', payload: tickers });
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      let ticker = '';
      const tickers = state.tickers;

      for (var i = 0; i < tickers.length; i++) { 
          if (tickers[i].selected==true){
              ticker = tickers[i];
          }
      }
  
      dispatch({ type: 'SET_TICKER', payload: tickers[i] });

      axios.post('/api/current', ticker).then((response) => {
        setDateTime(response.headers.date);
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
              dispatch({ type: 'SET_DATA', payload: res.data });
            })
            .catch(err => {
              console.log(err);
              dispatch({ type: 'SET_ERROR' });
            });
    }, []);

    const Quote = ({name, list}) => {
      return (
        <div className="QuoteContainer">
          <p>{name}</p>
          <ul className="QuoteItems">
            {list.map((item, idx) => (
              <li key={idx}>{ name === 'Timestamp' ? (new Date(item*1000)).toLocaleDateString() : item.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      );
    };

    console.log('stockCompany:= ' + stockCompany);
    
    return (
        <div className="Stock">
        <form onSubmit={handleSubmit} className="StockWrapper">
        <ul className="StockList">
            { state.tickers && state.tickers.map(ticker =>
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
        <p>{stockCompany} {dateTime}</p>
        <div className="StockTable">
          <div className="StockRow">
              <Quote name="Timestamp" list={timestamp}/>
              <Quote name="Close" list={close}/>
              <Quote name="Low" list={low}/>
              <Quote name="High" list={high}/>
              <Quote name="Open" list={open}/>
              <Quote name="Volume" list={volume}/>
          </div>
        </div>
      </div>
    )
}

export default Stock;
