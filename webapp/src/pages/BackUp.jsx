import React, { useEffect, useState } from "react";
import Card from './Card';

  const tree = [{"name":"Root Node","collapsed":true,"nodes":[{"name":"Node 1","collapsed":true,"nodes":[{"name":"Sub node"}]},{"name":"Node 2","collapsed":true,"nodes":[{"name":"Sub node "}]},{"name":"Node 3","collapsed":true,"nodes":[{"name":"Sub node"}]}]}];
  const BackUp = () => {
    const [checkedItems, setCheckedItems] = useState({});

    const handleChange = (event) => {
      setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }
    
    console.log('BackUp!!!');

    function TreeItem(props) {
      const {item} = props.item;
      const [collapsed, setCollapsed] = useState(item.collapsed);
      
      const handleChange = (event) => {
       props.handleChange(event);
      }

      useEffect(() => {
        console.log("checkedItems: ", checkedItems);
      }, [checkedItems]);  
        
      return <div className="item">
        <input name={item.name} type="checkbox" checked={checkedItems[item.name]} onChange={handleChange}/> &nbsp; &nbsp;
        <span onClick={() => setCollapsed(!collapsed)}>{item.name}</span> 
        {!collapsed && item.nodes && 
          <div style={{paddingLeft: "1rem"}}>
            <TreeList list={item.nodes} handleChange={handleChange}/>
          </div>
        }
      </div>
    }
    
    function TreeList(props) {
      const {list, handleChange} = props;
      return <div>{list.map(f => <TreeItem key={f.name} item={f} handleChange={handleChange}/>)}</div>;
    }

    return (
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
          <h1>Tree BackUp</h1>
          <TreeList list={tree} handleChange={handleChange}/>
      </Card>
    );
  }
  export default BackUp;  