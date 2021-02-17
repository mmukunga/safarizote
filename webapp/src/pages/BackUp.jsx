import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Card from './Card';

  const tree = [{"name":"Root Node","collapsed":true,"nodes":[{"name":"Node 1","collapsed":true,"nodes":[{"name":"Sub node"}]},{"name":"Node 2","collapsed":true,"nodes":[{"name":"Sub node "}]},{"name":"Node 3","collapsed":true,"nodes":[{"name":"Sub node"}]}]}];
  const BackUp = () => {
    const [checkedItems, setCheckedItems] = useState({});
    
    const handleChange = (event) => {
      setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }
    
    useEffect(() => {
      console.log("checkedItems: ", checkedItems);
    }, [checkedItems]);  
      
    console.log('ClickMeg6');
    
    function TreeList(props) {
      const {list} = props;
      return <div>{list.map(f => <TreeItem key={f.name} item={f} handleChange={props.handleChange}/>)}</div>;
    }

    function TreeItem(props) {
      const {item} = props;
      const [collapsed, setCollapsed] = useState(item.collapsed);

      const handleChange = (event) => {
        props.handleChange(event);
      }

      return <div className="item">
        <input name={item.name} type="checkbox" checked={checkedItems[item.name]} onChange={handleChange}/> &nbsp; &nbsp;
        <span onClick={() => setCollapsed(!collapsed)}>{item.name}</span> 
        {!collapsed && item.nodes && 
          <div style={{paddingLeft: "1rem"}}>
            <TreeList list={item.nodes} handleChange={props.handleChange}/>
          </div>
        }
      </div>
    }

    return (
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
          <h1>Tree BackUp</h1>
          <TreeList list={tree} handleChange={handleChange}/>
      </Card>
    );
  }
  export default BackUp;  