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
     console.log('1.adsdas..');
     console.log(action.payload);
     console.log('2.adsdas..');
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
   const [metrics, setMetrics] = React.useState({
        data: {
            type: "FeatureCollection",
            features: [1,2,3,4],
            totals: [{
              events: [2021],
            },
           ]
        }
    });

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
      console.log("0.a1..");
      metricsData.map(item => {
        console.log(item);
        displayRow(item).then(response => {  
          const { columnHeader, data } = response;  
          console.log(columnHeader);
          data.rows.map(subarray => {
            console.log("1.a1..");
            dispatch({ type: 'DIMENSIONS', payload: subarray.dimensions });
            console.log(subarray.metrics);
            console.log("1.a2..");
            dispatch({ type: 'METRICS', payload: subarray.metrics });
          });
          console.log("1.a3..");
          dispatch({ type: 'ROWCOUNT', payload: data.rowCount });
          console.log("2.b4..");
          console.log(data.totals);
          console.log("2.b5..");
          dispatch({ type: 'TOTALS',   payload: data.totals }); 
          console.log("2.c6..");
        }).catch(err => {
          console.error(err);
        })
      });
    }, [metricsData]);
  
    console.log(state);

    if (state.totals.length !== 0) {
      console.log(state.totals);
      const values = [...state.totals[0].values];
      console.log(values);
      setMetrics(prevState => ({
        data: {
          ...prevState.data, 
          features: [...prevState.data.features, 5]
        }
      }));

      setMetrics(prevState => ({
        data: {
          ...prevState.data, 
          totals: prevState.data.totals.map((total) => ({
            ...total,
            events: [...total.events, 2022]
          }))
        }
      }));
    }

    console.log(metrics);

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
            <p style={{ margin: '10px', textAlign:'left'}}>Hits: { 12212 }</p>
        </Card>
    )
}

export default Metrics