import React from "react";
import axios from 'axios';
import parse from "html-react-parser";
import moment from 'moment';

import Big_Buck_Bunny from "../media/Big_Buck_Bunny.mp4";
import kenya_safari from "../media/kenya-safari.mp4";
import kilimanjaro from "../media/kilimanjaro.mp4";
import MOV_FILE from "../media/MOV_FILE.mov";
import preview from "../media/preview.mp4";
import the_globe from "../media/the_globe.mov";

import Card from './Card';
import PopUp from "./PopUp";
import Booking from "./Booking";
import Cart from './Cart';

const Safaris = () => {
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [numberOfHits, setNumberOfHits] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(2);
  const [metrics, setMetrics] = React.useState({
        iPv4: "84.212.216.80",
        hostname: "cm-84.212.216.80.get.no",
        org: "AS41164 Telia Norge AS",
        timezone: "Europe/Oslo",
        city: "Oslo",
        countryCode: "NO",
        countryName: "Norway",
        latitude: 59.9127,
        longitude: 10.7461,
        postal: "0171",
        state: "Oslo County",
        dateCreated:  moment.now()
  });

  const videoUrl = 'https://www.youtube.com/watch?v=3qW5z4xeiac';

  const addToCart = (el) => {
    console.log(el);
    if (!(cart.filter(e => e.safariId === el.safariId).length > 0)) {
      setCart([...cart, el]);
    }
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.safariId !== el.safariId);
    setCart(hardCopy);
  };

  const getData = async () => {
    const response = await axios.get('https://geolocation-db.com/json/')
    console.log(response.data);
    const data = {...response.data};
    const userData = {
      city: data.city,
      countryCode: data.country_code,
      countryName: data.country_name,
      dateCreated: data.dateCreated,
      iPv4: data.iPv4,
      latitude: data.latitude,
      longitude: data.longitude,
      postal: data.postal,
      state: data.state
    };

    setMetrics({...userData}); 
    const TOKEN = '88c4d9e730db43';
    const request = await fetch(`https://ipinfo.io/${metrics.iPv4}/json?token=${TOKEN}`)
    const json = await request.json();
    console.log(json);
    setMetrics({...metrics, hostname: json.hostname, org: json.org, timezone: json.timezone});
  }

  const handleClick = (event) => {
    setCurrentPage(event.target.id);
  }

  const handleShow = () => {
    setShow(false)
  }

  const handleChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      console.log(`Form submitted, Name: ${name}, Value: ${value}`);    
  }

  const handleSubmit = () => {
    axios.post("/api/booking", { params: { data: cart } }).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.error(err);
    });
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
        setProducts(response.data);
        /* Map each item of nodes to a nested array where each is a row of two columns */
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
        onClick={handleClick}>
        {number}
      </li>
    );
  });


  const SafariTours = props => {
    const Accordion = ({children, data, title, summary, video}) => {
      const [open, setOpen] = React.useState(false);
      const [showForm, setShowForm] = React.useState(false);
     
      const callback = React.useCallback((booking) => {
        console.log('ADD BOOKING TO CART!!');
        props.addToCart(booking);
      }, []);

      const handleClose = () => {
        setOpen(false)
      }
      
      const handleShowForm = () => {
        setShowForm(false)
      }

      console.log(data);

      const summaryHTML = '<span className=\'Summary\'>' + summary + '<span>';
      return (
        <div className="SafariTours">
        <div className="sFooter">
            <span className='sub' onClick={() => setOpen(true)}>Tour Details</span>
            <span className='sub' onClick={() => setShowForm(true)}>Add To Cart</span>
            <Booking safariId={data.id} showForm={showForm} parentCallback={callback} handleShowForm={handleShowForm}/>  
            <span className='sub' onClick={() => setShow(true)}>View Cart Items</span>
            <PopUp data={data} open={open} title={parse(title)} handleClose={handleClose}>{children}</PopUp>
        </div>
          <div className="VideoPlayer">
            <VideoPlayer video={video} className="video-player"/> 
          </div>
          <div dangerouslySetInnerHTML={{__html: summaryHTML}} /> 
          <div className='clearfix'></div>
        </div>
      )
    }
    
    const videos = props.videos;
    console.log(videos);

    return (
      <div className="divsContainer"> 
        {props && props.data.map((card, id) =>{ console.log(card.id); console.log(videos[id]); return (
          <Accordion data={card} title={card.title} summary={card.summary} video={videos[id]}>
            {card.details} 
          </Accordion>
        ); })}
      </div>
    );
  } 

  const VideoPlayer = (props) => {
    const videoRef = React.useRef(null);
   
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

  console.log(cart); 

 return (  
    <>
      <Card className="InnerCard" fontColor="black">
        <div id='modal_root'></div>
        <ul id="page-numbers"> 
         <li><span>Our Safaris:</span></li> 
         {renderPageNumbers}
         <li><span>Hits: {numberOfHits.length}</span></li>
         <li>{cart.length < 1? '🛒' : <input type="button" value={`🛒${cart.length}`} onClick={() => handleSubmit()}/>}</li>      
         <Cart cart={cart} show={show} removeFromCart={removeFromCart} handleShow={handleShow}/>
        </ul>              
        {currentItems && currentItems.length > 0 
           ? <SafariTours data={currentItems} addToCart={addToCart} removeFromCart={removeFromCart} videos={videos}/> 
           : <p>No Data Found!!</p>}                   
      </Card>
    </>
  );
};

export default Safaris;