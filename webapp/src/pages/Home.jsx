import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Home = () => {
   const [data, setData] = useState([]);
   const [counts, setCounts] = useState([]);
   const [clientInfo, setClientInfo] = useState({});
   useEffect(() => {
      axios.get('https://extreme-ip-lookup.com/json/')
        .then(response => {
            axios.post('/api/saveVisit', {
               url: response.data.ipName,
               browser: 'Microsoft Edge',
               dateCreated: new Date().toUTCString
            }).then(response => {
               console.log(response)
            });
            setClientInfo(response.data);
        }).catch(e => {
            console.log(e);
        })
    }, []);

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

      }).catch(err => {
          console.log(err);
      });
    }, [clientInfo]);

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
            <table className="sTable">  
              <tr>
                <th></th>
                <th>Url</th>
                <th>Hits</th>
              </tr>        
               {counts.map((item,idx) => 
                 <tr key={idx}>
                   <td>{idx}</td>
                   <td>{item.type}</td>
                   <td>{item.count}</td>
                 </tr>
               )}
            </table>
            <p style={{ margin: '20px', textAlign:'left'}}>Number of Hits: { data.length }</p>
        </Card>
    )
}

export default Home