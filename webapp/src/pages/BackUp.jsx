import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';

  const BackUp = () => {
    const [category, setCategory] = React.useState({});
    const [groups, setGroups] = React.useState([
        {id: 1, name: "C:SimTemps"},
        {id: 2, name: "C:Projects"},
        {id: 3, name: "C:FamilieAlbum"},
        {id: 4, name: "C:Temps"}
      ]);

    const [fruites, setFruites] = React.useState([
      { groupId: 1, id: 1, rolename: 1, value: "D:SimTemps", isChecked: false },
      { groupId: 1, id: 2, rolename: 1, value: "E:SimTemps", isChecked: false },
      { groupId: 2, id: 1, rolename: 1, value: "D:Projects", isChecked: false },
      { groupId: 2, id: 2, rolename: 1, value: "E:Projects", isChecked: false },
      { groupId: 3, id: 1, rolename: 1, value: "D:FamilieAlbum", isChecked: false },
      { groupId: 3, id: 2, rolename: 1, value: "E:FamilieAlbum", isChecked: false },
      { groupId: 4, id: 1, rolename: 1, value: "D:Temps", isChecked: false },
      { groupId: 4, id: 2, rolename: 1, value: "E:Temps", isChecked: false }
    ]);
        
    React.useEffect(() => {
      axios.get('/api/categories').then(response => {
          console.log("1.Categories..");
          console.log(response);
          console.log("2.Categories..");
      }).catch(error => {
          console.log(error);
      });
    }, []);  

    const CheckBox = props => {
      return (
        <li>
          <input
            key={props.id}
            onChange={props.handleCheckChieldElement}
            type="checkbox"
            checked={props.isChecked}
            value={props.value}
          />{" "}
          {props.label}
        </li>
      );
    };

    const handleAllChecked = id => event => {
      let fruitesTemp = [...fruites];
      console.log(event.target.checked);
      fruitesTemp
        .filter(f => f.groupId === id)
        .forEach(fruite => {
          fruite.isChecked = event.target.checked;
        });
        setFruites(fruitesTemp);
    };

    const handleCheckChieldElement = event => {
      let fruitesTemp = [...fruites];
      fruitesTemp.forEach(fruite => {
        if (`${fruite.groupId}-${fruite.id}` === event.target.value)
          fruite.isChecked = event.target.checked;
      });
      setFruites(fruitesTemp);
    };

    const handleSubmit = (e) => {
      console.log("triggered");
      //...submit to API or something
      e.preventDefault();
      axios.post("/api/backUp", {
          name: 'Arkiv',
          dateCreated: new Date(),
          parent: null
        })
        .then((response) => { 
          console.log("1.BackUp..");
          console.log(response);
          console.log("2.BackUp..");
        });

      setCategory({});
      console.log(category + " Submited OK!!");
  
    };

    return (
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
          <strong>Tree BackUp</strong>
          <h3> Check and Uncheck All Example </h3>
          <form onSubmit={handleSubmit}>
          <div className="BackUps">
          {groups.map(item => (
            <div>
              <input type="checkbox" onChange={handleAllChecked(item.id)} value="checkedall"/>{" "}
              {item.name}
              <ul>
                {fruites.filter(fruit => fruit.groupId === item.id).map((fruite, index) => {
                    return (
                      <CheckBox
                        key={`${item.id}-${fruite.id}`}
                        handleCheckChieldElement={handleCheckChieldElement}
                        {...fruite}
                        value={`${item.id}-${fruite.id}`}
                        label={fruite.value}
                      />
                    );
                  })}
              </ul>
            </div>
          ))}
          </div>
          <button type="submit">Submit</button>
          </form>
      </Card>
    );
  }
  export default BackUp;  