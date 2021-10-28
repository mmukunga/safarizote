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
              <div class="pCloseMe"><a href="#" onClick={handleShowForm}>&#x274C;</a></div>
            </div>        
            <div class="popUp-content" style={{textAlign: 'center'}}>
              <form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col-25">
                    <label for="fname">First Name</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="fname" name="firstname" placeholder="Your name.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label for="lname">Last Name</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label for="country">Country</label>
                  </div>
                  <div class="col-75">
                    <select id="country" name="country">
                      <option value="australia">Australia</option>
                      <option value="canada">Canada</option>
                      <option value="usa">USA</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label for="subject">Subject</label>
                  </div>
                  <div class="col-75">
                    <textarea id="subject" name="subject" placeholder="Write something.."  style={{height:'200px'}}></textarea>
                  </div>
                </div>
                <div class="row">
                  <input type="submit" value="Submit"/>
                </div>
              </form>
            </div>
          </div>
        </div> 
      );
    
      return ReactDOM.createPortal(modalCart, document.getElementById('modal_root'));
  }

  export default Booking;