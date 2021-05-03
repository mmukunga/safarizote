import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';

  const BackUp = () => {
    const [category, setCategory] = React.useState({});
    //const [categories, setCategories] = React.useState([]);
        
    React.useEffect(() => {
      axios.get("/api/categories").then(response => {
          console.log(response);   
          //const filteredData =  response.data.filter(f => f.children.length > 0);         
          //setCategories(filteredData); 
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

    const handleAllChecked = id => event => {
      alert('all');
      console.log('1.Checking..');
      const categoryTemp = {...category};
      console.log(categories);
      categoryTemp.children.map((category) => {
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
      console.log(categoryTemp);
      categoryTemp.children.forEach(category => {
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
      console.log(categoryTemp);
      setCategory(categoryTemp);
      console.log('2.Checking..');
    };

    const handleCheckChieldElement = id => event => {
      alert('one');
      console.log('1.CheckingElement..');
      const categoryTemp = {...category};
      categoryTemp.children.forEach(category => {
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
      setCategory(categoryTemp);
      console.log('2.CheckingElement..');
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
      console.log(category + " Submited OK!!");
    };
    
    return (
      <Card className="InnerCard" fontColor="black">
          <strong>Tree BackUp</strong>
          <h3>Check and Uncheck All Example</h3>
          <form onSubmit={handleSubmit}>
          <div className="BackUps">
          {category.children.map((category) => (
            <div>
              <input type="checkbox" onChange={handleAllChecked(category.id)} value="checkedall"/>{" "}
              {category.name}
              <ul>
                {category.children.map((child) => {
                    return (
                      <CheckBox
                        key={`${child.id}`}
                        handleCheckChieldElement={handleCheckChieldElement(child.id)}
                        {...child}
                        value={`${item.id}`}
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