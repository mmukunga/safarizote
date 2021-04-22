import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Metrics = () => {
   const [data, setData] = useState([]);
   const [counts, setCounts] = useState([]);

    useEffect(() => {
      axios.get('/api/allHits').then(response => {

        const mediaTypes = response.data.map(dataItem => dataItem.url) 
        .filter((mediaType, index, array) => array.indexOf(mediaType) === index); // filter out duplicates

        const counts = mediaTypes.map(dataItem => ({
            type: dataItem,
            count: response.data.filter(item => item.url == dataItem).length
        }));

        setData(response.data);
        setCounts(counts);

        var array_hits = [];
        response.data.forEach((d) => {
          const data_group = data.filter(item => item.url === d.url); 
          console.log(data_group);              
          var last_item = data_group[data_group.length - 1];
          console.log(last_item);    

          array_hits.push({
              url: d.url,
              browser: d.browser
            });
          });
          
          console.log(array_hits);
      }).catch(err => {
          console.log(err);
      });
    }, []);

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
                <th>URL</th>
                <th>HITS</th>
              </tr>        
               {counts.map((item,idx) => 
                 <tr key={idx}>
                   <td>{idx}</td>
                   <td>{item.type}</td>
                   <td>{item.count}</td>
                 </tr>
               )}
            </table>
            <p style={{ margin: '20px', textAlign:'left'}}>Site Visits|Hits: { data.length }</p>
        </Card>
    )
}

export default Metrics