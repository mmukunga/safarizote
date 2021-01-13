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
        submit();
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


export const Input = ({text,
    type,
    placeholder = text,
    onChange,
    name,
    id = name,
    required = false}) => {
  
    return (
        <>
           <label htmlFor={id}>{text}</label>
           <input
            className="Input"
            required={required}
            name={name}
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={onChange}/>
        </>
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
    const [data] = React.useState(props.data);
    const [selectedData, setSelectedData] = React.useState("");

    function handleInputChange(event) {
        setSelectedData(event.target.value);
        props.onChange(selectedData);
    }

    let options = data.map(data => (
      <option key={data.id} value={data.id}>
          {data.name}
      </option>
    ));

    return (
      <select name="customSearch"
        className="custom-search-select"
        onChange={handleInputChange}>
            <option>Select Item</option>
            {options}
      </select>
    );
}

export const TextArea = props => {
    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <textarea {...props} className={formControl} />
        </div>
    );
}

export default UserForm;