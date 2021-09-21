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
          <img src={pd}  width="250" height="300" alt=" S M S "/>
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
      <p>Welcome to my backUp!!</p>
      { data }
    </div>
  );
}

export default BackUp