import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';

  const BackUp = () => {
    const [category, setCategory] = React.useState({});
    const [groups, setGroups] = React.useState([
        {parentId: 0, id: 01, name: "C:SimTemps", isChecked: false, dateCreated: new Date()},
        {parentId: 0, id: 02, name: "C:Projects", isChecked: false, dateCreated: new Date()},
        {parentId: 0, id: 03, name: "C:FamilieAlbum", isChecked: false, dateCreated: new Date()},
        {parentId: 0, id: 04, name: "C:Temps", isChecked: false, dateCreated: new Date()}
      ]);

    const [fruites, setFruites] = React.useState([
      { parentId: 1, id: 05, name: "D:SimTemps", isChecked: false, dateCreated: new Date() },
      { parentId: 1, id: 06, name: "E:SimTemps", isChecked: false, dateCreated: new Date() },
      { parentId: 2, id: 07, name: "D:Projects", isChecked: false, dateCreated: new Date() },
      { parentId: 2, id: 08, name: "E:Projects", isChecked: false, dateCreated: new Date() },
      { parentId: 3, id: 09, name: "D:FamilieAlbum", isChecked: false, dateCreated: new Date() },
      { parentId: 3, id: 10, name: "E:FamilieAlbum", isChecked: false, dateCreated: new Date() },
      { parentId: 4, id: 11, name: "D:Temps", isChecked: false, dateCreated: new Date() },
      { parentId: 4, id: 12, name: "E:Temps", isChecked: false, dateCreated: new Date() }
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
        .filter(f => f.parentId === id)
        .forEach(fruite => {
          fruite.isChecked = event.target.checked;
        });
        setFruites(fruitesTemp);
    };

    const handleCheckChieldElement = event => {
      let fruitesTemp = [...fruites];
      fruitesTemp.forEach(fruite => {
        if (`${fruite.parentId}-${fruite.id}` === event.target.value)
          fruite.isChecked = event.target.checked;
      });
      setFruites(fruitesTemp);
    };

    const handleSubmit = (e) => {
      console.log("triggered");
      //...submit to API or something
      e.preventDefault();

      let fruitesTemp = [...fruites];
      fruitesTemp.filter(f => f.isChecked === true);

      console.log("1.SELECTED");
      console.log(fruitesTemp);
      console.log("2.SELECTED");

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
                {fruites.filter(fruit => fruit.parentId === item.id).map((fruite, index) => {
                    return (
                      <CheckBox
                        key={`${item.id}-${fruite.id}`}
                        handleCheckChieldElement={handleCheckChieldElement}
                        {...fruite}
                        value={`${item.id}-${fruite.id}`}
                        label={fruite.name}
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