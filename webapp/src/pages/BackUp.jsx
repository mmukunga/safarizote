import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';
import CheckboxTree from 'react-checkbox-tree';
  const parents = [];
  for (let i = 0; i < 100; i += 1) {
    const children = [];
    for (let j = 0; j < 200; j += 1) {
      children.push({
        value: `node-0-${i}-${j}`,
        label: `Node 0-${i}-${j}`,
      });
    }

    parents.push({
      value: `node-0-${i}`,
      label: `Node 0-${i}`,
      children,
    });  
  }

  const nodes = [{
    value: 'node-0',
    label: 'Node 0',
    children: parents,
  }];

  const BackUp = () => {
    const [treeState, setTreeState] = useState({checked: [], expanded: []});
  
  const onCheck = (checked) => {
    setTreeState({ ...treeState, checked: checked });
  }
  
  const onExpand = (expanded) => {
    setTreeState({...treeState, expanded: expanded });
  }

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