import React from "react";
import axios from 'axios';
import {LogContext} from "./LogContext";

export const useFetch = (url) => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const context = React.useContext(LogContext);
    const log = context.log;
    const persistLog =  context.persistLog;
    React.useEffect(() => {
        setLoading(true);
        axios.get(url).then((response) => {
          setData(response.data);
          setLoading(false);
        }).catch((e) => {
          const path = url;
          persistLog(e, path);
          setLoading(false);
        });
    }, [url, persistLog]);

    return { data, loading };
};