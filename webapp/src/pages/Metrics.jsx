import React, { useState, useEffect, useReducer } from 'react';
import geolocation from '@react-native-community/geolocation';
import { usePosition } from 'use-position';
import axios from 'axios';
import Card from './Card';

const Metrics = () => {   
   const [metricsData, setMetricsData] = React.useState([]);
   const { latitude, longitude, error } = usePosition();
   const [userPos, setUserPos] = useState({lat: null, long: null});
   
   navigator.geolocation = geolocation;

    React.useEffect(() => {
        axios.get('/api/healthCheck').then(response => {
          console.log(response);

          navigator.geolocation.getCurrentPosition((pos) => {
            let coords = pos.coords;
            console.log(coords.longitude + ' ' + coords.latitude);
          });

          if (latitude && longitude && !error) {
            // Fetch weather data here.
            console.log(longitude + ' ' + latitude);
          }

      }).catch(err => {
          console.log(err);
      });
    }, []);

    async function displayRow(row) {
       return row;
    }

    React.useEffect(() => {
       axios.get('/api/allHits').then(response => {
          console.log(response);
      }).catch(err => {
          console.log(err);
      });
    }, []);
  
    console.log(metricsData);

    return (
        <Card className="InnerCard" fontColor="black">
            <h4 style={{ margin: '20px', fontStyle: 'bold', textAlign: 'left'}}>Safari Zote!</h4>
             <p style={{ margin: '20px', textAlign: 'left'}}>People also ask about this</p>
            <ul className="vList">
               <li>How much does a safari cost in Kenya?</li>
               <li>What is the best safari in Kenya?</li>
               <li>What is the best time to go on safari in Kenya?</li>
               <li>Is Kenya safe for Safari?</li>
            </ul>
            <p style={{ margin: '10px', textAlign:'left'}}>Hits: { 12212 }</p>
        </Card>
    )
}

export default Metrics