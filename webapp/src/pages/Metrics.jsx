import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Metrics = () => {
   const [data, setData] = useState([]);
   const [counts, setCounts] = useState([]);
   const [myData, setMyData] = useState([]);

    async function findDate(data) {
        var arrayHits = [];
        const mediaTypes = data.map(dataItem => dataItem.url) 
        .filter((mediaType, index, array) => array.indexOf(mediaType) === index); // filter out duplicates
        
        const aggregatedData = mediaTypes.map(dataItem => ({
            type: dataItem,
            dateCreated: data.filter(item => item.url == dataItem)[0].dateCreated,
            count: data.filter(item => item.url == dataItem).length
        }));
      
        data.forEach((d) => {
          const data_group = data.filter(item => item.url === d.url); 
          var last_item = data_group[data_group.length - 1];
          arrayHits.push({
              url: d.url,
              browser: d.browser,
              date_last_created: last_item.dateCreated
            });
        });  
        // statements
        console.log('2021-04-29 12:12:2000');
        return arrayHits;
    }

    useEffect(() => {
       axios.get('/api/allHits').then(response => {
          // Fetch Data
          const fetchData = (data) => {
            findDate(data)
            .then(resp => {
              console.log(resp);
              setMyData([ ...myData, ...resp ]);
            })
            .catch(err => {
                console.log("Metrics can't be added");
                console.error(err);
            })
          }

          fetchData(response.data);

      }).catch(err => {
          console.log(err);
      });
    }, []);

    console.log(myData);

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
            <p style={{ margin: '20px', textAlign:'left'}}>Hits: { data.length }</p>
        </Card>
    )
}

export default Metrics