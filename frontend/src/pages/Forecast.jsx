import React, { useState } from 'react'
import Card from './Card';
import axios from 'axios';


const Forecast = (props) => {
  const {data, query} = props;
    const {list} = data;
    const [forecast, setForecast] = useState([]);
    
    React.useEffect(() => {
      const fetchData = async () => {
        let response = await axios.post('/api/forecast', query); 
        setForecast(response.data);
      };
      fetchData();
    }, [query])

    const WeatherCard = ({dt, temp_min, temp_max, main, icon}) => {
        return (
          <Card className="Weather" styleProps={{width: '18rem'}} title="Weather Card"> 
            <img variant="top" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
            <div>
              <div>{main}</div>
                <p>
                {new Date(dt).toLocaleDateString()} - {new Date(dt).toLocaleTimeString()}
                </p>
                <p>Min: {temp_min}</p>
                <p>Max: {temp_max}</p>
            </div>
          </Card>
        );
    }

    return (
        <div className="forecast">
           {list && list.map(({dt, temp, weather}) => (
                <div key={dt} className="day-forecast">
                    <WeatherCard 
                    temp_max={temp.max} 
                    temp_min={temp.min} 
                    dt={dt * 1000} 
                    main={weather[0].main} 
                    icon={weather[0].icon} 
                  />
                </div>
            ))} 
        </div>
    )
}

export default Forecast;