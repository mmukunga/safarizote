import React, { useState } from 'react';

const tree = [
    {"name": "Root Node", "collapsed": true,
     "nodes": [{"name": "Node 1", "collapsed": true,
     "nodes": [{"name": "Sub node"}]}, {"name": "Node 2", "collapsed": true,
     "nodes": [{"name": "Sub node "}]}, {"name": "Node 3", "collapsed": true, "nodes": [{"name": "Sub node"}]
     }]
    }];

const BackUp = () => {
    
    function TreeList(props) {
        const {list} = props;
        return <div>
          {list.map(f => <TreeItem key={f.name} item={f}/>)}
        </div>;
    }

    const TreeItem = (props) => {
        const {item} = props;
        const [collapsed, setCollapsed] = useState(item.collapsed);
        return <div className="item">
          <span onClick={() => setCollapsed(!collapsed)}>{item.name}</span>
          {!collapsed && item.nodes && 
            <div style={{paddingLeft: "1rem"}}>
              <TreeList list={item.nodes}/>
            </div>
          }
        </div>
      }

    return (
      <div className='someClass' id='treeBackUp'>
         <h1>Tree BackUp</h1>
         {<TreeList list={tree}/>}
      </div>
    )
}
export default BackUp;