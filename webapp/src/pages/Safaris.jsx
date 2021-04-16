import React, { useState, useRef } from 'react';
import parse from "html-react-parser";
import video from "../media/globe_480_700kB.mov";
import kilimanjaro from "../media/kilimanjaro.mp4";

import axios from 'axios';
import Card from './Card';

import 'font-awesome/css/font-awesome.css';

const Safaris = () => {
    const [safaris, setSafaris] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientInfo, setClientInfo] = useState({});
    const [pageSize, setPageSize] = useState(2);

    const videoUrl = 'https://www.youtube.com/watch?v=3qW5z4xeiac';

    const handleClick = (event) => {
      setCurrentPage(event.target.id);
    }
    
    React.useEffect(() => {
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

    React.useEffect(() => {
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

    //Logic for displaying page numbers
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

  const SafariTours = props => {
    const Accordion = ({ children, title, isExpand = false }) => {
      const [expand, setExpand] = useState(isExpand);
      return (
        <div className="box">
          <div onClick={() => setExpand(expand => !expand)} class='SafariDetails'>  
            <VideoPlayer video={kilimanjaro}/>{parse(title)} <i className={`fa fa-play-circle${!expand ? ' down' : ''}`}></i>
            <div className="clearfix"></div>
          </div>
          {expand && <div>{children}</div>}
        </div>
      )
    }
  
    return (
      <div>
        {props && props.data.map(card =>{ return (
          <Accordion isExpand={false} title={card.title}>
            {parse(card.description)}
          </Accordion>
        ); })}
      </div>
    );
  } 

  const VideoPlayer = (props) => {
    const videoRef = useRef(null);
   
    function playVideo() {
      videoRef.current.play();
    }
  
    function pauseVideo() {
      videoRef.current.pause();
    }
    
    return (
      <div>
        <video ref={videoRef} controls autoPlay loop muted className='SafariSnap'>
          {/* Of course it's the big buck bunny! */}
          <source src={props.video} type="video/mp4"/>
        </video>
      </div>
    );
  };

  return (
    <Card className="InnerCard" fontColor="black">
        <ul id="page-numbers">
         <li style={{fontStyle: 'oblique'}}>Our Safaris: </li> {renderPageNumbers}
        </ul>
        {currentItems && currentItems.length > 0 
           ? <SafariTours data={currentItems}/> 
           : <p>No Data Found!!</p>}           
    </Card>
  );
};

export default Safaris;