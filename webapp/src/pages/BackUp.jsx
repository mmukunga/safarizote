import React, { useEffect, useState } from 'react';
import CheckboxTree from "react-checkbox-tree";
import produce from "immer";
import Card from './Card';

  const initNodes = {
      checked:  [],
      expanded: [],  
      nodes: [{
        value: 'mars',
        label: 'Mars',
        children: [
            { value: 'phobos', label: 'Phobos', disabled: true },
            { value: 'deimos', label: 'Deimos' },
        ],
      }]
  }; 

  const BackUp = () => {
    const Widget = () => {
      const [nodes, setNodes] = useState(initNodes);
      const [checked,  setChecked]  = useState([]);
      const [expanded, setExpanded] = useState([]);
      return (
        <>
          <button
            onClick={() => {
              setNodes(
                produce(nodes, draftState => {
                  draftState[0] = {
                    ...draftState[0]
                  };
                  draftState[0].children[1].disabled = true;
                })
              );
            }}
          >
            click to disable
          </button>
          <CheckboxTree
              nodes={nodes}
              checked={checked}
              expanded={expanded}
              onCheck={s => {
                setChecked(s);
              }}
              onExpand={s => {
                setExpanded(s);
              }}
          />
        </>
      );
    };

    return (
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
         <h1>Tree BackUp</h1>
         <Widget />
      </Card>
    )
}
export default BackUp;