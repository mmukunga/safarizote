import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Card from './Card';
import {LogContext} from "./LogContext";
import Pagination from './Pagination';
import LogCard from './LogPagination';

const ViewLogs = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const context = React.useContext(LogContext);
  const log = context.log;
  const persistLog =  context.persistLog;
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord  = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = data.slice(indexOfFirstRecord, 
    indexOfLastRecord);
  
    const nPages = Math.ceil(data.length / recordsPerPage);  

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      await axios.get('/api/fetchLogs').then((response) => {
        setData(response.data);
        console.log(response)
        setLoading(false);
      }).catch( (error) => {
        console.log(error);
        setLoading(false); 
        const path = '/api/fetchLogs';
        persistLog(error, path);
      });
    }
    fetchData();
 }, []);
 
 const deleteAll = async (id) => {
    try {
      const res = await axios.post('/api/deleteAll');
      setData(res.data);
    } catch (error) {
      const path='/api/deleteAll';  
      const result = await persistLog(error, path);
      console.log(result);
    }
  }

  const addToCart = () => {console.log("Logging AddToCart");}

  return ( 
     <Card title="Error Logs" className="Card">
      {loading && <div>Loading</div>}
      {data.length!=0 && <button className="button" onClick={deleteAll}>Delete All</button>}
      {loading ? 
        <div>Loading</div> 
         : 
        <div >
        <span>Is Loaded!!</span>
        {data && data.map((x, idx) => (
            <Card key={idx} className="Card" title={x.type}>
              <div className="stack">                
              <ol className="logs">
                <li>Id: {idx}</li>
                <li>Name: {x.name}</li>
                <li>Status: {x.status}</li>
              </ol>
                {x.stack} <br/>
                {x.timestamp}
              </div>
            </Card>
          ))
        }
        </div>
      }
    </Card> 
  );
};

export default ViewLogs;