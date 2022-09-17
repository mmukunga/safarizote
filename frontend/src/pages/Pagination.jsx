import React from 'react';
import Card from './Card';

const Pagination = ({ context, RenderComponent, title, imageUrls, pageLimit, dataLimit })=> {
    const data = context.data;
    const addToCart = context.addToCart;
    //const [pages] = React.useState(Math.round(data.length / dataLimit));
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
              className={`next ${currentPage >= pageLimit ? 'disabled' : ''}`}
            >
              Next »
            </a></li>
          </ul>               
          <div className="Row">
            {getData().map((item) => (
              <RenderComponent key={item.id} data={item} addToCart={addToCart}/>
            ))}
          </div>        
      </Card>
    );
  }

  export default Pagination;