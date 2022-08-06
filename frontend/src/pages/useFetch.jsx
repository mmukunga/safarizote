import React from "react";
import axios from 'axios';
import {LoggerContext} from "./LoggerProvider";

export const useFetch = (url) => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const { persistLog } = React.useContext(LoggerContext);
    React.useEffect(() => {
        setLoading(true);
        axios.get(url).then((response) => {
          setData(response.data);
          setLoading(false);
        }).catch((e) => {
          e.httpUrl = url;
          persistLog(e);
          setLoading(false);
        });
    }, [url, persistLog]);

    return { data, loading };
};