import React, { useState, useRef } from 'react';
import parse from "html-react-parser";
import moment from 'moment';

import Big_Buck_Bunny from "../media/Big_Buck_Bunny.mp4";
import kenya_safari from "../media/kenya-safari.mp4";
import kilimanjaro from "../media/kilimanjaro.mp4";
import MOV_FILE from "../media/MOV_FILE.mov";
import preview from "../media/preview.mp4";
import the_globe from "../media/the_globe.mov";

import axios from 'axios';
import Card from './Card';

import 'font-awesome/css/font-awesome.css';

const Safaris = () => {
    const [safaris, setSafaris] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfHits, setNumberOfHits] = useState([]);
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
              dateCreated: moment.now()
            }).then(response => {
              console.log(response);
              setNumberOfHits(response.data);
              console.log(response.data);
            });
        }).catch(e => {
            console.log(e);
        })
    }, []);

    React.useEffect(() => {
        axios.get('/api/safaris').then(response => {
          setSafaris(response.data);

          /* Map each item of nodes to a nested array where each is a row of two columns */
          const safarisArray = safaris.map((safari) => [safari.url, safari.browser]);
          console.log(safarisArray);


          var result = [];
          safarisArray.reduce(function(res, value) {
            if (!res[value.url]) {
              res[value.url] = { Url: value.url, Url: value.browser, qty: 0 };
              result.push(res[value.url])
            }
            res[value.url].qty += 1;
            return res;
          }, {});

          console.log(result);

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
    const Accordion = ({ children, title, isExpand = false, video, idx}) => {
      const [expand, setExpand] = useState(isExpand);
      const mod = idx % 2;
      return (
        <div className={`box ${mod!=0 ? 'oddRow' : ''}`}>
          <div onClick={() => setExpand(expand => !expand)} class='SafariDetails'>  
            <VideoPlayer video={video}/>{parse(title)} <i className={`fa fa-play-circle${!expand ? ' down' : ''}`}></i>
            <div className="clearfix"></div>
          </div>
          {expand && <div>{children}</div>}
        </div>
      )
    }
    
    const videos = props.videos;
    return (
      <div>
        {props && props.data.map((card, idx) =>{ return (
          <Accordion isExpand={false} title={card.title} video={videos[idx]} idx={idx}>
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

  const videos = [ Big_Buck_Bunny, kenya_safari, kilimanjaro, MOV_FILE, preview, the_globe ];
  console.log('1.NumberOfHits');
  console.log(numberOfHits);
  console.log('2.NumberOfHits');

  return (
    <Card className="InnerCard" fontColor="black">
        <ul id="page-numbers">
         <li style={{paddingLeft:'1em',color:'black',fontStyle: 'oblique'}}><span>Site Visits|Hits: { numberOfHits.length } </span></li> 
         <li style={{paddingLeft:'1em',color:'black',fontStyle: 'oblique'}}><span>Our Safaris: </span></li> 
         {renderPageNumbers}
        </ul>

        {currentItems && currentItems.length > 0 
           ? <SafariTours data={currentItems} videos={videos}/> 
           : <p>No Data Found!!</p>}  
                     
    </Card>
  );
};

export default Safaris;