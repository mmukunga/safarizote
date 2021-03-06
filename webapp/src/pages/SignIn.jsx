import React from 'react';
import axios from 'axios';
import Card from './Card';
import { Redirect } from "react-router-dom";


const SignIn = (props) => {
    const nameEl = React.useRef(null);
  
    const handleSubmit = e => {
      e.preventDefault();
      alert(nameEl.current.value);
    };
    
console.log('HER');

    return (
       <form onSubmit={handleSubmit}>
         <label>Name:
           <input type="text" ref={nameEl} />
         </label>
         <input type="submit" name="Submit" />
       </form>
     );
  }


  export default SignIn;