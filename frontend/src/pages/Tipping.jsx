import React, { useState, useContext } from 'react';
import {ErrorContext} from "./ErrorProvider";
import Card from "./Card";
import axios from 'axios';

const min = 1;  //inclusive
const max = 35; //exclusive

const Tipping = () => {
  const [status, setStatus] = useState({});
  const [kuppong, setKuppong] = useState();
  const { errorMsg, handleError } = useContext(ErrorContext);

  const lagKuppong = (e) => {
    axios.get('/api/lagKuppong').then(response => {
       setKuppong(response.data.Maji);
    }).catch(error => {  
      error.httpUrl='/api/lagKuppong';  
      handleError(error);
  });
 };

  React.useEffect(() => {
    axios.get('/api/lagKuppong').then(response => {
       setKuppong(response.data.Maji);
    }).catch(error => {     
      error.httpUrl='/api/lagKuppong';  
      handleError(error);
    });
  }, []); 

 const Row = (props) =>{
   const { data } = props;
   return (
    <div className='tr'>
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