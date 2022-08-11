import React, { useState } from "react";
import axios from 'axios';
import moment from 'moment';
import { SelectWrapper, Submit } from "./Components";
import { SmartForm } from './SmartForm';
import Card from "./Card";

const defaultValues = {
  label: 'XXL', value: 'XXL', icon: '📈'
};

const StockList = () => {
  const [state, setState] = useState("Pristine");
  const [options, setOptions] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  //const url = "https://finnhub.io/api/v1/quote?";
  React.useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    setCurrentUser(currentUser);

  }, []);

  React.useEffect(() => {
    setLoading(true);
    const fetchOptions = async() => {
      const response = await axios.get("/api/getOptions").then((response) => {
        setLoading(false);
        return response;
      });
      setOptions(response.data);
    };
    fetchOptions();
  }, []);

  function post(url, data) {
    console.log(data);
    return axios.post(url, data, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },  
    });
  }

  const onSubmit = (data) => {
    setLoading(true);
    const token = options.find((option) => {
      return option.value==data.symbol;
    });
    const fromNumber = "OSLO";
    const params = new URLSearchParams({
      fromNumber: fromNumber
    }).toString();
    const API_URL = "/api/stockMarket?"+params;
    post(API_URL, token).then((resp) => {
      resp.status === 200 ? setState("Success") : setState("Error");
      setStocks(resp.data);
      setLoading(false);
    });
  };

  const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value);

  const numberFormatNOK = (value) =>
  new Intl.NumberFormat('nb-NO').format(value);

  const Spinner = () => <div className="loader"></div>;
  const hasLabel = {label: false};
  return (
    <Card title="StockList" className="Card">
     <SmartForm defaultValues={defaultValues} onSubmit={onSubmit}>
          <SelectWrapper name="symbol" labelObj={hasLabel} options={options}/>
          <Submit name="Submit" type="submit">Submit</Submit>
     </SmartForm>    
     { stocks? (
     <div id="Output" className="table">
      <div className="th">
          <div className="td">Code</div>
          <div className="td">Open</div>
          <div className="td">Close</div>
          <div className="td">Change</div>
          <div className="td">Timestamp</div>
          <div className="td">Volume</div>
          <div className="clear"></div>
      </div>
        {stocks.map((item)=> {
          return (
            <div key={item.id} className="tr">
              <div className="td">{item.code}</div> 
              <div className="td">{item.open}</div>
              <div className="td">{item.close}</div>
              <div className="td">{item.change}</div>
              <div className="td">{moment.unix(item.timestamp).format()}</div>
              <div className="td">{numberFormatNOK(item.volume)}</div>
              <div style={{clear: 'both'}}></div>
            </div>
            );
        })}
      </div>) : (
        <div className="pos-center">
          {<Spinner />}
        </div>
      )
     }
  </Card>
  );
};

export default StockList;