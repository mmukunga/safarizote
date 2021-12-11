import React, { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const initialState = {
  darkMode: false,
  count: 0,
  pageView: 'themeContext.jsx'
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case "LIGHTMODE":
      return { darkMode: false };
    case "DARKMODE":
      return { darkMode: true };
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };  
    case "PAGEVIEW":
      return {
        ...state,
        pageView: action.pageView,
      };    
    default:
      return state;
  }
};

export function ThemeProvider(props) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return <ThemeContext.Provider value={{ state, dispatch }}>{props.children}</ThemeContext.Provider>;
}