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
      <img src="https://storage.googleapis.com/sms_familie_album/FrognerParken_Samuel.pdf?GoogleAccessId=safarizote-service-account@familiealbum-sms.iam.gserviceaccount.com&Expires=1650155798&Signature=Doh0Fcgsc1e9JxRFiAzdPTJhkAVsZcNPi6mSj43ugaa01D5hlPfGSxdSn%2BBjh2UIXycuGfVA5T4BoIck%2Fi3ZaK670Q%2FT%2FcEsb1h0OGbBszkVCVCVV%2BMB6FEUdhi0vH5a49i%2BHs9%2FCAlbmIxI3V94QiUCtaOCLMZEbI35%2F67MQ0n%2FTXpattkFzrqR688aFjXXYlBODhpZ8cM%2B6iTxJe5eF%2BSCeglkPqb3SuDQJxVxXrN9sJ%2BCKMnvXHJMvVrabrLo3DNDySkc82ayivwHjcM5A8EjWOEQYgL5NZ2daHBEGo6beA22K4SkjkwNawFQ1R1cluL%2BwGQAF%2F6G6vKIV%2FYjkA%3D%3D"
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