import React, { useState, useEffect, useReducer } from 'react';
import geolocation from '@react-native-community/geolocation';
import { usePosition } from 'use-position';
import axios from 'axios';
import {ThemeContext} from "./ThemeContext";
import Card from './Card';
const theme = React.useContext(ThemeContext);

const Metrics = () => {   
   const [metricsData, setMetricsData] = React.useState([]);
   const { latitude, longitude, error } = usePosition();
   const [userPos, setUserPos] = useState({lat: null, long: null});
   const [ipInfo, setIpInfo] = React.useState({});

   const getData =  () => {
    return axios.get('https://geolocation-db.com/json/').then(response => {
        console.log(response);
        console.log(response.data);
        console.log(response.data.IPv4);
        return axios.get(`https://ipinfo.io/${response.data.IPv4}/json`).then(resp => {
            console.log(resp.data);
            console.log(resp.data.ip);
            setIpInfo(resp.data);
            theme.dispatch({ type: "IP_INFO", payload: resp.data });
            return resp;
        }).catch(err => {
            console.log(err);
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
  
  useEffect( () => {
    if (latitude && longitude && !error) {
    console.log(longitude + 'XCVXCVV ' + latitude);
    } 

    getData();

  }, [])


    React.useEffect(() => {
        axios.get('/api/healthCheck').then(response => {
          console.log(response);
          geolocation.getCurrentPosition((pos) => {
              console.log(pos);
            let coords = pos.coords;
            let latlng = coords.longitude + ',' + coords.latitude;
            const apiKey = process.env.REACT_APP_API_KEY;
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${apiKey}`).then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            });
            console.log(coords.longitude + ' SFDFDFF ' + coords.latitude);
          });
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
    console.log(theme.state && theme.state);

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