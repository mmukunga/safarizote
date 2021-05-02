import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';

  const BackUp = () => {
    const [category, setCategory] = React.useState({});
    const [categories, setCategories] = React.useState([]);
        
    React.useEffect(() => {
      axios.get("/api/categories").then(response => {
          console.log(response);
          setCategories(response.data);       
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
      console.log('1.Checking..');
      var categoriesTemp = [...categories];
      categoriesTemp.map((category) => {
        category.isChecked= false;
          category.children.map((child) => {
            child.isChecked= false;
              console.log(child);
              if (child.children.length > 0) {
                child.children.map((item) => {
                  item.isChecked= false; 
                });  
              }
          });
      });
      console.log(categoriesTemp);
      categoriesTemp.forEach(category => {
        if (category.id === id) {
          category.isChecked = event.target.checked;
          category.children.map(child => {
            child.isChecked = event.target.checked;
          });
        } else {
          category.isChecked = false;
          category.children.map(child => {
            child.isChecked = false;
          });
        }
      });
      console.log(categoriesTemp);
      setCategories(categoriesTemp);
      console.log('2.Checking..');
    };

    const handleCheckChieldElement = id => event => {
      console.log('1.CheckingElement..');
      let categoriesTemp = [...categories];
      categoriesTemp.forEach(category => {
        if (category.id === id) {
          category.isChecked = event.target.checked;
          category.children.map(child => {
            console.log(`${category.id}-${child.id}`);
            child.isChecked = event.target.checked;
          });
        } else {
          category.isChecked = false;
          category.children.map(child => {
            child.isChecked = false;
          });
        }
      });
      setCategories(categoriesTemp);
      console.log('2.CheckingElement..');
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
    
    const children =  categories.filter(f => f.children.length > 0);

    return (
      <Card className="InnerCard" fontColor="black">
          <strong>Tree BackUp</strong>
          <h3>Check and Uncheck All Example</h3>
          <form onSubmit={handleSubmit}>
          <div className="BackUps">
          {children.map((child) => (
            <div>
              <input type="checkbox" onChange={handleAllChecked(child.id)} value="checkedall"/>{" "}
              {child.name}
              <ul>
                {child.children.map((item) => {
                    console.log(item.id + '.item..' + item.name);
                    return (
                      <CheckBox
                        key={`${child.id}-${item.id}`}
                        handleCheckChieldElement={handleCheckChieldElement(item.id)}
                        {...item}
                        value={`${child.id}-${item.id}`}
                        label={item.name}
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