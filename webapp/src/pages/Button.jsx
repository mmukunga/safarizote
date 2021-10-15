import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function SwitchButton() {
  const theme = React.useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const switchToggle = () => {
    if (darkMode) {
      theme.dispatch({ type: "LIGHTMODE" });
    } else {
      theme.dispatch({ type: "DARKMODE" });
    }
  };
 
  return ( 
    <label className="toggle-switch">
     <input type="checkbox" checked={darkMode} onChange={switchToggle} />
    <span className="switch" />
  </label>
  );
}