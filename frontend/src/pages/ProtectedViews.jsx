import React from 'react';
import {useNavigate} from 'react-router-dom';
import {SelectAuth} from "./Components";

   const defaultValues = { id: 0, value: '¤', label: '--Select--', icon: '🥺' };

   const ProtectedViews = () => {
     const navigate = useNavigate();

     const secureOptions = [
        {id:0, value: '¤', label: '-Select One-', icon: '🤔' },
        {id:1, value: '/prices', label: 'Price', icon: '💰' },
        {id:2, value: '/tipping', label: 'Tipping', icon: '🎲' },
        {id:3, value: '/shoppings', label: 'Shopping', icon: '🛍️' },
        {id:4, value: '/stocks', label: 'Stock Market', icon: '📈' },
        {id:5, value: '/backUps', label: 'Dir BackUp', icon: '💾' },  
        {id:6, value: '/errorLog', label: 'Error Logs', icon: '⚠️' }  
      ];
        
    const navigateTo = (data) => {
       console.log(data);
       navigate(`${data}`);
    }
    
    const onSubmit = data => {
      console.log("onSubmit!!");
      console.log(data);
      console.log(data.target);
      const redirectTo = data.target.value;
      console.log(redirectTo);
       navigateTo(redirectTo);
    };

    return (   
      <div key="001" className="navlink">
        <select id="color" aria-label="secure" onChange={onSubmit}>  
          {secureOptions.map((option) => (
            <option key={option.id} value={option.value}>{option.icon} {option.label}</option>
          ))} 
        </select>
      </div>
    );
  }

  export default ProtectedViews;