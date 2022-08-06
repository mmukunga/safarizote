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
const ErrorContext = React.createContext();

const ErrorProvider = (props) => {
  const [errorMsg, setError] = React.useState(defaultMessage);

  const handleError = (error) => {
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
    <ErrorContext.Provider value={{ errorMsg, handleError }}>
      {props.children}
    </ErrorContext.Provider>
  )
}

export {ErrorContext, ErrorProvider}