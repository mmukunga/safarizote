import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Card from './Card';
import {LoggerContext} from "./LoggerProvider";

const AppLogger = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const { logData, persistLog } = React.useContext(LoggerContext);

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      axios.get('/api/viewErrors').then((response) => {
        setData(response.data);
        setLoading(false);
      }).catch( (error) => {
        setLoading(false);
        error.httpUrl='/api/viewErrors';  
        persistLog(error);
      });
    }
    fetchData();
 }, []);
 
 const deleteAll = async (id) => {
    try {
      const res = await axios.post('/api/deleteAll');
      setData(res.data);
    } catch (error) {
      error.httpUrl='/api/deleteAll';  
      persistLog(error);
    }
  }

  return ( 
     <Card title="Error Logs" className="Card">
        {loading && <div>Loading</div>}
        {data.length!=0 && <button className="button" onClick={deleteAll}>Delete All</button>}
        {!loading && (
        <div >
        {data && data.map((x, idx) => (
        <Card key={idx} className="Card AppLogger" title={x.name}>
            <p>Id: {x.id}</p>
            <p>Status: {x.status}</p>
            <p>Status Text: {x.statusText}</p>
            <p>Message: {x.message}</p>
            <p>Stacktrace {x.stacktrace}</p>
            <p>Timestamp: {x.timestamp}</p>
            <p>Avatar: <img src={x.avatar} width="50" height="50" /></p>
          </Card>))}
      </div>
      )}
    </Card> 
  );
};

export default AppLogger;