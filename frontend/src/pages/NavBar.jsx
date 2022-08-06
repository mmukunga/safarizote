import React from "react";
import { makeStyles } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { SafariContext } from "./SafariContext";
import { ThemeContext }  from './ThemeProvider';
import { ThemeButton } from './Components';
import  ProtectedLink from './ProtectedLink';
import Emoji from "./Emoji";

const Navbar = () => {
    const context = React.useContext(SafariContext);
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    const cartItemNumber = context.cart.reduce((count, curItem) => {
      return count + curItem.quantity;
    }, 0);

    const checked = React.useState(theme === "dark" ? true : false);
    
    const data = [
      { name: "/", label: 'Safaris'},
      { name: "/contactUs", label: 'Contact Us'},
      { name: "/aboutUs", label: 'About Us'},
      { name: "/cart", label: `Cart (${cartItemNumber})`},
      { name: "/weather", label: 'Weather'},
      { name: "/login", label: 'Login'},
    ];
    
    const color = theme === "light" ? "#333" : "#FFF";
    const backgroundColor = theme === "light" ? "#FFF" : "#333";

    const useStyles = makeStyles({
      root: {
         color: color,
         background: backgroundColor,
         whiteSpace: 'nowrap'
      }
    });

    const classes = useStyles();
    const emojiLabel = (label) => {return(label.includes('Cart')? 'Cart': label)};
    return (
        <header className="App-header"> 
        <div className={`navbar ${classes.root}`}>
            {data.map((item) => (
              <NavLink key={item.name} to={item.name} className="navlink">
                <Emoji label={emojiLabel(item.label)}/> {item.label}
              </NavLink>
            ))}  
          <ProtectedLink />
          <ThemeButton checked={checked} toggleTheme={toggleTheme}/>
        </div>
      </header>
    );
};

export default Navbar;