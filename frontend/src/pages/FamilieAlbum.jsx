import React from 'react';
import axios from "axios";
import FamiliePhoto from './FamiliePhoto';
import Pagination from './Pagination';
import Card from './Card';

//src/FamilieAlbum.js
const FamilieAlbum = () => {
  const [familieAlbum, setFamilieAlbum] = React.useState([]);
  const [folders, setFolders] = React.useState([]);
  const [folder, setFolder] = React.useState('');
  const [loading, setLoading] = React.useState(true);
    
  const fetchFolders = async () => {
    return await axios.get("/api/folders");
  };

  React.useEffect(() => {
    fetchFolders().then((res) => {
      setFolders(res.data);
      setLoading(false);
    });
  }, []);

  function handleChange(e){
    const { value } = e.target;
    setFolder(value)
  }

  function handleSubmit(e){
      e.preventDefault()
    const fetchData = async () => {
      return await axios.get(`/api/categories?folder=${folder}`);
    };
      console.log(folder);
      fetchData().then((res) => {
          setFamilieAlbum(res.data);
          setLoading(false);
      });
  }

  return (
      <Card className="FamilieAlbum" styleProps={{width:'98%'}} title="Familie Album">
      <p>Original FamilieAlbum</p>
      <div className="container">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
          <fieldset>
            <p>Choose your Folder</p>
            <select name="folder"  value={folder} onChange={handleChange}>  
            {folders.map(el => {
                return (
                <option key={el.id} value={el.folder}>
                  {el.folder}
                </option>);
            })}
            </select>
            <button type="submit">Submit</button>
          </fieldset>
          </form>
        </div>
        {loading ? (
        <div>
          <h1>No Photos to display</h1>
              ...loading
        </div>
          ) : (
        <div>
          <Pagination
            data={familieAlbum}
            RenderComponent={FamiliePhoto}
            title="Posts"
            pageLimit={5}
            dataLimit={4}
          />
        </div>
          )}
      </div>
  </Card>
  )
}

export default FamilieAlbum;