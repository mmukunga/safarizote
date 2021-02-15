import React from 'react';
import Card from './Card';

  const initNodes = [
    { label: 'Item One' }, 
    { label: 'Item Two' },
    { label: 'Mars',
        children: [
            { label: 'Phobos' },
            { label: 'Deimos' }
        ]
    }
  ];

  const BackUp = () => {
    console.log('ClickMeg 1'); 
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

    console.log('ClickMeg 2'); 

    const Widget = ({ options, onChange }) => {
      const [data, setData] = React.useState(options);

      const toggle = item => {
        console.log('ClickMeg 3'); 
        console.log(item);
        data.forEach((_, key) => {
          console.log(data[key].label + ' === ' + item.label);
          if (data[key].label === item.label) { 
            data[key].checked = !item.checked; 

            const children = data[key].children; 

            children.forEach((_, key) => {
              console.log(children[key].label + ' === ' + item.label);
              if (children[key].label === item.label) { 
                children[key].checked = !item.checked; 
              }
            });

          }
        });

        console.log('ClickMeg 4'); 
        setData([...data]);
        onChange(data);
      };

      console.log('ClickMeg 5'); 

      return (
        <ul style={style.listContainer}>
        {data.map(item => {
          const children = item.children;
          return (
            <li key={item.label} style={style.itemStyle} onClick={() => toggle(item)}>
              <input readOnly type="checkbox" checked={item.checked || false} />
              {item.label}           
              {children && children.length > 0 &&
              <ul>
              {children.map(child => {
                return (
                  <li key={child.label} style={style.itemStyle} onClick={() => toggle(child)}>
                    <input readOnly type="checkbox" checked={child.checked || false} />
                    {child.label}
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

    console.log('ClickMeg6');

    return (
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
          <h1>Tree BackUp</h1>
          <Widget options={initNodes}
                  onChange={data => {
                    console.log(data);
                  }}/>
      </Card>
    );
  }
  export default BackUp;  