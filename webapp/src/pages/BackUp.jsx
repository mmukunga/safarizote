import React, { useEffect, useState, useReducer, useCallback  } from "react";
import Card from './Card';
import axios , { post } from 'axios';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

// Constants
const LOADED = 'LOADED';

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
    case 'add_item' :
      return { ...state, files: [...state.files, action.payload] }  
    default:
      return state
  }
}

  const BackUp = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [category, setCategory] = React.useState([]);
    const [image, setImage] = React.useState('http://www.hyperlinkcode.com/images/sample-image.jpg');
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

    const onChange = (e) => {
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
          return response.data;
        });
      }
      
      const sendData = async (e) => {
        const myData = [];
          for (const value of category) {
            let result = await AuthUser(value.id);
            myData.push(result );
          }
        return myData;
      }
     
      sendData(e).then((result) => {
          console.log(result);
          console.log(state);
          console.log(state.files);
          var index = Math.floor(Math.random() * state.files.length);
          console.log('INDEX: ' + index);
          console.log(state.files[index]);
          const image = state.files[index].src;
          axios.get(`/api/gcsDownload?image=${image}`).then((response) => { 
              console.log(response.data);
              setImage(response.data);
              const date = new Date();
              const unixTimeStamp = Math.floor(date.getTime() / 1000);
              const File = {
                  lastModified: unixTimeStamp,
                  lastModifiedDate: date,
                  name: response.data,
                  size: 8000,
                  type: "image/jpeg",
                  webkitRelativePath: ""
              };

              const gcsData = {file: File, id: state.files.length+1, src: `blob:${response.data}`}
              dispatch({
                type: 'add_item',
                payload: { gcsData }
              });

          }).catch(error => {
              console.log(error);
          });
      });
          
      console.log("Submited OK!!");
  }

    const Input = (props) => (
      <input type="file" name="file" multiple {...props} style={{border:'2px solid red'}} />
    );

    return (
      <Card className="InnerCard" fontColor="black">
        <strong>Tree BackUp</strong>
        <p>Upload Files!!</p>
        <img src={image} className="resize" alt={"GCS Image!!"}/> 
        <form onSubmit={uploadSubmit}>
          <div className="BackUps">
              <Input onChange={onChange} />
          </div>  
          <div className="row">  
            <input type="submit" value="Submit!" className="lg-button btn-primary"/>
          </div>
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