import React from "react";
import {SafariContext} from "./SafariContext";
import Safari from "./Safari";
import Pagination from "./Pagination";
import axios from "axios";

const Safaris = () => {
  const [loading, setLoading] = React.useState(true);
  const context = React.useContext(SafariContext);
  const data = context.safaris;
  const addToCart =  context.addToCart;
 
  const post = async (url, data) => {
    const newList = data.map((item) => {
      return {...item, label: 'fieldName' }; 
    });
    return await axios.post(url,  JSON.stringify(newList), {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    });
  }

  React.useEffect(() => {
    const fetchData = async () =>{
      fetch('https://api.github.com/emojis')
      .then(response => response.json())
      .then(data => {
        const temps = Object.entries(data);
        let promises = [{}];
        const requests = temps.map(async val => {
        const entry = { name: val[0], svgUrl: val[1] };
        return entry;
      });

      Promise.all(requests).then((response) => {
          promises = [...response];
          post("/api/saveEmojis", promises).then((response) => {
            /**console.log(response);**/
          }).catch(error => {
            console.log(error);
          });

        }).catch(error => console.log(`Error in promises ${error}`));
      }).catch(error => console.error(error));
    }

    if ( loading ) {
      fetchData();
      setLoading((loading) => !loading);
    }
  }, []);

  return (
    <SafariContext.Consumer>
      {context => (   
        <React.Fragment>  
          {context ? (
            <>
              <Pagination
                context={{data, addToCart}}
                RenderComponent={Safari}
                title="Safaris"
                pageLimit={Math.ceil((context.safaris.length)/2)}
                dataLimit={2}
              />
            </>
          ) : (
            <h1>No Photos to display</h1>
          )}
        </React.Fragment>
      )}
    </SafariContext.Consumer>
  );
};

export default Safaris;
