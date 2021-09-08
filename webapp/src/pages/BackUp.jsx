import React, { useEffect, useState, useReducer, useCallback  } from "react";
import LazyLoad from "react-lazyload";
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
      return { ...state, files: action.payload, status: LOADED }
    case 'add_item' :
      return { ...state, files: [...state.files, action.payload] }  
    default:
      return state
  }
}

const Spinner = () => {
  <div className="Loading">
    <strong>Loading..</strong>
  </div>
}

const LazyImage = ({src, alt}) => {
  <div className="post">
    <LazyLoad once={true} >
    <div className="ThumbnailDiv">
      <img src={src} className="Thumbnail" alt={alt} />
    </div>
    </LazyLoad>
  </div>
}

const BackUp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    axios.get("/api/categories").then(response => {
        console.log(response);
        console.log(response.data);
        setImages(images => [...images, ...response.data]);
        console.log('1.response');
        console.log(images);
        const fileName = 'http://www.hyperlinkcode.com/images/sample-image.jpg';
        const date = new Date();
        const unixTimeStamp = Math.floor(date.getTime() / 1000);
        console.log('2.response');
        const File = {
            lastModified: unixTimeStamp,
            lastModifiedDate: date,
            name: fileName,
            size: 8000,
            type: "image/jpeg",
            webkitRelativePath: ""
        };
        console.log('3.response');
        const gcsData = {file: File, id: state.files.length+1, src: `${fileName}`}
        console.log('4.response');
        dispatch({ type: 'add_item', payload: gcsData });
        console.log('5.response');
    }).catch(error => {
        console.log(error);
    });
  }, []);  

  const onChange = (e) => {
    if (e.target.files.length) {
      const arrFiles = Array.from(e.target.files)
      const files = arrFiles.map((file, index) => {
        console.log(file);
        const src = window.URL.createObjectURL(file);
        console.log(src);
        return { file, id: index, src }
      })
      dispatch({ type: 'load', payload: files })
    }
  }

  const uploadSubmit = async (e) => {
      e.preventDefault();
      
      ValidateUser(e).then((result) => {
          console.log(result);
          console.log(state);
          console.log(state.files);

          const formData = new FormData();
          formData.append('file',state.files)
          const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          }

          console.log(formData);
          
          var index = Math.floor(Math.random() * state.files.length);
          console.log('INDEX: ' + index);
          console.log(state.files[index]);
          const image = state.files[index].src;
          axios.get(`/api/gcsDownload?image=${image}`).then((response) => { 
              console.log(response.data);
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

              const gcsData = {file: File, id: state.files.length+1, src: `${response.data}`}
              dispatch({
                type: 'add_item',
                payload: gcsData
              });

          }).catch(error => {
              console.log(error);
          });
      });
          
      console.log("Submited OK!!");
  }
        
  const ValidateUser = async (e) => {
    //const myData = [];
    const token = localStorage.getItem('userToken');
    let result = await AuthUser(token);
    //myData.push(result );
    //  }
    return result;
  }

  const AuthUser = async(token) => {
    console.log("TOKEN:= " + token);
    axios.get(`/api/userByToken/${token}`).then(response => { 
      console.log(response);
      return response.data;
    });
  }

  return (
    <Card className="InnerCard" fontColor="black">
      <strong>Upload Files!!</strong>
      <form onSubmit={uploadSubmit}>
        <div className="BackUps">  
          <input type="file" name="file" multiple className="lg-button btn-primary"  onChange={onChange} />
        </div>
        <div>
          {state.files.map(({ file, src, id }, index) => (
            <div key={`thumb${index}`} className="thumbnail-wrapper">
              <img className="thumbnail" src={src}  className="resize" alt={"GCS Image!!"} />
              <div className="thumbnail-caption">{file.name.substring(
                    file.name.lastIndexOf("sms_familie_album"), 
                    file.name.lastIndexOf("?")
                )}</div>
            </div>
          ))}
        </div>

        <div className="photo-gallery">
          <div className="thumbs-list">
            {images && images.map((imgUrl, idx) => {
              return (
              <LazyLoad height={200} offset={100}>  
                <LazyImage src={imgUrl} alt={idx} />
              </LazyLoad>
              );
            })}
          </div>
        </div>

      </form>
    </Card>
  );
}

export default BackUp;