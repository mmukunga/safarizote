import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';
import CustomContext from './CustomContext';
import Bookings from './Bookings';

import image01 from "../media/Big_Buck_Bunny.mp4";
import image02 from "../media/kenya-safari.mp4";
import image03 from "../media/kilimanjaro.mp4";
import image04 from "../media/MOV_FILE.mov";
import image05 from "../media/preview.mp4";
import image06 from "../media/the_globe.mov";

const initialState = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    date: '',
    address: '',
    adults: '',
    children: '',
    message: '',
    tours: [],
  };

  const bookingsReducer = (state, action) => {
    switch (action.type) {
      case 'INIT_BOOKING': {
        if (action.payload.type === "checkbox") {
          return {
            ...state,
          [action.payload.name]: action.payload.checked
          }
        }
        const {name, value} = action.payload;
        return {
          ...state,
          [name]: value,
        };
      }
      case 'ADD_TOUR': {
        const id = state.id + 1;
        const { name, value } = action.payload;
        return {
          ...state,
          tours: [...state.tours, { id: id, [name]: value }],
        };
      }
      case 'REMOVE_TOUR': {
        const id = state.id;
        const result = state.tours.filter((tour) => tour.id !== action.payload);
        return {
          ...state,
          tours: [...result],
        };
      }
      default:
        return state;
    }
  };

  const Accordion = ({children, data, title, summary, video}) => {
      console.log(data);
      const VideoPlayer = ({video}) => {
        const videoRef = React.useRef(null);
      
        function playVideo() {
          videoRef.current.play();
        }
      
        function pauseVideo() {
          videoRef.current.pause();
        }
        
        return (
            <video ref={videoRef} controls  muted className="video-player">
              {/* Of course it's the big buck bunny! */}
              <source src={video} type="video/mp4"/>
            </video>
        );
      };
      
      const summaryHTML = '<span className=\'Summary\'>' + summary + '<span>';
      return (
        <div className="SafariTours">
          <div className="VideoPlayer">
            <VideoPlayer video={video} className="video-player"/> 
          </div>
          <div dangerouslySetInnerHTML={{__html: summaryHTML}} /> 
          <div className='clearfix'></div>
        </div>
      );
  }


const Safaris = () => {
    const [name, setName] = React.useState('');
    const [products, setProducts] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [numberOfHits, setNumberOfHits] = React.useState([]);
    const [pageSize, setPageSize] = React.useState(2);
    const [state, dispatch ] = React.useReducer(bookingsReducer, initialState);
    const providerState = { state, dispatch };
    React.useEffect(() => {
      axios.get('/api/safaris').then(response => {
        setProducts(response.data);
        const productsArray = products.map((safari) => [safari.hostname, safari.org]);
        var result = [];
        productsArray.reduce((res, value) => {
          if (!res[value.hostname]) {
            res[value.hostname] = { Hostname: value.hostname, Org: value.org, qty: 0 };
            result.push(res[value.hostname])
          }
          res[value.hostname].qty += 1;
          return res;
        }, {});

      }).catch(err => {
      console.log(err);
    });
  }, []);

  var catalog = [];

  const handleClickPage = (event) => {
    setCurrentPage(event.target.id);
  }

  products.forEach((safari) => {
      catalog.push({
        id: safari.id,
        title: safari.title,
        summary: safari.summary,
        details: safari.details + ' <p>USD ' + safari.price + '<p>',
      });
  });
  
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = catalog.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(catalog.length / pageSize); i++) {
    pageNumbers.push(i);
  }
  
  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li className="CssLink"
        key={number}
        id={number}
        onClick={handleClickPage}>
        {number}
      </li>
    );
  });
  
  const videos = [image01, image02, image03, image04, image05, image06];

  return ( 
      <CustomContext.Provider value={providerState}>
        <Card className="InnerCard" fontColor="black">    
        <ul id="page-numbers"> 
          <li><Bookings/> </li>
          <li style={{paddingLeft:'1em',fontStyle: 'oblique'}}><span>Our Safaris:</span></li> 
              {renderPageNumbers}
          </ul> 
            
            <div className="divsContainer"> 
              {currentItems && currentItems.map((card) =>{ return (
                <Accordion data={card} title={card.title} summary={card.summary} video={videos[card.id]}>
                  {card.details} 
                </Accordion>
              ); })}
            </div>
              <ul className="Booking">
                <li>Name: {state.name}</li>
                <li>Email: {state.email}</li>
                <li>Phone: {state.phone}</li>
                <li>Arrival Date: {state.date}</li>
                <li>Address: {state.address}</li>
                <li>Number of Adults: {state.adults}</li>
                <li>Number of Children:{state.children}</li>
                <li>Message: {state.message}</li>
              </ul>
            {state.tours.map((tour, index) => (
              <div key={index}  className="dashboardmenu">
                <label for='boxfield1' style={{padding:0}}>Safari {tour.id} Tour Id: {tour.safariId}
                  <input type="button" name='boxfield1' style={{padding:0}} value="X" onClick={() => dispatch({ type: 'REMOVE_TOUR', index })}/>
                </label> 
              </div>
            ))}
          </Card>  
      </CustomContext.Provider>   
  );
}

export default Safaris;