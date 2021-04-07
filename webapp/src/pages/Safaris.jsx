import React, { useState, useEffect } from 'react';
import { ReactVideo } from "reactjs-media";

import axios from 'axios';
import Card from './Card';
import Tableless from './Tableless';

const Safaris = () => {
    const [safaris, setSafaris] = useState([]);
    const [checked, setChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientInfo, setClientInfo] = useState({});

    const [pageSize, setPageSize] = useState(2);
    const handleChecked = (e) => {
      setChecked(!checked);
      console.log(e);
    }

    const handleClick = (event) => {
      setCurrentPage(event.target.id);
    }
    
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
          <p>Our Safaris</p>
          <strong>React video Component</strong>
          <ReactVideo
                src="https://blog.naturalsafaris.com/wp-content/uploads/2018/08/VID-20190529-WA0013.mp4?_=2"
                autoPlay
                primaryColor="red"
                poster="https://images.pexels.com/photos/4737019/pexels-photo-4737019.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200"
                className="ReactVideo"
                // other props
            />

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