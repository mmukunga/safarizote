import React, { useEffect, useState } from "react";
import Card from './Card';

  const tree = [
    {"name":"Desktop(this PC)","collapsed":true,
     "nodes":[
       {"name":"C:\\SimTemps","collapsed":true,
        "nodes":[
          {"name":"D:\\SimTemps"},
          {"name":"E:\\SimTemps"}
         ]
       },
       {"name":"C:\\Projects","collapsed":true,
        "nodes":[
          {"name":"D:\\Projects"},
          {"name":"E:\\Projects"}
         ]
       },
       {"name":"C:\\FamilieAlbum","collapsed":true,
        "nodes":[
          {"name":"D:\\FamilieAlbum"},
          {"name":"E:\\FamilieAlbum"}
         ]
        }
      ]}
    ];
  const BackUp = () => {
    const [checkedItems, setCheckedItems] = useState({});
    const [collapsed, setCollapsed] = useState(true);

    const handleChange = (event) => {
      setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
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
        <input name={item.name} type="checkbox" checked={checkedItems[item.name]} onChange={handleChange}/> &nbsp; &nbsp;
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