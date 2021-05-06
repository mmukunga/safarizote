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

    const uncheckAll = () => {
      alert('!!UNCHECK!!');
      var categoryTemp = {...category};
      console.log(categoryTemp);
      categoryTemp.isChecked = false;
      categoryTemp.children.map((cat) => {
        cat.isChecked= false;
        cat.children.map((child) => {
          child.isChecked= false;
            child.children.map((item) => {
              item.isChecked= false; 
            });  
        });
      });
      setCategory(categoryTemp);
    }

    const getAllFiles = (dirPath, arrayOfFiles) =>{
      console.log(dirPath);
      dirPath.isChecked = false;
      var files = {...dirPath};
      console.log(files);
      var arrayOfFiles = arrayOfFiles || [];
    
      files.children.forEach((file) => {
        if (file.children > 0) {
          arrayOfFiles = getAllFiles(file, arrayOfFiles);
          console.log(arrayOfFiles);
        } else {
          file.isChecked = false;
          //arrayOfFiles = [...arrayOfFiles, file];
          console.log(file);
        }
      });
    
      return arrayOfFiles;
    }

    const handleAllChecked = id => event => {
      uncheckAll();

      const result1 = getAllFiles(category);
      console.log('1..result1..');
      console.log(result1);
      console.log('2..result2..');
     
      const result = uncheckAllFiles(category);
      console.log('1..result..');
      console.log(result);
      console.log('2..result..');
      
      const categoryTemp = {...category};
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
    };

    const handleCheckChieldElement = id => event => {
      const categoryTemp = {...category};
      categoryTemp.children.forEach(cat => {
        if (cat.id != id) {
          cat.children.map(child => {
            if (child.id != id) {
              if (child.children.length > 0) {
                child.children.map((item) => {
                  if (item.id === id) {
                    item.isChecked = (child.isChecked===true)? false:true; 
                  }
                });  
              }            
            } else { 
              child.isChecked = (child.isChecked===true)? false:true; 
            }  
          });
        } else {
          cat.isChecked = (cat.isChecked===true)? false:true; 
        }
      });
      setCategory(categoryTemp);
    };



    const uncheckAllFiles = (dirFolder, arrayOfFiles) => {
      dirFolder.isChecked = false;

      var folders = [...dirFolder.children];
      arrayOfFiles = arrayOfFiles || []
      arrayOfFiles.push(dirFolder);

      folders.forEach((folder) => {
        if (folder.children && folder.children.length > 0) {
          arrayOfFiles = uncheckAllFiles(folder, arrayOfFiles)
        } else {
          folder.isChecked = false;
          arrayOfFiles.push(folder);
        }
      })
    
      return arrayOfFiles;
    }

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