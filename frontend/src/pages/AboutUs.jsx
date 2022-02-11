import React, { useState } from "react";
import axios from 'axios';
import Card from './Card';
import StarRating from './StarRating';
import BarChart from "./BarChart";

const About = () => {
    const [ratinglist, setRatinglist] = React.useState([]);
    const [userRating, setUserRating] = useState({ rating: 0 });
    const [chartData, setChartData] = useState({ 
      name: "Bar Chart",
      labels: ['A', 'B', 'C', 'D'],
      values: [1, 2, 3, 4] 
    });


    const getColumn = (matrix, col) => {
      var column = [];
      for (var i = 0; i < matrix.length; i++){
         column.push(matrix[i][col]);
      }
      return column; 
   }


    React.useEffect(() => {
      const getDataset = async () => {
        try {
          const response = await axios.get('/api/getStatistics');
          var labels = getColumn(response.data, 0);
          var data   = getColumn(response.data, 1);
          setChartData({
            ...chartData,
            labels: labels,
            values: data
          });
        } catch (error) {
          console.error(error);
        }
      }
  
      getDataset();
    }, []);

    React.useEffect(() => {
      const fetchRatings = async () => {
        try {
          const {data: response} = await axios.get('/api/ratings');
          setRatinglist(response.data);
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchRatings();
    }, []);

    const handleRating = rating => {
      setUserRating(prevState => ({
          ...prevState,
          rating: rating
      }));
    };

    const saveRating = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('rating', userRating.rating);
      axios.post('/api/saveRating', formData).then((response) => {
        setRatinglist(response.data);
      });
    };

    return (
    <Card className="AboutUs" styleProps={{width: '98%'}} title="About Us">
      <div className="container">
        <strong>Welcome to the About page </strong>
        <p className="second">
          <b>Hi! I'm Simon!</b> <br/>I'm a freelance consultant with a wealth of experience in the IT-industry.<br/> 
          I spent the last years as a frontend consultant, providing advice and help, coaching and 
          training on JavaScript and React. Let's get in touch! <br/><i>Simon Mukunga</i>
        </p>
        <p>{ratinglist}</p>
        <form>
          <div className="row"  style={{border:'2px solid silver', margin:' 0 auto', padding:'5px'}}>
            <div className="col-25">
                <label htmlFor="rating">Star Us?😀</label>
            </div>
            <div className="col-75">
              <StarRating totalStars={5} starsSelected={userRating.rating} onClick={handleRating}/>                
              <input type="submit" onClick={saveRating} value="Submit Rating"/>
            </div>
          </div>
        </form>
        
        <BarChart data={chartData} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </Card>
    );
};

export default About;