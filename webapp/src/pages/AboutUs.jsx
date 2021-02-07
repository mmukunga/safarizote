import React, { useState } from 'react';
import Card from './Card';

const AboutUs = () => {
    const [names, setNames] = useState(["joe", "steve", "carol"])

    return (
        <Card title="About Us!!" text="We do Go-Downs">
            <ul className="vList">          
                { names.map((name, i) => <li key={i}>{name}</li>) }
            </ul>
            <button onClick={() => setNames(prev => [...prev, "frank"])}>Add Frank</button>
        </Card>
    )
}

export default AboutUs