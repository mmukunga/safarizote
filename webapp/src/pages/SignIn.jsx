import React from 'react';
import axios from 'axios';
import Card from './Card';
import { Redirect } from "react-router-dom";


const SignIn = (props) => {
    const [count, setCount] = useState(0);

    const nameEl = React.useRef(null);
    const { from } = props.location.state || { from: { pathname: "/" } };

    const handleSubmit = e => {
      e.preventDefault();
      alert(nameEl.current.value);
      setCount(prevCount => prevCount + 1);
    };
    
    console.log('HER:= ' + nameEl);   
    console.log('COUNT:= ' + count);
    console.log('FROM:= '  + from);

    if (count > 5) {
        console.log(userToken);
        console.log('SignIn FROM:= ' + from);
        return <Redirect to={from} />;
    }  

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