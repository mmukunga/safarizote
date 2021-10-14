import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function SwitchButton() {
  const [isToggled, setIsToggled] = React.useState(false);
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const onToggle = () => {
    setIsToggled(!isToggled);
    if (darkMode) {
      theme.dispatch({ type: "LIGHTMODE" });
    } else {
      theme.dispatch({ type: "DARKMODE" });
    }
  };
 
  return ( 
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled}  className={`btn ${darkMode ? "btn-dark" : "btn-light"}`} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
}