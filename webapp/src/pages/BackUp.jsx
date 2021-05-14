import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

  const BackUp = () => {
    const [parents, setParents] = React.useState([]); 
    const [category, setCategory] = React.useState([]);  
    const [treeState, setTreeState] = React.useState({checked: [], expanded: []});
  
    const [nodes, setNodes] = React.useState([{
      value: category.id,
      label: category.name,
      children: parents,
    }]);

    const createTree = (obj) => {
      const parents = [];
      obj.children.forEach(folder => {
        const children = [];
        folder.children.forEach(item => {
          children.push({
            value: item.id,
            label: item.name,
          });
        })

        parents.push({
          value: folder.id,
          label: folder.name,
          children,
        });  

      });

      console.log(parents);

      return parents;
    }

    React.useEffect(() => {
      axios.get("/api/categories").then(response => {
          console.log(response.data[0]);
          setCategory(response.data[0]);
          const parents = createTree(response.data[0]);
          setNodes(parents);
          console.log(parents);
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