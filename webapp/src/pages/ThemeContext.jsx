import React, { createContext, useReducer } from "react";
import {default as UUID} from "node-uuid";

export const ThemeContext = createContext();

const initialState = {
  darkMode: false,
  count: 0,
  clientId: UUID.v4(),
  trackingId: 'location.pathname',
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
    case "EVENT_TRACKER":
      return {
        ...state,
        trackingId: action.trackingId,
      };    
    case "IP_TRACKER":
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