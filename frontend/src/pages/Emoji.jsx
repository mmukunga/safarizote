import React from "react";
import axios from 'axios';
import {LogContext} from "./LogContext";

const Emoji = props => {
  const [emoji, setEmoji] = React.useState({name:'', svgUrl:'', image:null});
  const [isLoading, setIsLoading] = React.useState(true);
  const context = React.useContext(LogContext);
  const log = context.log;
  const persistLog =  context.persistLog;
 
  const fetchData = async (el) => {
    return await axios.get(`/api/findEmoji?name=${el.label}`)
      .then((response) => {
          setEmoji(state => ({
              ...state,
              ...response.data
          }));
          return true;
      }).catch((error) => {
          const path= '/api/findEmoji';
          persistLog(error, path);
      });
  }

  React.useEffect(() => {
    const fetchEmoji = async (el) => {
      let success = await fetchData(el); 
      if (success) {
        setIsLoading(false);
      } else {
        console.log('error.emoji');
      } 
    };
    fetchEmoji(props);  
  }, []);

  if (isLoading) {
    return 'LOADING..'
  }

 const label = (props.label=='Coffee')? ' Buy Me Coffee':props.label;

  return (
    <div className="table-wrap">
        <span role="img"
            aria-label={emoji.name ? emoji.name : ""}
            aria-hidden={emoji.name ? "false" : "true"}>              
          <img src={`data:image/jpeg;base64,${emoji.image}`} alt={emoji.name}/> 
        </span> 
        <span>
          {label}
        </span>
    </div>
  )
}

export default Emoji; 