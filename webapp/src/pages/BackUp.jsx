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
      <img src="https://storage.googleapis.com/sms_familie_album/2013%20Disneyland%20Paris/05.08.2013/DSC01240.JPG?GoogleAccessId=safarizote-service-account@familiealbum-sms.iam.gserviceaccount.com&Expires=1632182242&Signature=VaVPVimXyjM38rh%2BKFPsvNDyfgDm%2B1M1Cn1wzLPW7Ke8fxjdXtHIoyhwBIFq4Me1SZD37jWuZH40XlikePRX9p%2FcxGmAk2k%2F%2BEc8JPlvcFDx8j4nNc%2Fzf6Kos4Wg1IK6Rj5Zca7hofjfV6VVER%2Buig5i%2FtkfVhec3mir2VjeK1dU9MfM5zIFfHbNQot8A%2BQ5qIMSNfZz9I4vskSrMxhvh9WVEAwLJZReAmsEJDkB5OxcPDMHMhvGnnrT4ggwt7aix4j0Wvua2Jwinis9fEeMIzqoe8AAKaNqsfP3JqNHYF6CRVi25KcrZ9q0y%2B73GT8rwYYvLxwiP%2B%2BoptoTWqNJ%2Fw%3D%3D"
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