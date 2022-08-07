import React, {useContext, Fragment} from "react";
import axios from 'axios';
import { useFetch } from "./useFetch";
import { StarRating } from "./StarRating";
import {LoggerContext} from "./LoggerProvider";
import Card from './Card';

const AboutUs = () => {
    const [status, setStatus] = React.useState('');
    const [posts, setPosts] = React.useState([]);
    const { data, loading } = useFetch('/api/ratings');
    const { log, persistLog } = useContext(LoggerContext);
    const [ analytics, setAnalytics] = React.useState([]);
    

    React.useEffect(() => { 
        const fetchAnalytics = async () => {
            try {
              const response = await axios.get('/api/fetchAnalytics');
              setAnalytics(response.data);
            } catch(error){
              error.httpUrl='/api/fetchAnalytics';  
              persistLog(error);
            }
        };

        fetchAnalytics();

    }, []);


    const error = log ? <div>{log}</div> : "";
    React.useEffect(() => { 
        const fetchData = async () => {
            try {
              const response = await axios.get('/api/ratings');
              setPosts(response.data);
              setStatus('');
            } catch(error){
              error.httpUrl='/api/ratings';  
              persistLog(error);
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

    const currentUser = localStorage.getItem("currentUser");
    const user = JSON.parse(localStorage.getItem('user'));
    
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
            <hr/>                       
            <h4>Analytics</h4>
            <div className="table">
                <div className="th">
                    <div className="td">IPv4</div>
                    <div className="td">City</div>
                    <div className="td">Country</div>
                    <div className="td">Count</div>
                </div>
                {analytics.map((item)=> {
                    return (
                    <div key={item.id} className="tr">
                      <div className="td">{item.ipv4}</div>  
                      <div className="td">{item.city}</div>
                      <div className="td">{item.country}</div> 
                      <div className="td">{item.count}</div>
                    </div>
                    );
                })}
            </div>              
            </Fragment>
        </Card>
    );
};

export default AboutUs;