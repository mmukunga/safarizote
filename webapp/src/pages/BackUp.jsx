import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

  const parents = [];
  for (let i = 0; i < 3; i += 1) {
    const children = [];
    for (let j = 0; j < 2; j += 1) {
      children.push({
        value: `D:\SimTemps${i}-${j}`,
        label: `E:\SimTemps${i}-${j}`,
      });
    }

    parents.push({
      value: `C:\SimTemps${i}`,
      label: `C:\SimTemps${i}`,
      children,
    });  
  }

  const BackUp = () => {
    const [category, setCategory] = React.useState([]);  
    const [treeState, setTreeState] = React.useState({checked: [], expanded: []});
  
    const [nodes, setNodes] = React.useState([{
      value: 'MyPC',
      label: 'MyPC',
      children: parents,
    }]);

    const createTree = (obj) => {
      let initArr = {
        id: obj.id, 
        name: obj.name, 
        isChecked: obj.isChecked, 
        dateCreated: obj.dateCreated, 
        children: obj.children
      };

      const getChildren = (ar) => {
        ar.children.forEach(val => {
          if (Array.isArray(val.children) && val.children.length > 0) {
            getChildren(val);
          }
        })
        return initArr;
      }
      return getChildren(initArr);
    }

    React.useEffect(() => {
      axios.get("/api/categories").then(response => {
          console.log(response.data);
          setCategory(response.data);
      }).catch(error => {
          console.log(error);
      });
    }, []);  

    const onCheck = (checked) => {
      setTreeState({ ...treeState, checked: checked });
    }
    
    const onExpand = (expanded) => {
      setTreeState({...treeState, expanded: expanded });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Submited OK!!");
    };

    const { checked, expanded } = treeState;

    return (
      <Card className="InnerCard" fontColor="black">
        <strong>Tree BackUp</strong>
        <h3>Check and Uncheck</h3>
        <form onSubmit={handleSubmit}>
          <div className="BackUps">
            <CheckboxTree
                checked={checked}
                expanded={expanded}
                iconsClass="fa5"
                nodes={nodes}
                onCheck={onCheck}
                onExpand={onExpand}
            />
          </div>  
        </form>
      </Card>
    );
  }

  export default BackUp;