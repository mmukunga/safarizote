import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Metrics = () => {
   const [data, setData] = useState([]);
   const [counts, setCounts] = useState([]);

    useEffect(() => {
      axios.get('/api/allHits').then(response => {
        var array_hits = [];
        response.data.forEach((d) => {
          const data_group = response.data.filter(item => item.url === d.url); 
          var last_item = data_group[data_group.length - 1];

          array_hits.push({
              url: d.url,
              browser: d.browser,
              date_last_created: last_item.dateCreated
            });
        });

        const mediaTypes = array_hits.map(dataItem => dataItem.url) 
        .filter((mediaType, index, array) => array.indexOf(mediaType) === index); // filter out duplicates

        const counts = mediaTypes.map(dataItem => ({
            type: dataItem,
            count: array_hits.filter(item => item.url == dataItem).length
        }));

        var sortedCounts = [...counts];
        sortedCounts.sort((a,b) => b.count - a.count); //descending order

        setData(array_hits);
        setCounts(sortedCounts);

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
            <p style={{ margin: '20px', textAlign:'left'}}>Site Hits:= { data.length }</p>
        </Card>
    )
}

export default Metrics