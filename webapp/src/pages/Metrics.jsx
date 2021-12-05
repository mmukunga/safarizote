import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Metrics = () => {
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
    
    metricsData.map(metrics => {
        displayRow(metrics).then(response => {  
          const { columnHeader, data } = response;          
            console.log(columnHeader); 
            console.log(data.maximums);
            console.log(data.minimums);
            console.log(data.rowCount);
            console.log(data.rows);
            console.log(data.totals);

        }).catch(err => {
            console.error(err);
        })
    });


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