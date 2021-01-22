import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import Card from './Card';

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
      console.log(event.target.id);
      setCurrentPage(event.target.id);
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
    var array_nodes = [];
    safaris.forEach(function(safari) {
        array_nodes.push({
          id: safari.id,
          title: safari.title,
          description: safari.description,
          price: safari.price
        });
    });
    
    console.log(array_nodes);


    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = array_nodes.slice(indexOfFirstItem, indexOfLastItem);

    console.log(currentItems);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(array_nodes.length / pageSize); i++) {
      pageNumbers.push(i);
    }
    console.log(currentItems);
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
    console.log(currentItems);
    return (
      <Card title="Safaris" text="Safari Zote">
        <div className ="sTable">
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
          {currentItems && currentItems.length > 0 
          ? <Table data={currentItems}/> 
          : <p>fUCK!!</p>}
        </div>
      </Card>
    );
  };

  export default Safaris;