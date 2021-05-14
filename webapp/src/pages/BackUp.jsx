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
      console.log('1.createTree..');
      obj.children.forEach(folder => {
        const children = [];
        console.log('2.createTree..');
        folder.children.forEach(item => {
          children.push({
            value: item.id,
            label: item.name,
          });
        })
        console.log('3.createTree..');
        parents.push({
          value: folder.id,
          label: folder.name,
          children,
        });  
        console.log('4.createTree..');
      });
      console.log('5.createTree..');
      return parents;
    }

    React.useEffect(() => {
      axios.get("/api/categories").then(response => {
          console.log('1.response.data..');
          setCategory(response.data[0]);
          console.log('2.response.data..');
          const tree = createTree(response.data[0]);
          console.log('3.response.data..');
          setParents(tree);
          console.log('4.response.data..');
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