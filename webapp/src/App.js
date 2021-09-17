import React, { useState } from "react";
  
const App = () => {
  const [count, setRandomCount] = 
    useState(function generateRandomInteger() {
    return Math.floor(Math.random() * 100);
  });
  function clickHandler(e) {
    setRandomCount(Math.floor(Math.random() * 100));
  }
  return (
    <div style={{margin: 'auto', width: 100, display: 'block'}}>
      <h1> {count} </h1>
        
      <p>
        <button onClick={clickHandler}> Click </button>
      </p>
  
    </div>
  );
}
  
export default App