import React, { useEffect, useState } from 'react';
import Card from './Card';

const tree = [
    {"name": "Root Node", "collapsed": true, "checked": false,
     "nodes": [{"name": "Node 1", "collapsed": true, "checked": false,
     "nodes": [{"name": "Sub node", "checked": false}]}, {"name": "Node 2", "collapsed": true, "checked": false,
     "nodes": [{"name": "Sub node ", "checked": false}]}, {"name": "Node 3", "collapsed": true, "checked": false, "nodes": [{"name": "Sub node", "checked": false}]
     }]
    }];

const BackUp = () => {
    //const [checkedItems, setCheckedItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState({}); //plain object as state
    function TreeList(props) {
        const {list} = props;
        return <div>
          {list.map(f => <TreeItem key={f.name} item={f}/>)}
        </div>;
    }

    const handleChange = (event) => {
      setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }

    React.useEffect(() => {
      console.log("checkedItems: ", checkedItems);
    }, [checkedItems]);  

    const onSelect = ( event) => {
      console.log('Checked item target :' + event);
      const {name, value} =  event.target;
      console.log('Checked item name :' + checkedItems[name]);
      setCheckedItems({...checkedItems, [name] : value });
    }

    useEffect(() => {
      console.log("CheckedItems:= " + checkedItems);
    }, [checkedItems]); 
  
    const TreeItem = (props) => {
        const {item} = props;
        const [collapsed, setCollapsed] = useState(item.collapsed);
        return (
        <div className="item">
          <input type='checkbox' name={item.name} checked={checkedItems[item.name]} onChange={handleChange} /> 
          <lable>{item.name}</lable><br/><br/><br/>
          <span onClick={() => setCollapsed(!collapsed)}>{item.name}</span>
          {!collapsed && item.nodes && 
            <div style={{paddingLeft: '1rem', border: '1px solid red'}}>
              <TreeList list={item.nodes}/>
            </div>
          }
        </div>)
      }

    return (
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
         <h1>Tree BackUp</h1>
         {<TreeList list={tree}/>}
      </Card>
    )
}
export default BackUp;