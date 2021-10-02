import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import Card from './Card';
import ReactPaginate from 'react-paginate';
 
function BackUp() {
 const [value, setValue] = useState(''); 
 const [options, setOptions] = React.useState([]); 
 const [postsPerPage] = useState(6);
 const [offset, setOffset] = useState(1);
 const [posts, setAllPosts] = useState([]);
 const [pageCount, setPageCount] = useState(0);
 const [isLoading, setIsLoading] = useState(false);
 
 const node = document.createElement("div");
 const popup = (message, {type, timeout}) => {
   document.body.appendChild(node);
   const PopupContent = () => {
     return (
       <Popup type={type} open={true} timeout={timeout}>
         {message}
         <button
           onClick={clear}
         >Close</button>
       </Popup >
     );
   };
 
   const clear = () => {
     ReactDOM.unmountComponentAtNode(node);
     node.remove();
   }
   
   ReactDOM.render(<PopupContent/>, node);
 };

 const Popup = (props) => {
  return(
    <div style={{zIndex:props.open?"-100":"100", transition: `all ${props.timeout / 
         1000}s`, opacity: props.open?1:0}}>
        {props.children}
    </div>
  )
}


 React.useEffect(async () => {
    if (!posts.length) {
      const res = await axios.get(`/api/listAll`)
      const data = res.data;
      const result = data.map(a => a.name);
      setOptions(result);
    }
}, []);


  React.useEffect(() => {
    const getPostData = (data) => {
      return (
        data.map(post => <div className="thumbnail" key={post.name}>
          <img src={post.path} className="CssImage" alt='S.M.S'/>
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

    setIsLoading(true);
    getAllPosts();
  }, [offset]);

 const handlePageClick = (event) => {
   const selectedPage = event.selected;
   setOffset(selectedPage + 1)
   popup("Text within modal", {type: "info", timeout: 1000}); 
 };

 const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Submitting Name ${value}`)
  }

 return (
  <Card className="InnerCard" fontColor="black" >
      <div style={{border:'2px solid brown'}}>
        <strong>Select folder</strong>
        <form onSubmit={handleSubmit}>
          <select onChange={onChange}>
            <option value={'DefaultValue'}>{'..Select..'}</option>
            {options && options.map((folder, idx) => (
              <option key={idx} value={folder}>{folder}</option>
            ))}
          </select>
          Selected folder: {value}
          <input type="submit" value="Submit" />
        </form>
        {isLoading ? (
            <div className={isLoading ? "loader" : undefined}> 
                <div className="spinner"/> 
            </div>
          ) : (
            <span>Is Loaded!!</span>
          )}
      </div>

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
     <div className="gallery">
        {posts} 
     </div>
     <div class="newsbrief"> </div>
   </Card>
 );
}
 
export default BackUp;