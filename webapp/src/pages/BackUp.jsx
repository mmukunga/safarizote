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

    const [fruites, setFruites] = useState([
        {id: 0,  parentId: null, value: "Desktop(this PC)", isChecked: false},
        {id: 1,  parentId: 0, value: "C:SimTemps", isChecked: false},
        {id: 10, parentId: 1, value: "D:SimTemps", isChecked: false},
        {id: 11, parentId: 1, value: "E:SimTemps", isChecked: false},
        {id: 2,  parentId: 0, value: "C:Projects", isChecked: false},
        {id: 20, parentId: 2, value: "D:Projects", isChecked: false},
        {id: 21, parentId: 2, value: "E:Projects", isChecked: false},
        {id: 3,  parentId: 0, value: "C:FamilieAlbum", isChecked: false},
        {id: 30, parentId: 3, value: "D:FamilieAlbum", isChecked: false},
        {id: 31, parentId: 3, value: "E:FamilieAlbum", isChecked: false},
        {id: 4,  parentId: 0, value: "C:Temps", isChecked: false},
        {id: 40, parentId: 4, value: "D:Temps", isChecked: false},
        {id: 41, parentId: 4, value: "E:Temps", isChecked: false}]);
        



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

    const handleAllChecked = (event) => {
      console.log('handleAllChecked ' + event.target.checked);
      let newFruites = [ ...fruites ];
      newFruites.forEach(fruite => fruite.isChecked = event.target.checked); 
      setFruites(newFruites);
    }
  
    const handleCheckChieldElement = (event) => {
      console.log('handleCheckChieldElement ' + event.target.checked)
      console.log(fruites);
      let newFruites = [ ...fruites ];
      newFruites.forEach(fruite => {
        console.log('parentID:= ' + event.target.parentId);
        if (fruite.value === event.target.value) {
          console.log('****' + event.target.value + ' ' + fruite.value);
          fruite.isChecked = event.target.checked;
        }   
      })
      setFruites(newFruites);
      console.log(newFruites);
    }
  
    const CheckBox = props => {
      console.log(props.value);
      console.log(props.isChecked);
      return (
        <li>
         <input key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
        </li>
      )
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
      <Card cardWidth="500px" fontColor="black" backgroundColor="#F0FFFF">
          <strong>Tree BackUp</strong>

        <h1> Check and Uncheck All Example </h1>
        <input type="checkbox" onClick={handleAllChecked}  value="checkedall" /> Check / Uncheck All
        <ul>
        {
          fruites.map((fruite) => {
            return (<CheckBox handleCheckChieldElement={handleCheckChieldElement}  {...fruite} />)
          })
        }
        </ul>



          <TreeList list={tree} treeLevel={0} handleChange={handleChange} collapsed={collapsed} handleCollapsed={handleCollapsed}/>
      </Card>
    );
  }
  export default BackUp;  