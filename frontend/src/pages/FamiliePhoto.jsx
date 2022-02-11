import React from 'react';
import Card from './Card';
// src/FamiliePhoto.js
const FamiliePhoto = (props) => {
    const { data } = props;
    return (
        <Card className="FamiliePhoto" styleProps={{width:'49%'}} title="FamiliePhoto">
        <h1>Original FamiliePhoto</h1>
        <div className="container"> 
        <div><img src={data.path} alt={data.path}/></div>
        <div className="safariDesc">
            <div data-testid="title">{data.name}</div>
        </div>
        </div>    
        </Card>
    )
}

export default FamiliePhoto;