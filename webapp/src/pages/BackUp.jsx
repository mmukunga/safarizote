import React, { useEffect, useState } from 'react';
import CheckboxTree from "react-checkbox-tree";
import produce from "immer";
import Card from './Card';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

  const options = [
    { label: 'Item One' }, 
    { label: 'Item Two' }
  ];

  const initNodes = {
      checked:  [],
      expanded: [],  
      nodes: [{
        value: 'mars',
        label: 'Mars',
        children: [
            { value: 'phobos', label: 'Phobos', disabled: false },
            { value: 'deimos', label: 'Deimos' },
        ],
      }]
  }; 

  const BackUp = () => {
    console.log('ClickMeg1');

    const Widget = ({ options, onChange }) => {
      const [data, setData] = React.useState(options);
    
      const toggle = index => {
        const newData = [...data];
        newData.splice(index, 1, {
          label: data[index].label,
          checked: !data[index].checked
        });
        setData(newData);
        onChange(newData.filter(x => x.checked));
      };
    
      return (
        <div>
          {data.map((item, index) => (
            <label key={item.label}>
              <input
                readOnly
                type="checkbox"
                checked={item.checked || false}
                onClick={() => toggle(index)}
              />
              {item.label}
            </label>
          ))}
        </div>
      );
    };

    console.log('ClickMeg3');
    return (
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
         <h1>Tree BackUp</h1>
         <Widget options={options}
                 onChange={data => {
                   console.log(data);
                 }}/>
      </Card>
    )
}
export default BackUp;