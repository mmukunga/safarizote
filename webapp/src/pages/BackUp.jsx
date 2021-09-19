import React, { useState } from "react";
import axios from 'axios';

const BackUp = () => {
  const [name,  setName]  = useState("");
  const [value, setValue] = useState('');
  const [users, setUsers] = useState([]);

  const [items, setItems] = React.useState([]);

    React.useEffect(() => {
      const fetchItems = async () => {
          const response = await axios.get("/api/listAll");
          try {
              console.log(response);
              setItems(items => [...items, ...response.data]);
          } catch (err) {
              console.log(err);
          }
      };

      fetchItems();
    }, []);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Submitting Name ${name}`)
  }
  return (
    <div className='backUp'>
      <h1>BackUp BackUp</h1>
      <form onSubmit={handleSubmit}>
        <select onChange={onChange}>
          {items.map((item, idx) => (
            <option key={idx} value={item}>{item}</option>
          ))}
        </select>
        <div>Input value: {value}</div>
        <label>Frirst Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>Welcome to my backUp!!</p>
      <div className="userList">
            {items && items.map((item, idx) => (
                <li key={idx}>{item}</li>
            ))}
        </div>
    </div>
  );
}

export default BackUp