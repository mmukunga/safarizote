import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/api/hello')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            Home
            { data.map(item => <p key={item.id}>Link: {item.url} Browser: {item.browser}</p>) }
        </div>
    )
}

export default Home