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
            <form className="formContainer" onSubmit={handleSubmit}>
                {elements()}
                <div className="formButtons">   
                    <div className="btnInput">
                        <Button buttonType='primary'  type="submit">Submit</Button>
                        <Button buttonType="secondary" clicked={handleCancel}>Reset</Button>
                    </div>
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