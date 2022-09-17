import React from "react";
import { useForm } from "react-hook-form";

const StarRating = ({ratings, setStatus }) => {
  const { watch, handleSubmit, formState: { errors }, setValue } = useForm({
    mode: "onSubmit",
    defaultValues: {
      quantity: 0
    }
  });

  const quantity = watch("quantity");

  const enable = (id) => {
    if (id <= quantity) {
      return true;
    }
    return false;
  };

  const handleClick = event => {
    setValue("quantity", event.currentTarget.id);
  };

  function post(url, data) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  }
  
  const onSubmit = (data) => {
    const rt = ratings.find(r => r.stars === parseInt(quantity));
    const rating = {
       id: rt.id,
       stars: rt.stars, 
       description: rt.description, 
       count: rt.count+1
    };
    
    post("/api/saveRating", rating).then((resp) => {
      setStatus('Changed');
      resp.status === 200 ? setStatus("Success") : setStatus("Error");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="StarsDiv">
        <div className="block box">
          <div id="1" onClick={handleClick} className={enable(1) ? "redStar" : "star"}/> &nbsp;
          <div id="2" onClick={handleClick} className={enable(2) ? "redStar" : "star"}/> &nbsp;
          <div id="3" onClick={handleClick} className={enable(3) ? "redStar" : "star"}/> &nbsp;
          <div id="4" onClick={handleClick} className={enable(4) ? "redStar" : "star"}/> &nbsp;
          <div id="5" onClick={handleClick} className={enable(5) ? "redStar" : "star"}/>
        </div>
        <div className="block rightbox">
            <input type="submit" />
        </div>
      </div>
      <span>Selected: {quantity} of {5} stars </span>
    </form>
  );  
};

export { StarRating };