import React, { useState, useEffect } from 'react';
import { ReactVideo } from "reactjs-media";
import parse from "html-react-parser";
import ReactPlayer from "react-player";
import { Player } from 'video-react'

import axios from 'axios';
import Card from './Card';

const Safaris = () => {
    const [safaris, setSafaris] = useState([]);
    const [checked, setChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientInfo, setClientInfo] = useState({});
    const [pageSize, setPageSize] = useState(2);
     
    const [readyCount, setReadyCount] = React.useState(0);
    const [playing, setPlaying] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const onReady = () => {
      setReadyCount(readyCount + 1);
    };

    const togglePlay = () => {
      setIsPlaying(!isPlaying);
    };
    
    React.useEffect(() => {
      if (readyCount === links.length) {
        setPlaying(true);
      }
    }, [readyCount]);

    const handleChecked = (e) => {
      setChecked(!checked);
      console.log(e);
    }

    const links = [
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    ];

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

    const SafariTours = props => {
      const Accordion = ({ children, title, isExpand = false }) => {
        const [expand, setExpand] = useState(isExpand);
        return (
          <div className="box">
            <div onClick={() => setExpand(expand => !expand)} class='SafariDetails'>
              {parse(title)} <i className={`fa fa-play-circle${!expand ? ' down' : ''}`}></i>
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

    return (
      <Card className="InnerCard" fontColor="black">
          <p>ReactPlayer -Vimeo</p>
          <div className="ReactPlayer">
            <ReactPlayer 
              key="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
              playing={playing} 
              controls={true}
              onReady={onReady} 
              url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            />
            {/* <PlayerContiner>
                    <Button onClick={togglePlay}>Play</Button>
                </PlayerContiner> */}
          </div>
          <h1>React video Component</h1>
          <ReactVideo 
          src="https://storage.coverr.co/videos/BALBxhjqfldnwtv00YopEAA014UtVoZo00R?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjExMjc0NTQwfQ.rVZT49viuSpaSaXUkejPw3N9cvSHbxmSwhrnDUKJCMc" 
          autoPlay
          primaryColor="red"
          poster="https://images.pexels.com/photos/4737019/pexels-photo-4737019.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          />
          <p>Our Safaris</p>
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
          {currentItems && currentItems.length > 0 
           ? <SafariTours data={currentItems}/> 
           : <p>No Data Found!!</p>}
      </Card>
    );
  };

  export default Safaris;