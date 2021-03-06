import React, { useState } from 'react';

  const List = ({ listName, list = [], handleCheck })  => {
    const [isChecked, setIsChecked] = useState({});
    console.log('21.AboutUs');
    const handleChecked = e => {
        setIsChecked({ ...isChecked, [e.target.name]: e.target.checked });
        handleCheck(isChecked);
    }
    const ListItem = ({key, item = {}, handleChecked }) => {
        return (
          <li>
            <label>{key} {item.title}</label>
            <input type="checkbox" name={item.title} onChange={e => handleChecked(e)}/>
          </li>
        );
    };

    return (
      <div className="List">
        {listName}
        <ul className="myList">
            {list.map((item, index) => (
            <ListItem key={index} item={item} handleChecked={handleChecked}/>
            ))}
        </ul>
      </div>  
    );
  };

export default List;