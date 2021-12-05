import React, { useState, useReducer } from 'react';
import axios from 'axios';
import Card from './Card';


const initialState = { 
     rowCount: 0,
     totals: 0,
     dimensions: [],
     metrics: [
       {
         values:[]
       }
     ]
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'DIMENSIONS': 
      return { ...state, dimensions: action.payload };
    case "METRICS": 
      return { ...state, metrics: action.payload };
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
   const [totalCount, setTotalCount] = useState(0);
   const [arr, setArr] = useState([]);
    
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
          console.log(response);
          console.log(response.data);
          if (response.data.reports!=null && response.data.reports!=undefined) {
           setMetricsData(metricsData => [...metricsData, ...response.data.reports]);
          }
      }).catch(err => {
          console.log(err);
      });
    }, []);

     metricsData.map((item) => 
      console.log(item)
    )
    
    React.useEffect(() => {
      metricsData.map(metrics => {
        displayRow(metrics).then(response => {  
          const { columnHeader, data } = response;      
          console.log(columnHeader); 

          data.rows.map(subarray => {
            dispatch({ type: 'DIMENSIONS', payload: subarray.dimensions });
            console.log(subarray);
            subarray.dimensions.map(item => {
              console.log(item); 
            });

            dispatch({ type: 'METRICS', payload: subarray.metrics });
            subarray.metrics.map(item => {
              console.log(item); 
              item.values.map(value => {
                console.log(value); 
              });
            }); 
          });
           
          dispatch({ type: 'ROWCOUNT', payload: data.rowCount })
          dispatch({ type: 'TOTALS', payload: data.totals }) 

        }).catch(err => {
          console.error(err);
        })
      });
    }, [metricsData]);
  
    console.log(state);

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
                <td>{state.metrics[0].values}</td>
              </tr>      
            </table>
            <p style={{ margin: '10px', textAlign:'left'}}>Hits: { state.totalCount }</p>
        </Card>
    )
}

export default Metrics