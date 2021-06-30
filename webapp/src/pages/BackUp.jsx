import React, { useEffect, useState, useReducer, useCallback  } from "react";
import Card from './Card';
import axios , { post } from 'axios';
import logo from '../logo.svg';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

// Constants
const LOADED = 'LOADED'
const INIT = 'INIT'
const PENDING = 'PENDING'
const FILES_UPLOADED = 'FILES_UPLOADED'
const UPLOAD_ERROR = 'UPLOAD_ERROR'

const initialState = {
  files: [],
  pending: [],
  next: null,
  uploading: false,
  uploaded: {},
  status: 'idle',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'load':
      return { ...state, files: action.files, status: LOADED }
    default:
      return state
  }
}

  const BackUp = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
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
    
    const Input = (props) => (
      <input type="file" name="file-input" multiple {...props} />
    );

    const onChange = (e) => {
      console.log(e.target.files);
      if (e.target.files.length) {
        const arrFiles = Array.from(e.target.files)
        const files = arrFiles.map((file, index) => {
          const src = window.URL.createObjectURL(file)
          return { file, id: index, src }
        })
        dispatch({ type: 'load', files })
      }
    }

    const uploadSubmit = async (e) => {
      e.preventDefault();
      
      let AuthUser = function(id) {
        return axios.get(`/api/upload/${id}`).then(response => { 
          console.log(response);
          return response.data;
        });
      }
      
      const sendData = async () => {
        const myData = [];
          for (const value of category) {
            let result = await AuthUser(value.id);
            console.log(result);
            myData.push(result );
          }
        return myData;
      }
     
      sendData().then((result) => {
        console.log(result);
        const myImage = "zxfxfseerqsaxzzxzc3243";
        console.log(result);
        console.log(result[0].name);
        result[0].name.append(myImage);
        console.log(result);
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
        
        <p>Upload Files!!</p>
        <form onSubmit={uploadSubmit}>
            <Input onChange={onChange} />
            <input type="submit" value="Submit!" className="lg-button btn-primary"/>

            <div>
          {state.files.map(({ file, src, id }, index) => (
            <div key={`thumb${index}`} className="thumbnail-wrapper">
              <img className="thumbnail" src={src} alt="" />
              <div className="thumbnail-caption">{file.name}</div>
            </div>
          ))}
        </div>


        </form>

      </Card>
    );
  }

  export default BackUp;