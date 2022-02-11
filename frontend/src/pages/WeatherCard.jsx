
import React from "react";
import moment from 'moment';
import Card from './Card';

const WeatherCard = ({ data }) => {
    
    const refresh = () => {
        window.location.reload();
      }

    return (
    <Card className="Weather" styleProps={{width: '49%'}} title="Weather Card"> 
        <div className="top">
            <p className="header">{data.name}</p> 
            <button className="button" color='blue' icon='refresh' onClick={refresh} />
        </div>
        <div className="flex">
            <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
            <p className="description">{data.weather[0].description}</p>
        </div> 
        <div className="flex">
            <p className="temp">Temprature: {data.main.temp} &deg;C</p>
            <p className="temp">Humidity: {data.main.humidity} %</p>
        </div>
        <div className="flex">
            <p className="sunrise-sunset">Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p className="sunrise-sunset">Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
    </Card>
    );
}

export default WeatherCard;