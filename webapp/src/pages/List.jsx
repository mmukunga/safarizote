import React from "react";

  const List = ({ listName, list = [] })  => {
    const [isChecked, setIsChecked] = useState({});

    const handleCheck = e => {
        setIsChecked({ ...isChecked, [e.target.name]: e.target.checked });
        props.handleCheck(isChecked);
    }
    const ListItem = ({ item = {} }) => {
        return (
          <li>
            <label>{item.title}</label>
            <input type="checkbox" name={item.title} checked={allChecked ? true : isChecked[item.title]} onChange={e => handleCheck(e)}/>
          </li>
        );
    };

    return (
      <div className="List">
        {listName}
        <ul className="myList">
            {list.map((item, index) => (
            <ListItem key={index} item={item.title} handleClick={props.handleClick}/>
            ))}
        </ul>
      </div>  
    );
  };

export default List;