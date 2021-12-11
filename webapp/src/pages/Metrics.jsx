import React from 'react';
import axios from 'axios';
import {ThemeContext} from "./ThemeContext";
import Card from './Card';

const Metrics = () => { 
    const theme = React.useContext(ThemeContext);
    React.useEffect( () => { 
        const getData =  () => {
            return axios.get('https://geolocation-db.com/json/').then(response => {
                return axios.get(`https://ipinfo.io/${response.data.IPv4}/json`).then(resp => {
                theme.dispatch({ type: "IP_TRACKER", payload: resp.data });
                return resp;
                }).catch(err => {
                console.log(err);
                }); 
            }).catch(err => {
                console.log(err);
            });
        }

        getData();

    }, []);

    React.useEffect(() => {
        axios.get('/api/healthCheck').then(response => {
          console.log(response);
      }).catch(err => {
          console.log(err);
      });
    }, []);

    React.useEffect(() => {
       axios.get('/api/allHits').then(response => {
          console.log(response);
      }).catch(err => {
          console.log(err);
      });
    }, []);
  
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
            <p style={{ margin: '10px', textAlign:'left'}}>Hits: { theme.state.count }</p>
        </Card>
    )
}

export default Metrics