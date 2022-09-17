import React, {useContext} from 'react';
import axios from 'axios';
import moment from 'moment';
import countryList from 'react-select-country-list';
import { City } from 'country-state-city';
import {Submit, SelectWrapper} from "./Components";
import Emoji from "./Emoji";
import { SmartForm } from './SmartForm';
import Card from "./Card";
import { LogContext } from "./LogContext";

const defaultValues = {
  country: 'KE',
  city: 'Nairobi'
};

const countryFields = [
  "nativeName",
  "population",
  "region",
  "subregion",
  "capital",
  "topLevelDomain",
  "currencies",
  "languages",
  "borders",
  "name",
  "flag",
];

const Weather = () => {
  const [status, setStatus] = React.useState('');
  const [weatherData, setWeatherData] = React.useState({current:{}, forecast:{}});
  const [imageIcon, setImageIcon] = React.useState('');
  const countries = React.useMemo(() => countryList().getData(), []);
  const [cities, setCities] = React.useState([]);
  const [state, setState] = React.useState('KE');
  const [flag, setFlag] = React.useState();
  const context = React.useContext(LogContext);
  const log = context.log;
  const persistLog =  context.persistLog;

  const kelvinToCelcius = (k) => {
    return (k - 273.15).toFixed(2);
  };

  const createQueryString = (query, params) => {
    const joinedParams = params.join(",");
    return `?${query}=${joinedParams}`;
  }


  React.useEffect(() => {
    const data = {...defaultValues};
    getCurrent(data).then((response) =>{
      setStatus((prev) => ({...prev, response}));
      getForecast(data).then((response) =>{
        setStatus((prev) => ({...prev, response}));
      });
    }).catch(error => {
      return error;
    });  
  }, []);


  const getCountry = async (code, fields) => {
    const apiNameEndpoint = `${process.env.REACT_APP_COUNTRY_URL}/v2/alpha/${code}`;
    if (!fields) return axios.get(apiNameEndpoint);
    const queryString = createQueryString("fields", fields);
    return axios.get(apiNameEndpoint + queryString);
  }

  const getFlag = async (id, fields) => {
    try {
      const { data } = await getCountry(id, fields);
      const { name, flag, borders } = data;
      setFlag(() => flag);
    } catch (ex) {
     console.log(ex);
    }
  }

  React.useEffect(() => {
    getFlag(state, countryFields);
  }, [state]);

  const getWeatherData = async (apiUrl, data) => {
    try {
      const response = await axios.post(apiUrl, data);
      if(response.status !== 200) { throw new Error(); }
      return response.data;
    } catch (ex) {
      console.log(ex);
      return ex;
    }
  }

  const getCurrent = async (data) => {
    return getWeatherData('/api/current', data).then((response) =>{
      console.log(response);
      setWeatherData((prev) => ({ ...prev, current: response.weather }));
      setImageIcon(response.weather[0].icon);
      return 'Weather OK!';
    }).catch(error => {
      return error;
    });
  };

  const getForecast = async (data) => {
    getWeatherData('/api/forecast', data).then((response) =>{
      console.log(response);
      setWeatherData((prev) => ({ ...prev, forecast: response }));
      setImageIcon(response.data.weather[0].icon);
    }).catch(error => {
      return error;
    });
  };

  const onSubmit = data => {
    getCurrent(data).then((response) =>{
      setStatus((prev) => ({...prev, response}));
      getForecast(data).then((response) =>{
        setStatus((prev) => ({...prev, response}));
      });
    }).catch(error => {
      return error;
    });  
  };
  

  React.useEffect(() => {
    const Cities = City.getAllCities();
    const nodes = Cities.filter((city) => city.countryCode === state);
    var cities = [];

    nodes.forEach((d) => {
      cities.push({
          value: d.name,
          label: d.name
        });
      });
    setCities(cities);
  }, [state]);  

   const hasLabel = {label: false};

  return (
    <Card title="Weather" className="Card">
      <SmartForm defaultValues={defaultValues} postData={setState} onSubmit={onSubmit}>
          <SelectWrapper name="country" labelObj={hasLabel} options={countries}/>
          <SelectWrapper name="city" labelObj={hasLabel} options={cities}/>
          <div className="btn"><Submit name="Submit" type="submit"><Emoji label='Send'/>Submit</Submit></div>   
      </SmartForm>
      {status.response}
      <Card title="Current" className="Card">
        <img src={flag} alt="" className="country-flag"/>
        <p className="header">{weatherData.current.name}</p>      
        <p><img src={imageIcon === '' ? null :`http://openweathermap.org/img/w/${imageIcon}.png`} alt='Loading..'/> </p>  
        <p className="day">Day: {moment().format('dddd')}</p>            
        <p className="temp">Temprature: {weatherData.current.main && weatherData.current.main.temp} &deg;C</p> 
        <p>Day:  {moment().format('dddd')}</p>
        <p>Date: {moment().format('LL')}</p>         
      </Card>
      <Card title="Forecast"  className="Card">
        {(weatherData.forecast.list != null)?
            <div className="flex-container">
                {weatherData.forecast.list.map((item, idx) =>  
                  <div key={idx} className="flex-child">        
                    <Card title="" className="Card">
                      <span className="cssDate">{(new Date((item.dt)*1000)).toISOString()}</span>
                      <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt=''/>
                      <p>Forecast: {kelvinToCelcius(item.temp.day)}°C<br/>
                        Min: {kelvinToCelcius(item.temp.min)}°C Max :{kelvinToCelcius(item.temp.max)}°C</p>
                    </Card>
                  </div>
                )}
            </div>
          :
          <strong>No Forecast!😞</strong>
          }
      </Card>
    </Card>
  );
}

export default Weather;