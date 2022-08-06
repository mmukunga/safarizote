import React from "react";
import axios from 'axios';

const Emoji = props => {
  const [emoji, setEmoji] = React.useState(null);

  React.useEffect(() => {
    const fetchEmoji = (el) => {
      const headers = {
        'Content-Type': 'application/json; charset=UTF-8'
      };

      axios.get(`/api/findEmoji?name=${el.label}`, {headers}).then((response) => {
        setEmoji(response.data);
      });
    };
    fetchEmoji(props);   
  }, []);

  if (!emoji) {
    return null;
  }

  return (
    <span
        className="emoji"
        role="img"
        aria-label={emoji.name ? emoji.name : ""}
        aria-hidden={emoji.name ? "false" : "true"}
    >              
      <img src={emoji.svgUrl} alt="Maji"/>
    </span>
  )

}

 export default Emoji; 