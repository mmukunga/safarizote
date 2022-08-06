import * as React from 'react';
import { Link } from "react-router-dom";

const Footer = (props) => {
    return (
      <div>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </div>
    );
  }

  export default Footer;