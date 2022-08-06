import React from "react";
import axios from 'axios';
import {ErrorContext} from "./ErrorProvider";

export const useFetch = (url) => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const { handleError } = React.useContext(ErrorContext);
    React.useEffect(() => {
        setLoading(true);
        axios.get(url).then((response) => {
          setData(response.data);
          setLoading(false);
        }).catch((e) => {
          e.httpUrl = url;
          handleError(e);
          setLoading(false);
        });
    }, [url, handleError]);

    return { data, loading };
};