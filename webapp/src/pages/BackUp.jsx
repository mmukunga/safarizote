import React, { useEffect, useState } from 'react';
import Card from './Card';

const tree = [
    {"name": "Root Node", "collapsed": true,
     "nodes": [{"name": "Node 1", "collapsed": true,
     "nodes": [{"name": "Sub node"}]}, {"name": "Node 2", "collapsed": true,
     "nodes": [{"name": "Sub node "}]}, {"name": "Node 3", "collapsed": true, "nodes": [{"name": "Sub node"}]
     }]
    }];

const BackUp = () => {
    const [checkedItems, setCheckedItems] = useState({});
    function TreeList(props) {
        const {list} = props;
        return <div>
          {list.map(f => <TreeItem key={f.name} item={f}/>)}
        </div>;
    }

    const onSelect = (event) => {
      console.log('Checked item name :' + checkedItems["check-box-1"]);
      setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }

    useEffect(() => {
      console.log("CheckedItems:= ", checkedItems);
    }, [checkedItems]); 
  
    const TreeItem = (props) => {
        const {item} = props;
        const [collapsed, setCollapsed] = useState(item.collapsed);
        return (
        <div className="item">
           <input type="checkbox" checked={false} onChange={e => onSelect(e)}/>
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