import React, { useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
 
function BackUp() {
 const [value, setValue] = useState(''); 
 const [folders, setFolders] = React.useState([]); 
 const [postsPerPage] = useState(5);
 const [offset, setOffset] = useState(1);
 const [posts, setAllPosts] = useState([]);
 const [pageCount, setPageCount] = useState(0);
 const [isLoading, setIsLoading] = useState(false);
 
 React.useEffect(async () => {
   console.log('Her..');
    if (!posts.length) {
      console.log('Inne..');
      const res = await axios.get(`/api/findAll`)
      const data = res.data;
      const result = data.map(a => a.name);
      setFolders(prevFolders => [...prevFolders, ...result]);
    }
}, []);

 const getPostData = (data) => {
    return (
      data.map(post => <div className="gallery" key={post.name}>
        <img src={post.path} className="cssImage" alt='S M S'/>
        <p className="desc">{post.name}</p>
      </div>)
    )
  };

  const getAllPosts = async () => {
    const res = await axios.get(`/api/categories`)
    const data = res.data;
    const slice = data.slice(offset - 1 , offset - 1 + postsPerPage)

    const postData = getPostData(slice)

    setAllPosts(postData);
    setPageCount(Math.ceil(data.length / postsPerPage));
    setIsLoading(false);
  }

  React.useEffect(() => {
    setIsLoading(true);
    getAllPosts();
  }, [offset]);

 const handlePageClick = (event) => {
   const selectedPage = event.selected;
   setOffset(selectedPage + 1)
 };

 const onChange = (event) => {
  setValue(event.target.value);
};

const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${value}`)
}

 console.log(posts);
 console.log(folders);

 return (
   <div style={{border:'2px solid purple'}}>
     <h4>Select folder</h4>
     <form onSubmit={handleSubmit}>
       <select onChange={onChange}>
         <option value={'DefaultValue'}>{'..Select..'}</option>
         {folders && folders.map((folder, idx) => (
           <option key={idx} value={folder}>{folder}</option>
         ))}
       </select>
       <input type="submit" value="Submit" />
       <div>Selected folder: {value}</div>
     </form>
     {isLoading ? (
        <div className={isLoading ? "loader" : undefined}> 
            <div className="spinner"/> 
        </div>
      ) : (
        <div>Is Loaded!!</div>
      )}

     <ReactPaginate
       previousLabel={"prev"}
       nextLabel={"next"}
       breakLabel={"..."}
       breakClassName={"break-me"}
       pageCount={pageCount}
       onPageChange={handlePageClick}
       containerClassName={"pagination"}
       subContainerClassName={"pages pagination"}
       activeClassName={"active"} />
     {/* Display all the posts */}
     <div className="thumbnails">
     {posts} 
     </div>
     <div class="newsbrief"> </div>
   </div>
 );
}
 
export default BackUp;