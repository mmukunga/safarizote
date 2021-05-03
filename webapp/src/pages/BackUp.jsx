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
          console.log(response.data[0]);        
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


    const uncheckAll = () => {
      console.log('1.Uncheck All..');
      const categoryTemp = {...category};
      console.log(categoryTemp);
      categoryTemp.isChecked = false;
      categoryTemp.children.map((cat) => {
        cat.isChecked= false;
        cat.children.map((child) => {
          child.isChecked= false;
          if (child.children.length > 0) {
            child.children.map((item) => {
              item.isChecked= false; 
            });  
          }
        });
      });
      console.log(categoryTemp);
      setCategory(categoryTemp);
      console.log('2.Uncheck All..');
    }

    const handleAllChecked = id => event => {
      console.log('1.Checking..');    
      uncheckAll();
      const categoryTemp = {...category};
      console.log(categoryTemp);
      
      categoryTemp.children.forEach(cat => {
        if (cat.id === id) {
          cat.isChecked = event.target.checked;
          cat.children.map(child => {
            child.isChecked = event.target.checked;          
            if (child.children.length > 0) {
              child.children.map((item) => {
                item.isChecked= event.target.checked; 
              });  
            }
          });
        }
      });
      
      setCategory(categoryTemp);
      console.log('2.Checking..');
    };

    const handleCheckChieldElement = id => event => {
      console.log('1.CheckingElement..');
      const categoryTemp = {...category};
      categoryTemp.children.forEach(cat => {
        if (cat.id === id) {
          cat.isChecked = event.target.checked;
          cat.children.map(child => {
            console.log(`${cat.id}-${child.id}`);
            child.isChecked = event.target.checked;
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