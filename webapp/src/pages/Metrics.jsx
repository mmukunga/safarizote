import React, { useEffect, useState } from 'react';
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
       axios.get('/api/allHits').then(result => {
          console.log(result);
          console.log(result.data);
          const { data } = result.data;
          if (result.data.data!=null && result.data.data!=undefined) {
           setMetricsData(old => [...old, ...result.data.reports]);
          }
          rows.map(row => {
              displayRow(row).then(response => {            
                  console.log(response.dimensions); 
                  console.log(response.metrics); 
              }).catch(err => {
                  console.error(err);
              })
          });
      }).catch(err => {
          console.log(err);
      });
    }, []);

     metricsData.map((item) => 
      console.log(item)
    )

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
               {metrics.map((item,idx) => 
                 <tr key={idx}>
                   <td>{idx}</td>
                   <td>{item.type}</td>
                   <td>{item.dateCreated}</td>
                   <td>{item.count}</td>
                 </tr>
               )}
            </table>
            <p style={{ margin: '10px', textAlign:'left'}}>Hits: { totalCount }</p>


            {metricsData && metricsData.map((item,idx) => 
              <div> Hits {item.values[0]}</div>
            )}


        </Card>
    )
}

export default Metrics