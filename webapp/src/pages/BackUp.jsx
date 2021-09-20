import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';


const BackUp = () => {
  const [name,  setName]  = useState("");
  const [value, setValue] = useState('');
  const [items, setItems] = React.useState([]);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

    React.useEffect(() => {
      const fetchItems = async () => {
          const response = await axios.get("/api/listAll");
          try {
              console.log(response);
              setItems(items => [...items, ...response.data]);
          } catch (err) {
              console.log(err);
          }
      };

      fetchItems();
    }, []);
  
    const getData = async() => {
      const res = await axios.get(`/api/listAll`)
      const data = res.data;
      const slice = data.slice(offset, offset + perPage);
      const postData = slice.map((pd,idx) => <div key={idx}>
          <p style={{fontSize:'15px'}}>{pd}</p>
          <img src={"https://storage.googleapis.com/sms_familie_album/"+pd} alt=" S M S "/>
      </div>);
      setData(postData);
      setPageCount(Math.ceil(data.length / perPage));
  }

  const handlePageClick = (e) => {
      const selectedPage = e.selected;
      setOffset(selectedPage + 1)
  };

  useEffect(() => {
    getData()
  }, [offset])

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Submitting Name ${name}`)
  }
  return (
    <div className='backUp'>
      <h3>Folders BackUp</h3>
      <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}/>
      <h4>Select folder</h4>
      <form onSubmit={handleSubmit}>
        <select onChange={onChange}>
          {items.map((item, idx) => (
            <option key={idx} value={item}>{item}</option>
          ))}
        </select>
        <div>Selected folder: {value}</div>
        <label>Frirst Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>WEKA HII to my backUp!!</p>
      <img src="Elias%20Barnas%20Holmenkolldag%202009.jpg?GoogleAccessId=safarizote-service-account@familiealbum-sms.iam.gserviceaccount.com&Expires=1632168867&Signature=kTjdRBM2h6ZMKTx0ne5s%2By5rkGam5ts5aWpq9kUf7R68u%2FcaaJc3TqavAFyMdZWimAFijmwTK8lYzMgTP6G2OpIav2Eydg%2Ffwuicr4fPArJ7sJfeFR6Ssas6q1HsnPLHKkZ43iskQoKLzb7gmg4dbcgA6OWz%2BxqpygmfFyfwvrIC07Fv4KpzIWeT7Att5sGazY8u%2FHbfHZY%2FmUyBJ%2BL%2F5DWChX3zKVlcZ6ftwRz7lHSkvEGmZ4ImPTw8oVMPdOUNTvnBFm6LSyGizQowFBjA4p1bTvMLt5SFlEB2v9UQFXORhXx2CF2hKUw9JQRjaCtgoWHLfiuI3VQkeRITT%2FQPLg%3D%3D"
           alt="Samuel på Frogner parken"/>
      <p>Welcome to my backUp!!</p>
      {data}
      <div className="userList">
            {items && items.map((item, idx) => (
                <li key={idx}>{item}</li>
            ))}
        </div>
    </div>
  );
}

export default BackUp