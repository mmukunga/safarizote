import React from 'react';
import moment from 'moment';

const defaultMessage = "App is😀OK👍!";
const customJSON = err => ({
  name: err.name,
  httpUrl: err.httpUrl,
  status: err.response.status,
  statusText: err.response.statusText,
  message: err.message,
  stacktrace: err.stack,
  timestamp: moment()
});

const url = "/api/logger";
const LoggerContext = React.createContext();

const LoggerProvider = (props) => {
  const [log, setError] = React.useState(defaultMessage);

  const persistLog = (error) => {
    setError(error.message);
    fetch('/api/saveError', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        method: "POST",
        body: JSON.stringify(customJSON(error))
    })
}

  return (
    <LoggerContext.Provider value={{ log, persistLog }}>
      {props.children}
    </LoggerContext.Provider>
  )
}

export {LoggerContext, LoggerProvider}