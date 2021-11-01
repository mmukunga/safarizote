import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Booking({ safariId, showForm, parentCallback, handleShowForm }) {
  const [startDate, setStartDate] = React.useState(new Date());
    const [formData, setFormData] = React.useState({
      safariId: safariId,  
      name: '',
      email: '',
      phone: '',
      date: new Date(),
      adults: '',
      children: '',
      comments:''
    });
  
    const handleSubmit = (event) => {
      event.preventDefault();
      parentCallback(formData);

      const validate = (formdata) => {
          const errors = {};
          if (!formdata.name) {
            errors.name = "Required";
          }
          if (!formdata.email && formdata.email === "test") {
            errors.email = "Required";
          }
          return errors;
      }


    };
  
    const handleChange = event => {
      event.preventDefault();
      const { name, value } = event.target;
      setFormData(formData => ({
        ...formData,
        [name]: value,
      }))
    }

    if (!showForm) { 
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
            <p id="formInstructions">Fields marked with an asterisk (*) are required.</p>    
            <div class="popUp-content" style={{textAlign: 'center'}}>
              <form className="form-container" onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col-25">
                    <label class="required" style={{padding: '2px 2px 2px 0'}} for="names">Names</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="names" name="names" style={{padding: '2px'}} onChange={handleChange} required aria-required="true" placeholder="Your names.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label style={{padding: '2px 2px 2px 0'}} for="gender">Gender</label>
                  </div>
                  <div class="col-75">
                    <select id="gender" name="gender" style={{padding: '2px'}}>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="NA">Other</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label class="required" style={{padding: '2px 2px 2px 0'}} for="email">E-Mail</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="email" name="email" style={{padding: '2px'}} onChange={handleChange} required aria-required="true" placeholder="Your e-mail.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label style={{padding: '2px 2px 2px 0'}} for="phone">Phone</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="phone" name="phone" style={{padding: '2px'}} onChange={handleChange} placeholder="Your phone.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label class="required" style={{padding: '2px 2px 2px 0'}} for="date">Arrival Date</label>
                  </div>
                  <div class="col-75">
                  <DatePicker selected={startDate} className="cssDate" onChange={(date) => setStartDate(date)} required aria-required="true"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label class="required" style={{padding: '2px 2px 2px 0'}} for="adults">Adults</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="adults" name="adults" style={{padding: '2px'}} onChange={handleChange} required aria-required="true" placeholder="Number Of Adults.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label style={{padding: '2px 2px 2px 0'}} for="children">Children</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="children" name="children" style={{padding: '2px'}} onChange={handleChange} placeholder="Number Of Children.."/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label style={{padding: '2px 2px 2px 0'}} for="comments">Comments</label>
                  </div>
                  <div class="col-75">
                    <textarea id="comments" name="comments" style={{padding: '2px'}} onChange={handleChange} placeholder="Write message.."  style={{height:'150px'}}></textarea>
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