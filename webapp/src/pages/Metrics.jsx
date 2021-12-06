import React, { useState, useReducer } from 'react';
import axios from 'axios';
import Card from './Card';


const initialState = { 
     rowCount: 0,
     totals: [],
     dimensions: [],
     metrics: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'DIMENSIONS': 
      return { 
        ...state, 
        dimensions: action.payload };
    case "METRICS":
      return {
        ...state,
        metrics: action.payload
      };
    case 'TOTALS': 
      return { ...state, totals: action.payload };
    case 'ROWCOUNT': 
      return { ...state, rowCount: action.payload };    
    default: 
      return state;
  }
 }

const Metrics = () => {   
   const [state, dispatch] = useReducer(reducer, initialState);
   const [metricsData, setMetricsData] = React.useState([]);

    React.useEffect(() => {
        axios.get('/api/healthCheck').then(response => {
          console.log(response);
      }).catch(err => {
          console.log(err);
      });
    }, []);

    async function displayRow(row) {
       return row;
    }

    React.useEffect(() => {
       axios.get('/api/allHits').then(response => {
          if (response.data.reports!=null && response.data.reports!=undefined) {
           setMetricsData(metricsData => [...metricsData, ...response.data.reports]);
          }
      }).catch(err => {
          console.log(err);
      });
    }, []);
    
    React.useEffect(() => {
      metricsData.map(metrics => {
        displayRow(metrics).then(response => {  
          const { columnHeader, data } = response;  
          data.rows.map(subarray => {
            dispatch({ type: 'DIMENSIONS', payload: subarray.dimensions });
            console.log(subarray.metrics);
            dispatch({ type: 'METRICS', payload: subarray.metrics });
          });
          console.log("1.a..");
          dispatch({ type: 'ROWCOUNT', payload: data.rowCount });
          console.log("2.b..");
          console.log(data.totals);
          console.log("2.b..");
          dispatch({ type: 'TOTALS',   payload: data.totals }); 
          console.log("2.c..");
        }).catch(err => {
          console.error(err);
        })
      });
    }, [metricsData]);
  
    console.log(state);
    console.log(state.totals);
    console.log(state.totals[0]);
    
    if (state.totals.length !== 0) {
      console.log(state.totals);
      const values = state.totals;
      console.log(values);
    }


    return (
        <Card className="InnerCard" fontColor="black">
            <h4 style={{ margin: '20px', fontStyle: 'bold', textAlign: 'left'}}>Safari Zote!</h4>
             <p style={{ margin: '20px', textAlign: 'left'}}>People also ask about this</p>
            <ul className="vList">
               <li>How much does a safari cost in Kenya?</li>
               <li>What is the best safari in Kenya?</li>
               <li>What is the best time to go on safari in Kenya?</li>
               <li>Is Kenya safe for Safari?</li>
            </ul>
            <table className="Table">  
              <tr>
                <th>ROWS</th>
                <th>ROWCOUNT</th>
                <th>DIMENSIONS</th>
                <th>METRICS</th>
              </tr>   
              <tr>
                <td>{state.rows}</td>
                <td>{state.rowCount}</td>
                <td>{state.dimensions[0]}</td>
                <td>{23232}</td>
              </tr>      
            </table>
            <p style={{ margin: '10px', textAlign:'left'}}>Hits: { 121212 }</p>
        </Card>
    )
}

export default Metrics