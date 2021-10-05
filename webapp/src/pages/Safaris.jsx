import React, { useState, useRef } from 'react';
import parse from "html-react-parser";
import moment from 'moment';
import Bowser from "bowser";
import 'font-awesome/less/font-awesome.less';

import Big_Buck_Bunny from "../media/Big_Buck_Bunny.mp4";
import kenya_safari from "../media/kenya-safari.mp4";
import kilimanjaro from "../media/kilimanjaro.mp4";
import MOV_FILE from "../media/MOV_FILE.mov";
import preview from "../media/preview.mp4";
import the_globe from "../media/the_globe.mov";

import axios from 'axios';
import Card from './Card';
import Modal from "./Modal";

const Safaris = () => {
    const [safaris, setSafaris] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfHits, setNumberOfHits] = useState([]);
    const [pageSize, setPageSize] = useState(2);
    const [userPos, setUserPos] = useState({lat: null, long: null});
    const [position, setPosition] = useState({});


    const videoUrl = 'https://www.youtube.com/watch?v=3qW5z4xeiac';

    const handleClick = (event) => {
      setCurrentPage(event.target.id);
    }

    React.useEffect(() => {
      document.title = "Mombasa Safari Tours to Kenya's Major National Parks. Masai Mara, Tsavo East, Ngutuni, Tsavo West, Amboseli also to other najor destinations in Kenya";
    }, []);


    React.useEffect(() => {
      const api_key = '94a2ea2cd89d43ea94b26702f95a9bb4';

      axios.get('https://ipinfo.io/json').then(response => {
           axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${api_key}&ip_address=${response.data.ip}`)
            .then(resp => {
              const data = resp.data;
              const userBrowser = Bowser.parse(window.navigator.userAgent);
              const metrics = {
                url: response.data.hostname,
                browser: userBrowser.browser.name,
                browserVersion: userBrowser.browser.version,
                browserOsName: userBrowser.os.name,
                browserOsVersion: userBrowser.os.version,
                city: data.city,
                organization:  resp.data.connection.autonomous_system_organization,
                connectionType: resp.data.connection.connection_type,
                continent: resp.data.continent,
                continentCode: resp.data.continent_code,
                country: resp.data.country,
                countryCode: resp.data.country_code,
                currencyName: resp.data.currency.currency_name,
                currencyCode: resp.data.currency.currency_code,
                emoji: resp.data.flag.emoji,
                flagPng: resp.data.flag.png,
                flagSvg: resp.data.flag.svg,
                ipAddress: resp.data.ip_address,
                latitude: resp.data.latitude,
                longitude: resp.data.longitude,
                postalCode: resp.data.postal_code,
                region: resp.data.region,
                regionIsoCode: resp.data.region_iso_code,
                timezoneName: resp.data.timezone.name,
                timezoneAbbreviation: resp.data.timezone.abbreviation,
                presentTime: resp.data.timezone.current_time,
                dateCreated: moment.now()
              }

              axios.post('/api/saveVisit', metrics).then(response => {
                setNumberOfHits(response.data);
              });

            });
        }).catch(e => {
            console.log(e);
        })

    }, []);

    React.useEffect(() => {
        axios.get('/api/safaris').then(response => {
          console.log(response);
          setSafaris(response.data);
          /* Map each item of nodes to a nested array where each is a row of two columns */
          const safarisArray = safaris.map((safari) => [safari.url, safari.browser]);
          var result = [];
          safarisArray.reduce(function(res, value) {
            if (!res[value.url]) {
              res[value.url] = { Url: value.url, Url: value.browser, qty: 0 };
              result.push(res[value.url])
            }
            res[value.url].qty += 1;
            return res;
          }, {});

        }).catch(err => {
        console.log(err);
      });
    }, []);

    var array_nodes = [];

    safaris.forEach(function(safari) {
        array_nodes.push({
          title: '<span className=\'SafariTitle\'>'+ safari.title  + '<span>',
          summary: '<span className=\'Summary\'>' + safari.summary + '<span>',
          details: safari.details + ' <strong>USD ' + safari.price + '<strong>',
        });
    });
    
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = array_nodes.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(array_nodes.length / pageSize); i++) {
      pageNumbers.push(i);
    }
    
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li className="CssLink"
          key={number}
          id={number}
          onClick={handleClick}>
          {number}
        </li>
      );
    });

  const SafariTours = props => {
    console.log(props);
    const Accordion = ({children, title, summary, video, idx}) => {
      const [show, setShow] = useState(false);

      const mod = idx % 2;
      return (
        <div className="SafariTours">
          <div className="VideoPlayer">
            <VideoPlayer video={video} className="video-player"/> 
          </div>
          <div dangerouslySetInnerHTML={{__html: summary}} />  
          <span className='sub' onClick={() => setShow(true)} >Show Details</span>
          <Modal show={show} setShow={setShow} title={parse(title)}>
              {children} 
          </Modal>
          <div className='clearfix'></div>
        </div>
      )
    }
    
    const videos = props.videos;
    return (
      <div>
        {props && props.data.map((card, idx) =>{ return (
          <Accordion title={card.title} summary={card.summary} video={videos[idx]} idx={idx}>
            {card.details} 
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
        <video ref={videoRef} controls autoPlay loop muted className="video-player">
          {/* Of course it's the big buck bunny! */}
          <source src={props.video} type="video/mp4"/>
        </video>
    );
  }; 

  const videos = [ Big_Buck_Bunny, kenya_safari, kilimanjaro, MOV_FILE, preview, the_globe ];
  return (
    <Card className="InnerCard" fontColor="black">
        <div id="modal-root"></div>
        <ul id="page-numbers">
         <li style={{paddingLeft:'1em',fontStyle: 'oblique'}}><span>Hits: { numberOfHits.length } </span></li> 
         <li style={{paddingLeft:'1em',fontStyle: 'oblique'}}><span>Our Safaris: </span></li> 
         {renderPageNumbers}
        </ul>        
        {currentItems && currentItems.length > 0 
           ? <SafariTours data={currentItems} videos={videos}/> 
           : <p>No Data Found!!</p>}                   
    </Card>
  );
};

export default Safaris;