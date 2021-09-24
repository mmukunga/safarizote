import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
 
function BackUp() {
 const [postsPerPage] = useState(5);
 const [offset, setOffset] = useState(1);
 const [posts, setAllPosts] = useState([]);
 const [pageCount, setPageCount] = useState(0);
 const [isLoading, setIsLoading] = useState(false);
 
 const getPostData = (data) => {
   return (
     data.map(post => {<div key={post.name}>
       <p>User ID: {post.name}</p>
       <img src={post.path} className="Thumbnail" alt=" S M S "/>
     </div>})
   )
 
 }
 
 const getAllPosts = async () => {
   setIsLoading(true);
   const res = await axios.get(`/api/categories`)
   const data = res.data;
   const slice = data.slice(offset - 1 , offset - 1 + postsPerPage);
 
   // For displaying Data
   const postData = getPostData(slice);
 
   // Using Hooks to set value
   setAllPosts(postData);
   setPageCount(Math.ceil(data.length / postsPerPage));
   setIsLoading(false);
   console.log(posts);
 }
 
 const handlePageClick = (event) => {
   const selectedPage = event.selected;
   setOffset(selectedPage + 1)
 };
 
 useEffect(() => {
   getAllPosts()
 }, [offset])
 
 console.log(posts);

 return (
   <div style={{border:'2px solid purple'}}>
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
     {posts} 
   </div>
 );
}
 
export default BackUp;