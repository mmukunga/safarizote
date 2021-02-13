import React, { useState } from 'react';
import Card from './Card';

const AboutUs = () => {
    const [names, setNames] = useState(["Simon Mukunga", "steve", "carol"]);

    return (
        <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
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
           <ul className="vList">          
              { names.map((name, i) => <li key={i}>{name}</li>) }
           </ul>
           <button onClick={() => setNames(prev => [...prev, "frank"])}>Add Frank</button>
        </Card>
    )
}

export default AboutUs