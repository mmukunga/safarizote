import React, { useState } from 'react'

const Weather = () => {
    const [names, setNames] = useState(["joe", "steve", "carol"])
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/api/countries')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, []);

    console.log(data);

    return (
        <div>
            <div>
                { names.map((name, i) => <h1 key={i}>{name}</h1>) }
            </div>
            <button onClick={() => setNames(prev => [...prev, "frank"])}>Add Frank</button>
        </div>
    )
}

export default Weather