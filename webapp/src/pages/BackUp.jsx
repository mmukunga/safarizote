import React, { useEffect, useState } from "react";
import Card from './Card';

  const tree = [
    {"name":"Desktop(this PC)", "id": "00", "collapsed":true,
     "nodes":[
       {"name":"C:\\SimTemps", "id": "01","collapsed":true,
        "nodes":[
          {"name":"D:\\SimTemps", "id": "11"},
          {"name":"E:\\SimTemps", "id": "12"}
         ]
       },
       {"name":"C:\\Projects", "id": "02","collapsed":true,
        "nodes":[
          {"name":"D:\\Projects", "id": "21"},
          {"name":"E:\\Projects", "id": "22"}
         ]
       },
       {"name":"C:\\FamilieAlbum", "id": "03","collapsed":true,
        "nodes":[
          {"name":"D:\\FamilieAlbum", "id": "31"},
          {"name":"E:\\FamilieAlbum", "id": "32"}
         ]
        }
      ]}
    ];
  const BackUp = () => {
    const [checkedItems, setCheckedItems] = useState({});
    const [collapsed, setCollapsed] = useState(true);

    const handleChange = (event) => {
      event.preventDefault();
      // const {name, value} = event.target;

      console.log('...HandleChange...1a size:= ' + checkedItems.length);
      const newObject = {
          "name": event.target.name, 
          "checked": event.target.checked
      };

      setCheckedItems({ ...checkedItems, newObject });
      console.log('...HandleChange...1b size:= ' + checkedItems);
      console.log('...HandleChange...1c size:= ' + checkedItems.length);

    }
    
    const handleCollapsed = (collapsed) => {
      setCollapsed(collapsed);
    }

    console.log('BackUp!!!');

    function TreeItem(props) {
      //const {item} = props.item;
      const item = props.item;

      const handleChange = (event) => {
       props.handleChange(event);
      }

      const handleCollapsed = () => {
        props.handleCollapsed(!props.collapsed);
       }

      useEffect(() => {
        console.log("checkedItems: ", checkedItems);
      }, [checkedItems]);  
        
      return <div className="item">
        <input name={item.name} id={item.id} type="checkbox" checked={checkedItems[item.name]} onChange={handleChange}/> &nbsp; &nbsp;
        <span onClick={handleCollapsed}>{item.name}</span> 
        {!props.collapsed && item.nodes && 
          <div style={{paddingLeft: "1rem"}}>
            <TreeList list={item.nodes} handleChange={handleChange} handleCollapsed={handleCollapsed}/>
          </div>
        }
      </div>
    }
    
    function TreeList(props) {
      const {list, handleChange, collapsed, handleCollapsed} = props;
      return <div>{list.map(f => <TreeItem key={f.name} item={f} handleChange={handleChange} collapsed={collapsed} handleCollapsed={handleCollapsed}/>)}</div>;
    }

    return (
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
          <h1>Tree BackUp</h1>
          <TreeList list={tree} handleChange={handleChange}  collapsed={collapsed} handleCollapsed={handleCollapsed}/>
      </Card>
    );
  }
  export default BackUp;  