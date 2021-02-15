import React, { useEffect, useState } from 'react';
import CheckboxTree from "react-checkbox-tree";
import produce from "immer";
import Card from './Card';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

  const options = [
    { label: 'Item One' }, 
    { label: 'Item Two' }
  ];

  const initNodes = [{
        value: 'mars',
        label: 'Mars',
        children: [
            { value: 'phobos', label: 'Phobos', disabled: false },
            { value: 'deimos', label: 'Deimos' },
        ],
      }];

  const BackUp = () => {
    console.log('ClickMeg1');

    
  const style = {
      listContainer: {
        listStyle: 'none',
        paddingLeft: 0
      },
      itemStyle: {
        cursor: 'pointer',
        padding: 5
      }
  };

  const Widget = ({ options, onChange }) => {
    const [data, setData] = React.useState(options);

    const toggle = item => {
      data.forEach((_, key) => {
        if (data[key].label === item.label) data[key].checked = !item.checked;
      });
      setData([...data]);
      onChange(data);
    };

    return (
      <ul style={style.listContainer}>
      {data.map(item => {
        return (
          <li key={item.label} style={style.itemStyle} onClick={() => toggle(item)}>
            <input readOnly type="checkbox" checked={item.checked || false} />
            {item.label}           
            {item.children && item.children.length > 0 &&
            <ul>
            {item.children.map(item => {
              return (
                <li key={item.label} style={style.itemStyle} onClick={() => toggle(item)}>
                  <input readOnly type="checkbox" checked={item.checked || false} />
                  {item.label}
                </li>
              );
            })}
            </ul>
            }
          </li>
        );
      })}
      </ul>
    );
  };

  console.log('ClickMeg3');
  return (
    <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
        <h1>Tree BackUp</h1>
        <Widget options={initNodes}
                onChange={data => {
                  console.log(data);
                }}/>
    </Card>
  )
}
export default BackUp;