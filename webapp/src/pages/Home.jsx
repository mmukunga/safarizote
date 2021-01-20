import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Progress from './Progress';

const Home = () => {
    const [data, setData] = useState([]);
    const [clientInfo, setClientInfo] = useState({})
    
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState('');
    const colorArray = ['#7ea9e1', "#ed004f", "#00fcf0", "#d2fc00", "#7bff00", "#fa6900"];

    const randomColor = () => {
      return colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    const randomProgressValue = () => {
      const progressValue = Math.floor(Math.random() * 101);
      setProgress(progressValue);
      const randomProgressColor = randomColor();
      setColor(randomProgressColor);
    }
    
    useEffect(() => {
        // Good!
        document.title = 'Greetings page'; // Side-effect!
        var rProgress = Math.floor(Math.random() * 100) + 1 ;
        setProgress(rProgress);
        const randomProgressColor = randomColor();
        setColor(randomProgressColor);
      }, []);



   useEffect(() => {
      axios.get('https://extreme-ip-lookup.com/json/')
        .then(response => {
            console.log(response);
            setClientInfo(response.data);
        }).catch(e => {
            console.log(e);
        })
    }, []);

    useEffect(() => {
        axios.get('/api/allHits').then(response => {
          console.log(response);
          setData(response.data);
        }).catch(err => {
        console.log(err);
      });
    }, [clientInfo]);

    return (
        <Card title="Home" text="The Home - Sipili!!">
            <div className="vlContainer">
                <Progress 
                  progress={progress}
                  size={500}
                  strokeWidth={15}
                  circleOneStroke='#7ea9e1'
                  circleTwoStroke={color}
                />
                <ul className="vList">          
                    { data.map(item => <li key={item.id}>Link: {item.url} Browser: {item.browser}</li>) }
                </ul>
                <p>Number of Hits: { data.length }</p>
            </div>
        </Card>
    )
}

export default Home