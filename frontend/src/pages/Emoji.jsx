import React from "react";
import axios from 'axios';
import {LogContext} from "./LogContext";

const Emoji = ({ label, ...props }) => {
  const [emoji, setEmoji] = React.useState({name:'', svgUrl:'', image:null});
  const [isLoading, setIsLoading] = React.useState(true);
  const context = React.useContext(LogContext);
  const log = context.log;
  const persistLog =  context.persistLog;
 
  const fetchData = async (label) => {
    return await axios.get(`/api/findEmoji?name=${label}`)
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
    fetchEmoji(label);  
  }, []);

  const text = (props.rel==undefined) ? <span style={{width:'100%', marginLeft:'5px'}}>Buy Me Coffee</span> : <span>{label}</span>;

  if (isLoading) {
    return 'LOADING..'
  }
  //https://www.htmlelements.com/docs/progressbar/
  return (
    <div className="table-wrap">
        <span role="img"
            aria-label={emoji.name ? emoji.name : ""}
            aria-hidden={emoji.name ? "false" : "true"}>              
          <img src={`data:image/jpeg;base64,${emoji.image}`} alt={emoji.name}/> 
        </span>       
        {text}
    </div>
  )
}

export default Emoji; 