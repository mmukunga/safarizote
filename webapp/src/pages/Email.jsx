import React, { useState, useEffect } from "react";
import UserForm, { InputField, TextArea } from "./UserForm";
import axios from 'axios';

const initialState = {
  name: "Simon Mukunga",
  email: "mkunsim@gmail.com",
  message: "Email- Just Testing!! Great Stuff!!",
  dateCreated: new Date()
};

const Email = () => {
  const [formData, setFormData] = useState(initialState);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/email")
        .then(response => {
          setUsers(response.data)
        })
  }, []);

  console.log(users);
  console.log(formData);

  const handleChange = (event) => {
    setFormData((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value
    }));
  };
  
  const clearState = () => {
    setFormData({ ...initialState });
  };

  const handleSubmit = async (e) => {
    console.log('Send Email');
    console.log(e);
    axios.post("/api/sendEmail", formData)
      .then(response => {
          console.log('User has been created');
          console.log(response);
          clearState();
          console.log('Send Email OK!');
      }).catch(error => {
          console.log(error);
      });  
  };

  return (
    <div className="Email">
    <p>Please send us a Message..</p>



    <div class="contact" id="contact">
    <div class="container">
        <div class="contact-grid1">
            <div class="contact-top1">
                <form action="" method="post" enctype="multipart/form-data" name="contactus">
                    <div class="form-group">
                        <label>Name <span class="required">*</span></label>
                        <input type="text" name="name" placeholder="Name" required=""/>
                    </div>
                    <div class="form-group">
                        <label>E-mail <span class="required">*</span></label>
                        <input type="email" name="email" placeholder="E-mail" required=""/>
                    </div>
                    <div class="form-group">
                        <label>Phone Number <span class="required">*</span></label>
                        <input type="text" name="number" placeholder="Phone Number" required=""/>
                    </div>
                    <div class="form-group">
                        <label>Message <span class="required">*</span></label>
                            <textarea placeholder name="message"required=""></textarea>
                    </div>
                        <input type="submit" name="contactus" value="Submit"/>
                </form>
            </div>
        </div>
    </div>
</div>







    <UserForm
      cancel={() => {console.log('cancel')}}
      errors={[]}
      onChange={handleChange}
      submit={handleSubmit}
      elements={() => (
        <>        
          <InputField name="name"  text="Name"  type="text" onChange={handleChange}/>
          <InputField name="email" text="Email" type="text" onChange={handleChange}/>
          <TextArea name="message" text="Message" rows="4" cols="50" onChange={handleChange} placeholder="Write here.."/>
        </>
      )}
    >    
    </UserForm>
    </div>
  );
};

export default Email;