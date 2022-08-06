import React from 'react'

const Card = ({ title, image, className, children }) => {
  const classes = `${className}`;
  return (
    <div className={classes}>
        { image 
          ? <img src={`${image}`} className="textWrap" alt={title}/>
          : null
        }
        {title? <div dangerouslySetInnerHTML={{ __html: title }} className="title"/> : null} 
        {children}
    </div>
  )
}

export default Card