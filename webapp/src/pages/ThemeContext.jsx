import React, { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const initialState = {
  darkMode: false,
  count: 0,
  userId:'127.0.0.1',
  pageId: 'themeContext.jsx',
  ipInfo: {},
  dateVisited: new Date()
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
    case "PAGE_ID":
      return {
        ...state,
        pageId: action.pageId,
      };    
    case "IP_INFO":
      return {
        ...state,
        ipInfo: action.payload,
      };      
    default:
      return state;
  }
};

export function ThemeProvider(props) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return <ThemeContext.Provider value={{ state, dispatch }}>{props.children}</ThemeContext.Provider>;
}