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
  const [isLoading, setIsLoading] = useState(false);
  
    const getData = async() => {
      setIsLoading(true);
      const res = await axios.get(`/api/categories`);

      const data = res.data;
      const slice = data.slice(offset, offset + perPage);
      const postData = slice.map((pd,id) => <div key={id} className="thumbnail">
          <p className="desc">{pd.name}</p>
          <img src={pd.path} width="500" height="600" alt=" S M S "/>
      </div>);
      setData(postData);
      setPageCount(Math.ceil(data.length / perPage));
      setIsLoading(false);
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
      {isLoading ? (
        <div className={isLoading ? "loader" : undefined}><div className="spinner" /></div>
      ) : (
        <div>Is Loaded!!</div>
      )}

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