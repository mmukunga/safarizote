import React, { useState, useReducer } from 'react';
import axios from 'axios';
import Card from './Card';


const initialState = { 
     rowCount: 0,
     totals: 0,
     dimensions: [],
     metrics: []
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
                <th>ID</th>
                <th>HOSTNAME</th>
                <th>Last Visited</th>
                <th>HITS</th>
              </tr>        
               {metricsData.map((item,idx) => {
                 const { columnHeader, data } = item;          
                 console.log(columnHeader); 
                 const max = data.maximums;
                 const min = data.minimums;
                 const count = data.rowCount;
                 console.log(data.rows);
                 data.rows.map(subarray => {
                    console.log(subarray);
                    const { data } = subarray;
                    console.log(data);
                    subarray.dimensions.map(item => {
                      console.log(item); 
                    }); 
                    subarray.metrics.map(item => {
                      console.log(item); 
                      item.values.map(value => {
                        console.log(value); 
                      });
                    }); 
                 });
                 console.log(data.totals);   
                    return <tr key={idx}>
                      <td>{idx}</td>
                      <td>{item.type}</td>
                      <td>{item.dateCreated}</td>
                      <td>{item.count}</td>
                    </tr>
                    }
                )}
            </table>
            <p style={{ margin: '10px', textAlign:'left'}}>Hits: { totalCount }</p>

        </Card>
    )
}

export default Metrics