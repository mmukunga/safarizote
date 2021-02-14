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
    const [checkedItems, setCheckedItems] = useState([]);
    function TreeList(props) {
        const {list} = props;
        return <div>
          {list.map(f => <TreeItem key={f.name} item={f}/>)}
        </div>;
    }

    const onSelect = (target, event) => {
      console.log('Checked item target :' + target);
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
          <checkbox name={item.name} onChange={e => onSelect(item.name, e)}/>
          <lable>Checked item name : {checkedItems["check-box-1"]} </lable>
          <input type="checkbox" name={item.name} checked={item.checked || false} onChange={e => onSelect(e)}/>
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