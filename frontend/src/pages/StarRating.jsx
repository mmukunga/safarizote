
import React from "react";

const StarRating = (props) => {
    let { totalStars, starsSelected, onClick } = props; 
    
    const Star = ({ index, selected = false, onClick = f => f }) => {
        return ( <div data-testid={"star"+index} className={selected ? "star selected" : "star"} onClick={onClick}/> );
      };

    const handleClick = (n) => {
        onClick(n);
    };
    
    return (
        <div className="star-rating">
        {[...Array(totalStars)].map((n, i) => {  
            return (<Star
            key={i}
            index={i}
            selected={i < starsSelected}
            onClick={() => handleClick(i + 1)}
            />)
            })}
            <p data-testid="results">
            {starsSelected} of {totalStars} stars
            </p>
        </div>
    );
};
    

export default StarRating;  