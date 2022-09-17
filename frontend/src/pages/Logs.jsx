import React, { useState } from 'react';
import {LogContext} from "./LogContext";
import Log from "./Log";
import Pagination from './Pagination';

function Logs() {
    const context = React.useContext(LogContext);
    const data = context.data;
    const addToCart =  context.addToCart;
    const persistLog =  context.persistLog;

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(2);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage);

    console.log(data);

    return (
        <LogContext.Consumer> 
          {context => (   
            <React.Fragment>  
              {context ? (
                <>
                  <Pagination
                    context={{data, addToCart}}
                    RenderComponent={Log}
                    title="Logs"
                    pageLimit={nPages}
                    dataLimit={recordsPerPage}
                  />
                </>
              ) : (
                <h1>No Logs to display</h1>
              )}
            </React.Fragment>
          )}
        </LogContext.Consumer>
      );
}

export default Logs;