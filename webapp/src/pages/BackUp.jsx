import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Card from './Card';

  const tree = [{"name":"Root Node","collapsed":true,"nodes":[{"name":"Node 1","collapsed":true,"nodes":[{"name":"Sub node"}]},{"name":"Node 2","collapsed":true,"nodes":[{"name":"Sub node "}]},{"name":"Node 3","collapsed":true,"nodes":[{"name":"Sub node"}]}]}];
  const BackUp = () => {
    const [checkedItems, setCheckedItems] = useState({});
    const [collapsed, setCollapsed] = useState(true);

    const handleChange = (event) => {
      setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }
    
    const toggleItem = (collapsed) => {
      setCollapsed(collapsed);
    }

    useEffect(() => {
      console.log("checkedItems: ", checkedItems);
    }, [checkedItems]);  
      
    console.log('ClickMeg6');
    
    function TreeList(props) {
      //const {list} = props.list;
      const {list, handleChange, collapsed,  toggleItem} = props;
      return <div>{list.map(f => <TreeItem key={f.name} item={f} handleChange={handleChange} collapsed={collapsed} toggleItem={toggleItem}/>)}</div>;
    }

    function TreeItem(props) {
      const {key, item, handleChange, collapsed, toggleItem} = props;
      //const [collapsed, setCollapsed] = useState(item.collapsed);
      //const collapsed =  item.collapsed;

      const handleChange = (event) => {
        props.handleChange(event);
      }

      const toggleItem = () => {
        //() => setCollapsed(!collapsed)
        props.toggleItem(!collapsed);
      }

      return <div className="item">
        <input name={item.name} type="checkbox" checked={checkedItems[item.name]} onChange={handleChange}/> &nbsp; &nbsp;
        <span onClick={toggleItem}>{item.name}</span> 
        {!collapsed && item.nodes && 
          <div style={{paddingLeft: "1rem"}}>
            <TreeList list={item.nodes} handleChange={handleChange} collapsed={collapsed} toggleItem={toggleItem}/>
          </div>
        }
      </div>
    }

    return (
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
          <h1>Tree BackUp</h1>
          <TreeList list={tree} handleChange={handleChange} toggleItem={toggleItem}/>
      </Card>
    );
  }
  export default BackUp;  