import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';

  const BackUp = () => {
    const [category, setCategory] = React.useState({});     
    React.useEffect(() => {
      axios.get("/api/categories").then(response => {
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

    const checkArrB = (obj, id) => {
      let initArr = {
        id: obj.id, 
        name: obj.name, 
        isChecked: true, 
        dateCreated: obj.dateCreated, 
        children: obj.children
      };

      const check = (ar) => {
        if (ar.id === id) {
           ar.isChecked = true;
        }
        ar.children.forEach(val => {
          if (val.id === id) {
             val.isChecked = true;
          }
          if (Array.isArray(val.children) && val.children.length > 0) {
              check(val);
          }
        })
        return initArr;
      }
      return check(initArr);
    }

    const uncheckArrB = (obj) => {
      let initArr = {
        id: obj.id, 
        name: obj.name, 
        isChecked: false, 
        dateCreated: obj.dateCreated, 
        children: obj.children
      };

      const uncheck = (ar) => {
        ar.isChecked = false;
        ar.children.forEach(val => {
          val.isChecked = false;
          if (Array.isArray(val.children) && val.children.length > 0) {
              uncheck(val);
          }
        })
        return initArr;
      }
      return uncheck(initArr);
    }

    const uncheckObjB = (obj, id) => {
      let initArr = {
        id: obj.id, 
        name: obj.name, 
        isChecked: false, 
        dateCreated: obj.dateCreated, 
        children: obj.children
      };

      const uncheck = (ar) => {
        if (ar.id === id) {
           ar.isChecked = false;
        }
        ar.children.forEach(val => {
          if (val.id === id) {
             val.isChecked = false;
          }
          if (Array.isArray(val.children) && val.children.length > 0) {
            uncheck(val);
          }
        })
        return initArr;
      }
      return uncheck(initArr);
    }

    const flattenObjFunction = (obj, flattenArray = []) => {
      for (let [key,value] of Object.entries(obj)) {
        if("object"== typeof(value)){
            flattenObjFunction(value, flattenArray)
        }
        else {
          if(flattenArray.findIndex(element=> element.id == obj.id && element.name == obj.name) === -1) {
              flattenArray.push({id: obj.id, name: obj.name, isChecked: obj.isChecked, dateCreated: obj.dateCreated});
          }
        }
      }
      return flattenArray
    }

    const handleAllChecked = id => event => {  
      const checked = event.target.checked; 
      const checkedValue = event.target.value;
      
      var categoryTemp = {...category};

      console.log('1.ID:=' + id + ' Checked:=' + checked + ' CheckedValue:=' + checkedValue);  
      if (checked === false && checkedValue === 'checkedall') {
        console.log('2.ID:=' + id + ' Checked:=' + checked + ' CheckedValue:=' + checkedValue);
        var selfolder = categoryTemp.children.filter(fruite => (fruite.id === id));
        selfolder.isChecked = false;
        selfolder = flattenObjFunction(selfolder);
        selfolder.forEach(el => el.isChecked = false);
        console.log(selfolder);
        selfolder.forEach(el => uncheckObjB(category, el.id));
      }
      
      console.log(category);

      categoryTemp.isChecked = false;
      uncheckArrB(categoryTemp);

      var fruites = categoryTemp.children.filter(fruite => (fruite.id === id));
      fruites = flattenObjFunction(fruites);
      fruites.forEach(el => el.isChecked = true);
      //console.log('Fruites', fruites);      
      fruites.map(el => checkArrB(category, el.id));
      //console.log('Categories', category);
      setCategory(categoryTemp);
    };

    const handleCheckChieldElement = id => event => {
      const categoryTemp = {...category};
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

    return (
      <Card className="InnerCard" fontColor="black">
        <strong>Tree BackUp</strong>
        <h3>Check and Uncheck</h3>
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