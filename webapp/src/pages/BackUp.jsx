import React, { useEffect, useState } from "react";
import Card from './Card';
import axios , { post } from 'axios';
import logo from '../logo.svg';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

  const BackUp = () => {
    const [category, setCategory] = React.useState([]);
    const [fileInput , setFileInput ] = React.useState(React.createRef());
    const [isSucces, setSuccess] = useState(null);
    const [file, setFile] = useState(null);
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
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
      fileUpload(file).then((response) => {
            console.log(response.data);
        })
    }
    
    const fileUpload = (file) => {
        const url = '/api/upload_file';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    const uploadSubmit = async (e) => {
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
  
        axios.post("/api/doUpload", result, options).then((response) => { 
            console.log(response);
          }).catch(error => {
            console.log(error);
        });
      })
      
      console.log("Submited OK!!");
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

        <form onSubmit={uploadSubmit}>
            <input type="submit" value="Submit!" className="lg-button btn-primary"/>
        </form>

      </Card>
    );
  }

  export default BackUp;