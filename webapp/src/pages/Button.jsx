import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function SwitchButton({isToggled, onToggle}) {
  const theme = React.useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const switchToggle = () => {
    onToggle();
    if (darkMode) {
      theme.dispatch({ type: "LIGHTMODE" });
    } else {
      theme.dispatch({ type: "DARKMODE" });
    }
  };
 
  return ( 
    <label className="toggle-switch">
      adsda <input type="checkbox" checked={isToggled} onChange={switchToggle} />  gdfgdfg
    <span className="switch" />
  </label>
  );
}