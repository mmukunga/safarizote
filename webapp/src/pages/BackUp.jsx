import React, { useEffect, useState } from "react";
import Card from './Card';

  const tree = [{"name":"Root Node","collapsed":true,"nodes":[{"name":"Node 1","collapsed":true,"nodes":[{"name":"Sub node"}]},{"name":"Node 2","collapsed":true,"nodes":[{"name":"Sub node "}]},{"name":"Node 3","collapsed":true,"nodes":[{"name":"Sub node"}]}]}];
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
      //const [collapsed, setCollapsed] = useState(item.collapsed);
      //const [collapsed, setCollapsed] = useState(true);

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