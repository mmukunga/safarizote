import React, { useState } from 'react';
import Card from './Card';

const AboutUs = () => {
    const [names, setNames] = useState(["joe", "steve", "carol"])

    return (
        <Card cardWidth="600" fontColor="black" backgroundColor="white">
            <p>About Us!</p>
            <ul className="vList">          
                { names.map((name, i) => <li key={i}>{name}</li>) }
            </ul>
            <button onClick={() => setNames(prev => [...prev, "frank"])}>Add Frank</button>
        </Card>
    )
}

export default AboutUs