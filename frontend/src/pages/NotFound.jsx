import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{border:'2px solid red'}}>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotFound;