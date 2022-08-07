import React from 'react';
import Card from './Card';

const Pagination = ({ context, RenderComponent, title, pageLimit, dataLimit })=> {
    const data = context.data;
    const addToCart = context.addToCart;
    const [pages] = React.useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = React.useState(1);

    const nextPage = () => {
        setCurrentPage((page) => page + 1);
    }
  
    const previousPage = () => {
        setCurrentPage((page) => page - 1);
    }
  
    const changePage = (event) => {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }
  
    const getData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    }

    const getPageItems = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        console.log(start);
        console.log(pageLimit);
        const myList = new Array(pageLimit).fill(null).map((v, i) => start + i + 1);
        console.log(myList);
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <Card title="Safaris" className="Card">
          <ul className="nav">
            <li><a href="#"
              onClick={previousPage}
              className={`prev ${currentPage <= 1 ? 'disabled' : ''}`}
            >
              « Prev
            </a></li>     
            {getPageItems().map((item, idx) => (
              <li key={idx}><a href="#"
                onClick={changePage}
                className={`link ${currentPage === item ? 'active' : ''}`}
              >
                {item}
              </a></li>
            ))}  
            <li><a href="#"
              onClick={nextPage}
              className={`next ${currentPage >= pages ? 'disabled' : ''}`}
            >
              Next »
            </a></li>
          </ul>                
          <div className="Row">
            {getData().map((item, idx) => (
              <RenderComponent key={idx} data={item} addToCart={addToCart}/>
            ))}
          </div>        
      </Card>
    );
  }

  export default Pagination;