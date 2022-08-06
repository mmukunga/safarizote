import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Select} from "./Components";
import  {SmartForm} from './SmartForm';

   const defaultValues = {id:0, value: '¤', label: '--Select--', icon: '🥺' };

   const ProtectedLink = () => {
     const navigate = useNavigate();

     const secureOptions = [
        {id:0, value: '/vanila', label: '-Select One-', icon: '🤔' },
        {id:1, value: '/tipping', label: 'Tipping', icon: '🎲' },
        {id:2, value: '/shoppings', label: 'Shopping', icon: '🛍️' },
        {id:3, value: '/stocks', label: 'Stock Market', icon: '📈' },
        {id:4, value: '/backUps', label: 'Dir BackUp', icon: '💾' },  
        {id:5, value: '/errorLog', label: 'Error Logs', icon: '⚠️' }  
      ];
        
    const navigateTo = (data) => {
       console.log(data);
       navigate(`${data}`);
    }
    
    const onSubmit = data => {
       navigateTo(data);
    };

    return (
       <div className="navform">
         <SmartForm defaultValues={defaultValues} onSubmit={onSubmit}>
            <Select name="authedUrl" options={secureOptions} />
         </SmartForm>
       </div>
    );
  }

  export default ProtectedLink;