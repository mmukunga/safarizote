import React, { useEffect, useState, useReducer, useCallback  } from "react";
import Card from './Card';
import axios , { post } from 'axios';
import fs from 'fs';
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
    default:
      return state
  }
}

  const BackUp = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [category, setCategory] = React.useState([]);
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
        const [file] = e.target.files[0];
        const arrayBuffer = file.arrayBuffer()
        const myBlob = new Blob([new Uint8Array(arrayBuffer)], {
          type: file.type,
        });

        formData.append('myBlob', myBlob, file.name);

        axios.post('/api/uploadFile', form, {
            headers: {
              ...formHeaders,
            },
          }).then((response) => { 
            console.log(response);
          }).catch(error => error);


        var formElement =  document.querySelector('input[type=file]');
        console.log(formElement);
        console.log(state.files);
        var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
        result[0].name=state.files;
        console.log(result);
        const options = {
          headers: {
              'Content-Type': 'application/json',
          }
        };
        
        axios.post("/api/uploadFile", result, options).then((response) => { 
            console.log(response);
          }).catch(error => {
            console.log(error);
        });
      })
      
      console.log("Submited OK!!");
    };
    
    const Input = (props) => (
      <input type="file" name="file" multiple {...props} style={{border:'2px solid red'}} />
    );

    return (
      <Card className="InnerCard" fontColor="black">
        <strong>Tree BackUp</strong>
        <p>Upload Files!!</p>
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