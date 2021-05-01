import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';

  const BackUp = () => {
    const [category, setCategory] = React.useState({});
    const [categories, setCategories] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    //const [fruites, setFruites] = React.useState([]);
        
    React.useEffect(() => {
      axios.get('/api/categories').then(response => {
          console.log(response);
          setCategories([...categories, ...response.data]);
          const grps = response.data.filter(category => category.name.startsWith('C:') == true); 
          const frts = response.data.filter(category => category.name.startsWith('C:') == false); 
          setGroups([...groups, ...grps]);
          setCategories([...fruites, ...grps, ...frts]);
          
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
      alert('1.Checking..');
      let categoriesTemp = [...categories];
      categoriesTemp
        .filter(f => f.parentId === id)
        .forEach(fruite => {
          fruite.isChecked = event.target.checked;
        });
        setCategories(categoriesTemp);
    };

    const handleCheckChieldElement = event => {
      alert('2.CheckingElement..');
      let categoriesTemp = [...categories];
      categoriesTemp.forEach(fruite => {
        if (`${fruite.parentId}-${fruite.id}` === event.target.value)
          fruite.isChecked = event.target.checked;
      });
      setCategories(categoriesTemp);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let selectedItems = [];
      let categoriesTemp = [...categories];
      categoriesTemp.forEach(f => {
        if (f.isChecked === true) { 
          selectedItems = [...selectedItems, f]; 
        }
      });
      console.log(selectedItems);

      axios.post("/api/doBackUp", {
        selectedItems
      }).then((response) => { 
        console.log(response);
      });

      setCategory({});
      console.log(category + " Submited OK!!");
    };

    return (
      <Card className="InnerCard" fontColor="black">
          <strong>Tree BackUp</strong>
          <h3> Check and Uncheck All Example </h3>
          <form onSubmit={handleSubmit}>
          <div className="BackUps">
          {groups.map(group => (
            <div>
              <input type="checkbox" onChange={handleAllChecked(group.id)} value="checkedall"/>{" "}
              {group.name}
              <ul>
                {group.children.map((child, index) => {
                    console.log(child.id + '.child..' + child.name);
                    return (
                      <CheckBox
                        key={`${child.id}-${child.id}`}
                        handleCheckChieldElement={handleCheckChieldElement}
                        {...child}
                        value={`${child.id}-${child.id}`}
                        label={child.name}
                      />
                    );
                  })}
              </ul>
            </div>
          ))}
          </div>
          <div className="row">
            <input type="submit" value="Submit!" className="lg-button btn-primary"/>
          </div>  
          </form>
      </Card>
    );
  }
  export default BackUp;  