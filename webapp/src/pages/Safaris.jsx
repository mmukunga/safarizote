import React, { useState, useEffect } from 'react';
import { Table, Pagination } from '@skatteetaten/frontend-components';

import axios from 'axios';
import Card from './Card';

const Safaris = () => {
    const [safaris, setSafaris] = useState([]);
    const [checked, setChecked] = useState(false);
    
    const columns = [
      {
        name: 'Id',
        fieldName: 'id'
      },
      {
        name: 'Title',
        fieldName: 'title'
      },
      {
        name: 'Description',
        fieldName: 'description'
      },
      {
        name: 'Price',
        fieldName: 'price'
      }
    ];

    const handleChecked = (e) => {
      setChecked(!checked);
      console.log(e);
    }

    useEffect(() => {
        axios.get('/api/safaris').then(response => {
          console.log(response);
          setSafaris(response.data);
        }).catch(err => {
        console.log(err);
      });
    }, []);

    console.log(safaris);
    var data = [];
    {safaris && safaris.forEach(function(safari) {
        data.push({
          id: safari.id,
          title: safari.title,
          description: safari.description,
          price: safari.price
        });
    });
  }
    console.log(data);


    const pageSize = 4;
    const [displayedData, setDisplayedData] = React.useState([...data].splice(0, pageSize));
    const [currentPage, setCurrentPage] = React.useState(1);

    return (
      <Card title="Safaris" text="Safari Zote">

        <div>

        {data && data.length > 0 
          ? <> 
            <Table fullWidth data={displayedData} columns={columns} />
            <Pagination
              currentPage={currentPage}
              onPageChange={page => {
                const index = (page - 1) * pageSize;
                setDisplayedData([...data].splice(index, pageSize));
                setCurrentPage(page);
              }}
              total={data.length}
              pageSize={pageSize}
            /> 
          </>
          : <p>fUCK!!</p>}
        </div>;



      </Card>
    );
  };

  export default Safaris;