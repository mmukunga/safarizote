import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';

  const BackUp = () => {
    const [category, setCategory] = React.useState({});     
    React.useEffect(() => {
      axios.get("/api/categories").then(response => {
          console.log(response.data[0]);
          setCategory(response.data[0]);
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

    const uncheckArrB = (obj, isChecked) => {

      let initArr = {
        id: obj.id, 
        name: obj.name, 
        isChecked: obj.isChecked, 
        dateCreated: obj.dateCreated, 
        children: obj.children
      };

      console.log(initArr);
      const uncheck = (ar) => {
        ar.isChecked = isChecked;
        ar.children.forEach(val => {
          val.isChecked = isChecked;
          if (Array.isArray(val.children) && val.children.length > 0) {
              uncheck(val);
          }
        })
        return initArr;
      }
      return uncheck(initArr);
    }

    const handleAllChecked = id => event => {     
      const categoryTemp = {...category};
      console.log(categoryTemp);
      category.isChecked = false;
      console.log(uncheckArrB(category, false));
      console.log('id:= ' + id);
      console.log('value:= ' + event.target.value);
      categoryTemp.children.forEach(fruite => console.log((fruite.id + '=' + id)));
      const fruites = categoryTemp.children.filter(fruite => (fruite.id === id));
      console.log(fruites[0]);
      console.log(uncheckArrB(fruites[0], true));
      console.log(fruites[0]);
      setCategory(categoryTemp);
    };

    const handleCheckChieldElement = id => event => {
      const categoryTemp = {...category};
      console.log(categoryTemp);
      setCategory(categoryTemp);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let selectedItems = [];
      let categoryTemp = {...category};
      categoryTemp.children.forEach(f => {
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
      console.log("Submited OK!!");
    };
    
    console.log(category);

    if (category.children!=null) {
      console.log(category.children);
    } else {
      console.log('!!!NO DATA!!!');
    }

    return (
      <Card className="InnerCard" fontColor="black">
          <strong>Tree BackUp</strong>
          <h3>Check and Uncheck All Example</h3>
          <form onSubmit={handleSubmit}>
          <div className="BackUps">
          {category.children!=null && category.children.map((cat) => (
            <div>
              <input type="checkbox" onChange={handleAllChecked(cat.id)} value="checkedall"/>{" "}
              {cat.name}
              <ul>
                {cat.children.map((child) => {
                    return (
                      <CheckBox
                        key={`${child.id}`}
                        handleCheckChieldElement={handleCheckChieldElement(child.id)}
                        {...child}
                        value={`${child.id}`}
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