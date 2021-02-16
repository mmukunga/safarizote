import React, { useState } from "react";
import { render } from "react-dom";
import Card from './Card';

  const tree = [{"name":"Root Node","collapsed":true,"nodes":[{"name":"Node 1","collapsed":true,"nodes":[{"name":"Sub node"}]},{"name":"Node 2","collapsed":true,"nodes":[{"name":"Sub node "}]},{"name":"Node 3","collapsed":true,"nodes":[{"name":"Sub node"}]}]}];
  const BackUp = () => {
    
    console.log('ClickMeg6');

    function TreeItem(props) {
      const {item} = props;
      const [collapsed, setCollapsed] = useState(item.collapsed);
      const [state, setState] = useState({isGoing: true});

      const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name  = target.name;
        console.log(target);
        setState({[name]: value});
      }

      return <div className="item">
        <span onClick={() => setCollapsed(!collapsed)}>{item.name}</span>  &nbsp; &nbsp; 
          <input name={item.name}  type="checkbox" checked={state.isGoing} onChange={handleChange}/>
        {!collapsed && item.nodes && 
          <div style={{paddingLeft: "1rem"}}>
            <TreeList list={item.nodes}/>
          </div>
        }
      </div>
    }
    
    function TreeList(props) {
      const {list} = props;
      return <div>{list.map(f => <TreeItem key={f.name} item={f}/>)}</div>;
    }

    return (
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
          <h1>Tree BackUp</h1>
          <TreeList list={tree}/>
      </Card>
    );
  }
  export default BackUp;  