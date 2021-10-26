import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";

function Booking({ safariId, showForm, parentCallback, handleShowForm }) {
    const [formData, setFormData] = React.useState({
      safariId: safariId,  
      name: '',
      email: '',
      phone: '',
      date: '',
      adults: '',
      children: '',
      comments:''
    });
  
    const handleSubmit = (event) => {
      event.preventDefault();
      parentCallback(formData);
    };
  
    const handleChange = event => {
      event.preventDefault();
      const { name, value } = event.target;
      setFormData(formData => ({
        ...formData,
        [name]: value,
      }))
    }
  
    console.log('Booking.ShowForm:= ' + showForm);

    if (!showForm) { 
      console.log('!!SHOW-FORM!! ' + showForm);
      return null;
    }

    const modalCart = showForm && ( 
      <div className='overlay'>
        <div className='popUp'>  
            <div class="pHeader">
              <div class="pChild">
                <span className="SafariTitle">For enquiries - Please Send us an 
                <NavLink to={{ pathname: "/email", state: { modal: true }, }} className="Nav_link urlStyle">E-Mail</NavLink></span>
              </div>
              <div class="pCloseMe"><a href="#" onClick={handleShowForm}><i class="fa fa-close"></i></a></div>
            </div>        
            <div class="popUp-content" style={{textAlign: 'center'}}>
              <form onSubmit={handleSubmit}>
                Name:  <input name="name"  onChange={handleChange}/>
                Email: <input name="email" onChange={handleChange}/>
                Phone: <input name="phone" onChange={handleChange}/>
                Date:  <input name="date"  onChange={handleChange}/>
                Adults: <input name="adults" onChange={handleChange}/>
                Children: <input name="children" onChange={handleChange}/> 
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div> 
      );
    
      return ReactDOM.createPortal(modalCart, document.getElementById('portal'));
  }

  export default Booking;