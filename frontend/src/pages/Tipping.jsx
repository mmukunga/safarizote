import React, { useState, useContext } from 'react';
import {LogContext} from "./LogContext";
import Card from "./Card";
import axios from 'axios';

const Tipping = () => {
  const [kuppong, setKuppong] = useState();
  const context = React.useContext(LogContext);
  const log = context.log;
  const persistLog =  context.persistLog;

  const lagKuppong = (e) => {
    axios.get('/api/lagKuppong').then(response => {
       setKuppong(response.data.Maji);
    }).catch(error => {  
      const path='/api/lagKuppong';  
      persistLog(error, path)
  });
 };

  React.useEffect(() => {
    axios.get('/api/lagKuppong').then(response => {
       setKuppong(response.data.Maji);
    }).catch(error => {     
      const path='/api/lagKuppong';  
      persistLog(error, path);
    });
  }, []); 

 const Row = (props) =>{
   const {key, data } = props;
   return (
    <div  className={(key%2==0)?"tr":"tr odd"}>
        <div className='td'>{data.R[0]}</div>
        <div className='td'>{data.R[1]}</div>
        <div className='td'>{data.R[2]}</div>
        <div className='td'>{data.R[3]}</div>
        <div className='td'>{data.R[4]}</div>
        <div className='td'>{data.R[5]}</div>
        <div className='td'>{data.R[6]}</div>
      </div>
  )
 }

 return (
    <Card title="Tipping - Ferdigutfylt, 10 rekker" className="Card">
        <a href="#" onClick={(e) => lagKuppong(e)} className="link"> Click here for kuppong </a>
        <div className="table">
          <div className='th'>
            <div className='td'>C1</div>
            <div className='td'>C2</div>
            <div className='td'>C3</div>
            <div className='td'>C4</div>
            <div className='td'>C5</div>
            <div className='td'>C6</div>
            <div className='td'>C7</div>
          </div>
            {kuppong && kuppong.map((x,i) => (<Row key={i} data={x}/>))}
        </div>
     </Card>
 );
}

export default Tipping;