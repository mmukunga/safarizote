import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';

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
    useEffect(() => {
      axios.get('/api/backUp').then(response => {
          console.log(response);
      }).catch(error => {
          console.log(error);
      });
    }, []);  

    const handleChange = (event) => {
      let selected_folders = {};

      if (checkedFolders !== null) {
        selected_folders = { ...checkedFolders };
      }

      let check = event.target.checked;
      let checked_item = event.target.name;

      if (check) {
        if (checkedFolders != null) {
          selected_folders = {...checkedFolders, [event.target.name]: event.target.checked};
        } else {
          selected_folders = {[event.target.name] : event.target.checked};
        }       
        setCheckedFolders(selected_folders);
      } else { ;
        var index = checkedFolders.indexOf(checked_item);
        if (index > -1) {
          delete checkedFolders[event.target.name];
          setCheckedFolders({...checkedFolders})
        } 
      }
    }
    
    const handleCollapsed = (collapsed) => {
      setCollapsed(collapsed);
    }

    function TreeItem(props) {
      const item = props.item;
      const treeClassName = "TreeItem" + props.treeLevel;

      const handleChange = (event) => {
       props.handleChange(event);
      }

      const handleCollapsed = () => {
        props.handleCollapsed(!props.collapsed);
      }
      
      return ( 
      <div className={treeClassName}>
        <input name={item.name} id={item.id} type="checkbox" checked={checkedFolders[item.name]} onChange={handleChange}/> &nbsp; &nbsp;
        <span onClick={handleCollapsed}>{item.name}</span> 
        {!props.collapsed && item.nodes && 
          <TreeList list={item.nodes} treeLevel={props.treeLevel + 1} handleChange={handleChange} handleCollapsed={handleCollapsed}/>
        }
      </div> 
    )}
    
    function TreeList(props) {
      const {list, handleChange, collapsed, handleCollapsed} = props;
      const treeClassName = "TreeItem" + props.treeLevel;
      return (
        <div className={treeClassName}>
          {list.map(f => <div>{<TreeItem key={f.name} treeLevel={props.treeLevel} item={f} handleChange={handleChange} collapsed={collapsed} handleCollapsed={handleCollapsed}/>}</div>)}
        </div>);
    }

    return (
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF" imageUrl='../cheeter.jpg'>
          <strong>Tree BackUp</strong>
          <TreeList list={tree} treeLevel={0} handleChange={handleChange} collapsed={collapsed} handleCollapsed={handleCollapsed}/>
      </Card>
    );
  }
  export default BackUp;  