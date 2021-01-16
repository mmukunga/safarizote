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
            <form onSubmit={handleSubmit}>
                {elements()}
                <Button buttonType='primary'  type="submit">Submit</Button>
                <Button buttonType="secondary" clicked={handleCancel}>Reset</Button>
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
        <div className="form-control">
           <label className="field-label" htmlFor={id}>{text}</label>
           <input
            className="form-input"
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
    const [selectedData, setSelectedData] = React.useState("");
    function handleInputChange(event) {
        setSelectedData(event.target.value);
        props.onChange(selectedData);
    }
    
    const { data } = props;
    console.log(data);
    
    let options = data.map(data => (
      <option key={data.id} value={data.value}>
          {data.value}
      </option>
    ));

    return (
      <div className="form-control">   
        <label htmlFor={props.id} className="field-label">{props.text}</label> 
        <select
         name={props.name} 
         id={props.id}
         className="form-input"
         onChange={handleInputChange}>
           <option>Select Item</option>
           {options}
        </select>
      </div>
    );
}
 
export const TextArea = props => {
    let formControl = "form-control";
    return (
        <div className={formControl}>
             <label className="field-label">{props.text}</label>
            <textarea {...props} className="form-input" />
        </div>
    );
}

export default UserForm;