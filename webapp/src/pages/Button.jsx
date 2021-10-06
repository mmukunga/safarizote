import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function SwitchButton() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const onClick = () => {
    if (darkMode) {
      theme.dispatch({ type: "LIGHTMODE" });
    } else {
      theme.dispatch({ type: "DARKMODE" });
    }
  };
 
  return (
    <input type="button" className={`btn ${darkMode ? "btn-dark" : "btn-light"}`} onClick={onClick} 
        value={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}/>
     
  );
}