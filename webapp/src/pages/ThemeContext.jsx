import React, { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const initialState = {
  darkMode: false,
  count: 0,
  userId:'127.0.0.1',
  pageId: 'themeContext.jsx',
  ipInfo: {
    ip: "84.212.207.12",
    hostname: "cm-84.212.207.12.get.no",
    city: "Oslo",
    region: "Oslo",
    country: "NO",
    loc: "59.9127,10.7461",
    org: "AS41164 Telia Norge AS",
    postal: "0001",
    timezone: "Europe/Oslo",
    readme : "https://ipinfo.io/missingauth"
  },
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
    default:
      return state;
  }
};

export function ThemeProvider(props) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return <ThemeContext.Provider value={{ state, dispatch }}>{props.children}</ThemeContext.Provider>;
}