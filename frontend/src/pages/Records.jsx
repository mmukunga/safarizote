import React from 'react'

const Records = ({data}) => {
    
  return (  
    <div className="table">
         <div className="th">
            <div className="td">Id</div>
            <div className="td">Name</div>
            <div className="td">Data</div>
            <div className="td">Message</div>
            <div className="td">Stack</div>
            <div className="td">Timestamp</div>
        </div>
        {data.map((item, idx)=> {
            return (
            <div key={idx} className="tr">
                <div className="td">{item.id}</div>
                <div className="td">{item.name}</div> 
                <div className="td">{item.data}</div>
                <div className="td">{item.message}</div>
                <div className="td">{item.stack}</div> 
                <div className="td">{item.timestamp}</div>
            </div>
            );
        })}
    </div>
  ) 
}

export default Records  