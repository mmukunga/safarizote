import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';

const AboutUs = () => {
    const [names, setNames] = useState(["Simon Mukunga", "steve", "carol"]);
    const [ipData, setIPData] = useState({
            IPv4: "84.212.216.80",
            hostname: "cm-84.212.216.80.get.no",
            org: "AS41164 Telia Norge AS",
            timezone: "Europe/Oslo",
            city: "Oslo",
            country_code: "NO",
            country_name: "Norway",
            latitude: 59.9127,
            longitude: 10.7461,
            postal: "0171",
            state: "Oslo County"
      });
   
    const getData = async () => {
      const response = await axios.get('https://geolocation-db.com/json/')
      console.log(response.data);
      var initData = {...ipData, ...response.data};
      const TOKEN = '88c4d9e730db43';
      const request = await fetch(`https://ipinfo.io/${initData.IPv4}/json?token=${TOKEN}`)
      const json = await request.json();
      console.log(json);
      initData = {...initData, hostname: json.hostname, org: json.org, timezone: json.timezone};
      setIPData(initData);
    }

    React.useEffect(() => {
      document.title = "Kenya Safari Specialist and a Professional Safari Guide in flora and fauna"; 
      console.log('About Us!!')
      getData();
      console.log('ipData:= ' + ipData); 
    }, []);

    return (
        <Card className="InnerCard" fontColor="black" >
           <h3>Africa Safari</h3>
           <h4>Your IP Address is</h4>
           <h4>{ipData.IPv4}</h4>
           <h4>The most out-there tour anywhere</h4>
           <p>Its name means "sunny place" in the Berber tongue, but "Africa" may as well be a synonym for "vastness".
              A truly massive continent comprising over 20% of the planet’s available land, Africa is home to the world’s 
              largest desert, its longest river, its hottest temperatures, and hundreds of dialects and cultures spread 
              among a billion people. But as mind-boggling as it seems at first, you’ll be amazed how intimate it feels 
              once you get to know it. This is adventure’s last great frontier. Come blaze some trails.</p>
           <h4>About Us!</h4>
           <p>16 years in the Safari industry offered an opportunity to gain a wealth of experience, knowledge, 
              enthusiasm and immense passion. Today Tufayn Mangal stands proud as a Professional Photographer,
              Africa Safari Specialist and a Professional Safari Guide in flora and fauna.</p>
           <p>Our Safari products have undergone a thorough research as we want to indulge a safari with real 
              adventure. It’s our objective to involve our clients in daily activities where we share knowledge in 
              wildlife and photography.</p>
           <p>As you Explore our great Destinations we strive to showcase the diversity and the beauty of all 
              it offers. We will go the extra mile to ensure every area visited is met with high expectations and
              results.</p>
           <p style={{textAlign:'left', padding:'10px'}}>  
              <strong>Karibu Sana</strong><br/>
              <strong>Explore Safaris by Maji Ltd</strong>
           </p> 
           <ul className="vList">          
              {names.map((name, i) => <li key={i}>{name}</li>)}
           </ul>
           <button className="lg-button btn-primary" onClick={() => setNames(prev => [...prev, "frank"])}>Add Frank</button>
        </Card>
    )
}

export default AboutUs