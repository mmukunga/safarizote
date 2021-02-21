import React, { useEffect, useState } from "react";
import Card from './Card';

  const tree = [
    {"name":"Desktop(this PC)", "id": "00", "collapsed":true,
     "nodes":[
       {"name":"C:\\SimTemps", "id": "01","collapsed":true,
        "nodes":[
          {"name":"D:\\SimTemps", "id": "11"},
          {"name":"E:\\SimTemps", "id": "12"}
         ]
       },
       {"name":"C:\\Projects", "id": "02","collapsed":true,
        "nodes":[
          {"name":"D:\\Projects", "id": "21"},
          {"name":"E:\\Projects", "id": "22"}
         ]
       },
       {"name":"C:\\FamilieAlbum", "id": "03","collapsed":true,
        "nodes":[
          {"name":"D:\\FamilieAlbum", "id": "31"},
          {"name":"E:\\FamilieAlbum", "id": "32"}
         ]
        }
      ]}
    ];
  const BackUp = () => {
    const [checkedFolders, setCheckedFolders] = useState({});
    const [collapsed, setCollapsed] = useState(true);

    const handleChange = (event) => {
      console.log('...HandleChange...1');
      let selected_folders = {};

      if (checkedFolders !== null) {
        selected_folders = { ...checkedFolders };
      }

      let check = event.target.checked;
      let checked_item = event.target.name;
      console.log('...HandleChange...2');

      if (check) {
        if (checkedFolders != null) {
          selected_folders = {...checkedFolders, [event.target.name]: event.target.checked};
        } else {
          selected_folders = {[event.target.name] : event.target.checked};
        }       
        setCheckedFolders(selected_folders);
      } else { 
        var index = checkedFolders.indexOf(checked_item);
        if (index > -1) {
          delete checkedFolders[event.target.name];
          setCheckedFolders({...checkedFolders})
        } 
      }

      console.log('...HandleChange...3');
      console.log(checkedFolders);
      console.log('...HandleChange...4');
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
        console.log("checkedFolders: ", checkedFolders);
      }, [checkedFolders]);  
      

      return <div className="item">
        <input name={item.name} id={item.id} type="checkbox" checked={checkedFolders[item.name]} onChange={handleChange}/> &nbsp; &nbsp;
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