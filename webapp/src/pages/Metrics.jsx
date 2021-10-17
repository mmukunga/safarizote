import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Metrics = () => {
   const [myData, setMyData] = useState([]);
   const [totalCount, setTotalCount] = useState(0);

    async function findDate(data) {
        const mediaTypes = data.map(dataItem => dataItem.hostname) 
        .filter((mediaType, index, array) => array.indexOf(mediaType) === index); 
        
        const aggregatedData = mediaTypes.map(dataItem => ({
            type: dataItem,
            dateCreated: data.filter(item => item.hostname == dataItem)[0].dateCreated.split('.')[0],
            count: data.filter(item => item.hostname == dataItem).length
        }));
        
        return aggregatedData;
    }

    useEffect(() => {
       axios.get('/api/allHits').then(response => {
          const fetchData = (data) => {
            findDate(data).then(resp => {
              setMyData([ ...myData, ...resp ]);
              const totalCount = resp.reduce((total, item) => total = total + item.count, 0);
              setTotalCount(totalCount);
            }).catch(err => {
                console.error(err);
            })
          }

          fetchData(response.data);

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
                <th>HOSTNAME</th>
                <th>Last Visited</th>
                <th>HITS</th>
              </tr>        
               {myData.map((item,idx) => 
                 <tr key={idx}>
                   <td>{idx}</td>
                   <td>{item.type}</td>
                   <td>{item.dateCreated}</td>
                   <td>{item.count}</td>
                 </tr>
               )}
            </table>
            <p style={{ margin: '20px', textAlign:'left'}}>Hits: { totalCount }</p>
        </Card>
    )
}

export default Metrics