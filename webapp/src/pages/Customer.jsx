import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Customer = () => {
    const [data, setData] = useState([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
          const result = await axios.get('/api/customers');
          console.log(result);
          setData(result.data);
      } catch (e) {
          console.log(e);
      }
    }
    fetchData();
  },[]);

    return (
      <Card title="Customers" text="Our Customers">
        <div className="Customer">
            <ul>
                {data.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
          </div> 
      </Card>    
    )
}

export default Customer