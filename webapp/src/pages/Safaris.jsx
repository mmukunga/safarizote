import React, { useState, useRef } from 'react';
import axios from 'axios';
import parse from "html-react-parser";
import moment from 'moment';
import Bowser from "bowser";

import Big_Buck_Bunny from "../media/Big_Buck_Bunny.mp4";
import kenya_safari from "../media/kenya-safari.mp4";
import kilimanjaro from "../media/kilimanjaro.mp4";
import MOV_FILE from "../media/MOV_FILE.mov";
import preview from "../media/preview.mp4";
import the_globe from "../media/the_globe.mov";

import Card from './Card';
import PopUp from "./PopUp";
import Cart from "./Cart";

const Safaris = () => {
    const [safaris, setSafaris] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfHits, setNumberOfHits] = useState([]);
    const [pageSize, setPageSize] = useState(2);
    const [metrics, setMetrics] = useState({
          iPv4: "84.212.216.80",
          hostname: "cm-84.212.216.80.get.no",
          org: "AS41164 Telia Norge AS",
          timezone: "Europe/Oslo",
          city: "Oslo",
          country_code: "NO",
          country_name: "Norway",
          latitude: 59.9127,
          longitude: 10.7461,
          postal: "0171",
          state: "Oslo County",
          dateCreated:  moment.now()
    });

    const addToCart = (el) => {
      if (!(cart.filter(e => e.id === el.id).length > 0)) {
        setCart([...cart, el]);
      }
    };
  
    const removeFromCart = (el) => {
      let hardCopy = [...cart];
      hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
      setCart(hardCopy);
    };

    const videoUrl = 'https://www.youtube.com/watch?v=3qW5z4xeiac';

    const handleClick = (event) => {
      setCurrentPage(event.target.id);
    }

    React.useEffect(() => {
      document.title = "Mombasa Safari Tours to Kenya's Major National Parks. Masai Mara, Tsavo East, Ngutuni, Tsavo West, Amboseli also to other najor destinations in Kenya";
      axios.get('/api/showCart').then(response => {
        console.log(response);
        setCart(response.data);
      }).catch(e => {
        console.log(e);
      });
    }, []);

    const getData = async () => {
      const response = await axios.get('https://geolocation-db.com/json/')
      console.log(response.data);
      setMetrics({...metrics, ...response.data}); 
      const TOKEN = '88c4d9e730db43';
      const request = await fetch(`https://ipinfo.io/${metrics.iPv4}/json?token=${TOKEN}`)
      const json = await request.json();
      console.log(json);
      setMetrics({...metrics, hostname: json.hostname, org: json.org, timezone: json.timezone});
    }

    React.useEffect(() => {
      document.title = "Kenya Safari Specialist and a Professional Safari Guide in flora and fauna"; 
      console.log('About Us!!')
      getData().then(() => {
        console.log(metrics);
        axios.post('/api/saveVisit', metrics).then(response => {
          setNumberOfHits(response.data);
        }).catch(e => {
          console.log(e);
        });
      });    
    }, []);

    React.useEffect(() => {
        axios.get('/api/safaris').then(response => {
          setSafaris(response.data);
          /* Map each item of nodes to a nested array where each is a row of two columns */
          const safarisArray = safaris.map((safari) => [safari.hostname, safari.org]);
          var result = [];
          safarisArray.reduce(function(res, value) {
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

    safaris.forEach(function(safari) {
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
          onClick={handleClick}>
          {number}
        </li>
      );
    });

  const SafariTours = props => {
    const Accordion = ({children, data, title, summary, video}) => {
      const [open, setOpen] = useState(false);
      const [openCart, setOpenCart] = useState(false);
      const [checked, setChecked] = React.useState(false);

      const handleClose = () => {
        setOpen(false)
      }

      const handleCloseCart = () => {
        setOpenCart(false)
      }

      const handleCart  = (e) => {
        let isChecked = e.target.checked;
        setChecked(isChecked);
        console.log('isChecked:= ' + isChecked);
        if (isChecked) { 
          props.addToCart(data)
        } else {
          props.removeFromCart(data)
        }
    
      }

      console.log(cart);
      const summaryHTML = '<span className=\'Summary\'>' + summary + '<span>';
      return (
        <div className="SafariTours">
          <div className="VideoPlayer">
            <VideoPlayer video={video} className="video-player"/> 
          </div>
          <div dangerouslySetInnerHTML={{__html: summaryHTML}} /> 
          <span className='sub' onClick={() => setOpen(true)}>Details and Offers</span>&nbsp; 
          <label className='sub'><input type="checkbox" name="check" checked={checked} onClick={handleCart}/>Add To Cart</label>&nbsp; 
          <span className='sub' onClick={() => setOpenCart(true)}>Checkout Cart</span>
          <Cart cart={cart} removeFromCart={props.removeFromCart} handleClose={handleCloseCart}/>
          <PopUp data={data} open={open} title={parse(title)} handleClose={handleClose}>{children}</PopUp>
          <div className='clearfix'></div>
        </div>
      )
    }
    
    const videos = props.videos;
    return (
      <div className="divsContainer"> 
        {props && props.data.map((card) =>{ return (
          <Accordion data={card} title={card.title} summary={card.summary} video={videos[card.id]}>
            {card.details} 
          </Accordion>
        ); })}
      </div>
    );
  } 

  const handleSubmit = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      console.log(`Form submitted, Name: ${name}, Value: ${value}`);    
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
        <video ref={videoRef} controls  muted className="video-player">
          {/* Of course it's the big buck bunny! */}
          <source src={props.video} type="video/mp4"/>
        </video>
    );
  }; 

  const videos = [ Big_Buck_Bunny, kenya_safari, kilimanjaro, MOV_FILE, preview, the_globe ];

  console.log(cart);

  return (
    <Card className="InnerCard" fontColor="black">
        <div id="modal-root"></div>
        <div id='portal'></div>
        <ul id="page-numbers"> 
         <li style={{paddingLeft:'1em',fontStyle: 'oblique'}}><span>Our Safaris:</span></li> 
         {renderPageNumbers}
         <li style={{paddingLeft:'1em',fontStyle: 'oblique'}}><span>Hits: {numberOfHits.length}</span></li>
         <li style={{paddingLeft:'1em',fontStyle: 'oblique'}}>
            <form ref="form" onSubmit={handleSubmit}>
                Booked Items: { cart && cart.length}
                <button type="submit">Send Booking</button>
            </form> 
         </li>
        </ul>  
             
        {currentItems && currentItems.length > 0 
           ? <SafariTours data={currentItems} addToCart={addToCart} removeFromCart={removeFromCart} videos={videos}/> 
           : <p>No Data Found!!</p>}                   
    </Card>
  );
};

export default Safaris;