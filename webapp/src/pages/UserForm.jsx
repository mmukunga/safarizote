import React from "react";

const UserForm =
    ({
        cancel,
        errors,
        onChange,
        submit,
        elements
    }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        submit(event);
    }

    const handleCancel = (event) => {
        event.preventDefault();
        cancel();
    }

    return (
        <React.Fragment>
            {errors}

            <div className="container">    
            <form>    
                <div className="row">    
                    <div className="col-25">    
                        <label for="fname">First Name</label>    
                    </div>    
                    <div className="col-75">    
                        <input type="text" 
                            id="fname" 
                            name="firstname" 
                            placeholder="Your name.."/>    
                    </div>    
                </div>    
                <div className="row">    
                    <div className="col-25">    
                        <label for="lname">Last Name</label>    
                    </div>    
                    <div className="col-75">    
                        <input type="text" 
                            id="lname" 
                            name="lastname" 
                            placeholder="Your last name.."/>    
                    </div>    
                </div>    
                <div className="row">    
                    <div className="col-25">    
                        <label for="email">Mail Id</label>    
                    </div>    
                    <div className="col-75">    
                        <input type="email" 
                            id="email" 
                            name="mailid" 
                            placeholder="Your mail id.."/>    
                    </div>    
                </div>    
                <div className="row">    
                    <div className="col-25">    
                        <label for="country">Country</label>    
                    </div>    
                    <div className="col-75">    
                        <select id="country" name="country">    
                            <option value="none">Select Country</option>    
                            <option value="australia">Australia</option>    
                            <option value="canada">Canada</option>    
                            <option value="usa">USA</option>    
                            <option value="russia">Russia</option>    
                            <option value="japan">Japan</option>    
                            <option value="india">India</option>    
                            <option value="china">China</option>    
                        </select>    
                    </div>    
                </div>    
                <div className="row">    
                    <div className="col-25">    
                        <label for="feed_back">Feed Back</label>    
                    </div>    
                    <div className="col-75">    
                        <textarea id="subject" 
                            name="subject" 
                            placeholder="Write something.." 
                            style="height:200px">
                        </textarea>    
                    </div>    
                </div>    
                <div className="row">    
                    <input type="submit" value="Submit" className="lg-button btn-primary"/>   
                </div>    
            </form>    
            </div>    


            <form className="formContainer" onSubmit={handleSubmit}>
                {elements()}   
                <div className="btnInput">
                    <Button buttonType='primary'  type="submit">Submit</Button>
                    <Button buttonType="secondary" clicked={handleCancel}>Reset</Button>
                </div>
            </form>
        </React.Fragment>
    );
 };


export const InputField = ({text,
    type,
    placeholder = text,
    onChange,
    name,
    id = name,
    required = false}) => {
  
    return (
        <div>
           <label htmlFor={id}>{text}</label>
           <input
            required={required}
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={onChange}/>
        </div>
    );
}
  
export const Button = ({clicked, buttonType, children }) => {
    return (
      <button type={buttonType} onClick={clicked} className="Button">
        {children}
      </button>
    );
}

export const Select = (props) => {
    function handleInputChange(event) {
        props.onChange(event);
    }
    
    const { data } = props;

    let options = data.map(data => (
      <option key={data.id} value={data.value}>
          {data.title}
      </option>
    ));

    return (
      <div>   
        <label htmlFor={props.id}>{props.text}</label> 
        <select
         name={props.name} 
         id={props.id}
         onChange={e => handleInputChange(e)}>
           <option>Select Item</option>
           {options}
        </select>
      </div>
    );
}
 
export const TextArea = props => {
    return (
        <div>
             <label>{props.text}</label>
            <textarea {...props}/>
        </div>
    );
}

export default UserForm;