import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

  const BackUp = () => {
    const [category, setCategory] = React.useState([]);
    const [file, setFile] = React.useState(null);
    const [images, setImages] = React.useState([]);
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
    setImages({
      images: event.target.files,
    });
  }

  
  const onSubmit = e => {
    e.preventDefault();

    const formData = new FormData();

    Array.from(images).forEach(image => {
      formData.append('files', image);
    });

    axios.post(`api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  }


    const handleFile = (e) => {
      let file = e.target.files[0];
     setFile({ file });
    }

    const handleUpload = async (e) => {
      console.log(file);
      await uploadImage(file);
    }
  
    const uploadImage = async file => {
      try {
        console.log("Upload Image", file);
        const formData = new FormData();
        formData.append("filename", file);
        formData.append("destination", "images");
        formData.append("create_thumbnail", true);
        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };

        // const API = "group_util_uploadImage";
        // const HOST = "https://us-central1-wisy-dev.cloudfunctions.net";
        // const url = `${HOST}/${API}`;
    
        const result = await axios.post('api/uploadFile', formData, config);
        console.log("REsult: ", result);
      } catch (error) {
        console.error(error);
      }
    };


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

        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <input type="file" name="file" onChange={e => handleFile(e)} />
        <button onClick={e => handleUpload(e)}>Upload</button>

        <form onSubmit={onSubmit}>
          <input
            type="file"
            name="files"
            onChange={onImageChange}
            alt="image"
          />
          <br />
          <button type="submit">Send</button>
        </form>
      </Card>
    );
  }

  export default BackUp;