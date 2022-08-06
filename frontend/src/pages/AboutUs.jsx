import React, {useContext, useState, Fragment} from "react";
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useFetch } from "./useFetch";
import { StarRating } from "./StarRating";
import {ErrorContext} from "./ErrorProvider";
import Card from './Card';

const AboutUs = () => {
    const [status, setStatus] = React.useState('');
    const [posts, setPosts] = React.useState([]);
    const [info, setInfo] = React.useState({});
    const unique_id = uuid();
    const small_id = unique_id.slice(0,8);
    const { data, loading } = useFetch('/api/ratings');
    const { errorMsg, handleError } = useContext(ErrorContext);

    const error = errorMsg ? <div>{errorMsg}</div> : "";
    React.useEffect(() => { 
        const fetchData = async () => {
            try {
              const response = await axios.get('/api/ratings');
              setPosts(response.data);
              setStatus('');
            } catch(error){
              error.httpUrl='/api/ratings';  
              handleError(error);
            }
        };

        if(status.length === 0) {
            if(posts.length === 0) {
                fetchData();
            }
        } else {               
            fetchData();
        }

    }, [status]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (typeof error === 'string' && error !== '') {
        return <h1>{error.message}</h1>;
    }

    return (
        <Card title="About Us" className="Card">
            <Fragment>
            <div className="table">
                <div className="th">
                    <div className="td">Description</div>
                    <div className="td">Stars</div>
                    <div className="td">Count</div>
                </div>
                {posts.map((item)=> {
                    return (
                    <div key={item.id} className="tr">
                      <div className="td">{item.description}</div>
                      <div className="td">{item.id}</div> 
                      <div className="td">{item.count}</div>
                    </div>
                    );
                })}
                <div className="table-caption">
                    <StarRating ratings={data} setStatus={setStatus}/> 
                </div>  
            </div>        
            </Fragment>
        </Card>
    );
};

export default AboutUs;