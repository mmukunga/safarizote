import React from "react";
import { Submit, SelectWrapper } from "./Components";
import { SmartForm } from './SmartForm';
import {LogContext} from "./LogContext";
import Card from "./Card";
import axios from 'axios';
import Pagination from './Pagination';
import GcsPhoto from './GcsPhoto';
import Emoji from "./Emoji";

let defaultValues = { folder: '2012 MtKenya/' };

const BackUp = () => {
  const [options, setOptions] = React.useState([]); 
  const [photoAlbum, setPhotoAlbum] = React.useState([]);

  const [photosPerPage] = React.useState(6);
  const [offset, setOffset] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const context = React.useContext(LogContext);
    const log = context.log;
    const persistLog =  context.persistLog;

  const addToCart = (newCart) => {
    console.log(newCart);
    return {};
  }
  const hasLabel = {label: false};

  React.useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        axios.get('/api/listFolders', {params: {directory: 'sms_familie_album'}}).then((response) => {
          var folders = [];
          response.data.forEach(function(d) {
            folders.push({
                label: d,
                value: d
              });
            });  
          setOptions([...folders]);
          setIsLoading(false);
        }).catch( (error) => {
          setIsLoading(false);
         const path= '/api/listFolders';  
          persistLog(error, path);
        });         
    }
    
    fetchData();
    
  }, [persistLog]);
  
  function post(url, data) {
    return axios.post(url, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  }
  
  const onSubmit = (data) => {
    const getThumbnails = (data) => {
      return (data.map(photo => 
        <div className="thumbnail" key={photo.name}>
          <img src={photo.path} alt={photo.name}/>
          <p className="desc">{photo.name}</p>
        </div>)
      );
    };

    post("/api/findAlbum", {data}).then((resp) => {
      const result = resp.data;
      const slice = result.slice(offset - 1 , offset - 1 + photosPerPage);
      const photoData = getThumbnails(slice);
      setPhotoAlbum(photoData);
      setPageCount(Math.ceil(data.length / photosPerPage));
    });
  };

  const Spinner = () => <div className="loader"></div>;
  
  return (
    <Card title="BackUp"  className="Card">
        <strong>Selected Album: {'folder'} PageCount: {pageCount} </strong>        
        <SmartForm defaultValues={defaultValues} onSubmit={onSubmit}>
            <SelectWrapper name="folder" labelObj={hasLabel} options={options}/>
            <div className="row"><Submit name="Submit" type="submit"><Emoji label='Send'/>Submit</Submit></div>
        </SmartForm>
        {isLoading ? (
          <div className="pos-center">
             { <Spinner /> }
          </div>
          ) : (
            <>
              <span>Is Loaded!!</span>
              <Pagination
                  context={{data: photoAlbum, addToCart}}
                  RenderComponent={GcsPhoto}
                  title="GCS Album"
                  pageLimit={Math.ceil((photoAlbum.length)/2)}
                  dataLimit={4}
                />
            </>  
          )
        }
    </Card>
  );
};

export default BackUp;