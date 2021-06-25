import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

  const BackUp = () => {
    const [category, setCategory] = React.useState([]);
    const [fileInput , setFileInput ] = React.useState(React.createRef());

    const [images, setImages] = useState([]);
    const [isSucces, setSuccess] = useState(null);
    const [treeState, setTreeState] = React.useState({checked: [], expanded: []});
    const [nodes, setNodes] = React.useState([{
      value: '',
      label: '',
      children: [],
    }]);
    
    React.useEffect(() => {
      axios.get("/api/categories").then(response => {
          setCategory(response.data);

          const parents = [];
          response.data[0].children.forEach(val => {
            const children = [];
            val.children.forEach(item => {
              children.push({
                value: item.id,
                label: item.name,
              });
            });

            parents.push({
              value: val.id,
              label: val.name,
              children,
            });  
          });

          const tempNodes = {
            value: category.id,
            label: category.name,
            children: parents,
          }

          setNodes([tempNodes]);
      }).catch(error => {
          console.log(error);
      });
    }, []);  

    const onCheck = (checked) => {
        console.log(treeState.checked);
        setTreeState({ ...treeState, checked: checked });
    }
    
    const onExpand = (expanded) => {
        console.log(treeState.expanded);
        setTreeState({...treeState, expanded: expanded });
    }
   
    const onImageChange = event => {
      console.log(event.target.files);
     // setFile(event.target.files[0]);
      console.log(event.target.files);
      setImages([...images, ...event.target.files]);
    }

   const handleUpload = (e) => {
      e.preventDefault();
        
        let file = e.target.files[0];
        const formdata = new FormData();
        formdata.append('file', file);
            
        for (var value of formdata.values()) {
            console.log(value);
        }
        
        const url = 'http://127.0.0.1:8080/file/upload';
        fetch(url, {
            method: 'POST',
            body: formdata,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => console.log(response));
    }


    const onSubmit = async event => {
      event.preventDefault();
      var formData = new FormData();
      formData.append("files", event.target.files);
      axios.post( '/single-file', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }).then(function(){console.log('SUCCESS!')})
        .catch((error) => console.log(error));
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      let AuthUser = function(id) {
        return axios.get(`/api/backUp/${id}`).then(response => { 
          return response.data;
        });
      }
      
      const sendData = async () => {
        const myData = [];
          for (const id of treeState.checked) {
            let result = await AuthUser(id);
            myData.push(result );
          }
        return myData;
      }
     
      sendData().then((result) => {
        console.log(result) 
        const options = {
          headers: {
              'Content-Type': 'application/json',
          }
        };
  
        axios.post("/api/doBackUp", result, options).then((response) => { 
            console.log(response);
          }).catch(error => {
            console.log(error);
        });
      })
      
      console.log("Submited OK!!");
    };

    const { checked, expanded } = treeState;

    return (
      <Card className="InnerCard" fontColor="black">
        <strong>Tree BackUp</strong>
        <h3>Check and Uncheck</h3>
        <form onSubmit={handleSubmit}>
          <div className="BackUps">
            <CheckboxTree
                checked={checked}
                expanded={expanded}
                iconsClass="fa5"
                nodes={nodes}
                onCheck={onCheck}
                onExpand={onExpand}
            />
          </div>
          <div className="row">
            <input type="submit" value="Submit!" className="lg-button btn-primary"/>
          </div>    
        </form>

        <form onSubmit={onSubmit} style={{margin:"2px", border:"2px solid green"}}>
          <input type="file" name="files" multiple onChange={onImageChange}/>
          <button type="submit">Send Try!</button>
        </form>

      </Card>
    );
  }

  export default BackUp;