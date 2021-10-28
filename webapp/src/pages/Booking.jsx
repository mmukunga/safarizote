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
                    <label for="names">Names</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="names" name="names" placeholder="Your names.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label for="gender">Gender</label>
                  </div>
                  <div class="col-75">
                    <select id="gender" name="gender">
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="NA">Other</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label for="email">E-Mail</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="email" name="email" placeholder="Your e-mail.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label for="phone">Phone</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="phone" name="phone" placeholder="Your phone.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label for="date">Arrival Date</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="date" name="date" placeholder="Arrival Date.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label for="adults">Number Of Adults</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="adults" name="adults" placeholder="Number Of Adults.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label for="children">Number Of Children</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="children" name="children" placeholder="Number Of Children.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label for="comments">Comments</label>
                  </div>
                  <div class="col-75">
                    <textarea id="comments" name="comments" placeholder="Write message.."  style={{height:'200px'}}></textarea>
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