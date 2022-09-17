import React from "react";
import axios from 'axios';
import moment from 'moment';

const defaultMessage = "App is😀OK👍!";

const fetchLogs = async() => {
  return axios.get('/api/fetchLogs');
}

const customJSON = (e,p) => {
  console.log(e);
  return {
    path: p,
    error: e,
    timestamp: moment()
  }
};

export const LogContext = React.createContext();

export const LogContextProvider = ({ children }) => {
  const [log, setLog] = React.useState(defaultMessage);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchLogs().then((response) => {
      console.log(response.data);
      setData(response.data);
    }).catch(() => {
      alert('There was an error while retrieving the data')
    });
  }, []);

  const persistLog = async (e,p) => {
    setLog(e.message);
    console.log(e);  
    return await axios.post('/api/saveLog', {
    body: JSON.stringify(customJSON(e,p))});
  };
  
  const addToCart = async (id) => {
    return await axios.post(`/api/deleteAll?id=${id}`);
  };

  const values = {
    data: data,
    persistLog: persistLog,
    log: log,
    addToCart: addToCart
  }

  return (
    <LogContext.Provider value={values}>
      {children}
    </LogContext.Provider>
  );
};
