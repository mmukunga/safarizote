import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import Card from './Card';
import Tableless from './Tableless';

const Safaris = () => {
    const [safaris, setSafaris] = useState([]);
    const [checked, setChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    
    const [pageSize, setPageSize] = useState(2);
    const handleChecked = (e) => {
      setChecked(!checked);
      console.log(e);
    }

    const handleClick = (event) => {
      setCurrentPage(event.target.id);
    }

    useEffect(() => {
        axios.get('/api/safaris').then(response => {
          setSafaris(response.data);
        }).catch(err => {
        console.log(err);
      });
    }, []);

    var array_nodes = [];

    safaris.forEach(function(safari) {
        array_nodes.push({
          title: '<span class=\'SafariTitle\'>'+ safari.title + '<span>',
          description: safari.description + ' <strong>USD ' + safari.price + '<strong>',
        });
    });
    
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = array_nodes.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(array_nodes.length / pageSize); i++) {
      pageNumbers.push(i);
    }
    
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}>
          {number}
        </li>
      );
    });
    
    return (
      <Card className="InnerCard" fontColor="black">
          <h3>Our Safaris</h3>
          <div style={{margin:"20px"}}>
            <img src="http://i.imgur.com/6bkt2Qk.gif" align="right" width="140" height="140" border="0" style={{margin:"0 0 20px 20px", background:"#E79851"}} />
            <p style={{margin:"0", font:"16px/1.25 sans-serif", color:"#4CB3E8", textAlign:"justify"}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, aut eligendi dignissimos, illum eaque ut architecto quisquam! 
                Odio, aliquam eligendi iste tempore beatae, deserunt! Officia temporibus at, debitis excepturi porro mollitia aspernatur labore 
                unde dolores quae blanditiis dignissimos error aut iure magnam sed placeat impedit incidunt praesentium natus dolorum. Hic illum 
                vitae iusto aspernatur tempora voluptatem id dolor reiciendis amet ea iste similique fuga, accusamus quibusdam, atque itaque 
                quae sit dolorem asperiores facilis, fugit odio eveniet. Autem iusto nisi, minus sunt fuga quas sed expedita incidunt veniam 
                nobis id ab. Blanditiis ullam laboriosam, quibusdam fugiat repellat labore nulla natus minima at, a veritatis nostrum dignissimos 
                ipsa libero, voluptatem itaque!
            </p>
        </div>
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
          {currentItems && currentItems.length > 0 
          ? <Tableless data={currentItems}/> 
          : <p>No Data Found!!</p>}
      </Card>
    );
  };

  export default Safaris;