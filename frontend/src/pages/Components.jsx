import React, { memo } from "react";
import { useFormContext } from "react-hook-form";
import Emoji from "./Emoji";

export const Label = ({ id, label }) => {
  const labelUpper = label ? id?.charAt(0).toUpperCase() + id?.slice(1): id;
  return (<label htmlFor={id}>{labelUpper}</label>);
};

export const Input = memo (({type, name, register, formState: { isDirty } }) => (
    <div className="row">
      <input type={type} {...register(name)} aria-label={name} />
    </div>
  ), (prevProps, nextProps) =>
    prevProps.formState.isDirty === nextProps.formState.isDirty
);

export const Button = ({ type='button', onClick, children }) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export const Submit = ({ type='submit', children }) => {
  return (
      <button type={type}>
        {children}
      </button>
  );
};

export const Select = props => {
  const { register } = useFormContext(); 
  return (
  <select {...register(props.name)} aria-label={props.name}>
    {props.options && props.options.map( (option, idx) =>
      <option key={idx} value={option.value}>{option.icon} {option.label}</option> )
    }
  </select>
  );
}

export const TextArea = ({ register, name, rule, ...rest }) => {
  return (  
    <textarea
      placeholder="Message"
      required
      name={name}
      {...register(name, {
        required: "Message is Required",
        minLength: {
          value: 3,
          message: "Should be greater than 3 characters"
        }
      })}
      {...rest}
    ></textarea>
  );
};

export const ThemeButton = ({ checked, toggleTheme }) => {
  return (
    <div className="theme-switch-wrapper">
    <label className="theme-switch">
      <input type="checkbox" id="toggleId" aria-label="toggleId"
        defaultChecked={checked}
        onChange={() => toggleTheme()}
      />
        <span className="slider round"/> 
    </label>
    </div>
  );
};

export const InputWrapper = ({type, labelObj, name, children }) => {
  const methods = useFormContext();
  if(labelObj.labeled) {
    return (<ComplexInput type={type} name={name} {...methods}>{children}</ComplexInput>);
  } else {
    return (<Input type={type} name={name} {...methods}>{children}</Input>);
  }
};

export const SelectWrapper = ({labelObj, name,  options, children }) => {
  const methods = useFormContext();
  if (labelObj.labeled) {
    return <ComplexSelect name={name} options={options} {...methods}>{children}</ComplexSelect>;
  }
  return <Select name={name} options={options} {...methods}>{children}</Select>;
};

const ComplexInput = memo(
  ({type, name, register, formState: { isDirty } }) => {
    const label = name ? name?.charAt(0).toUpperCase() + name?.slice(1): name;
    return(
    <div className="row">
      <div className="col-25">
      <label htmlFor={name}><Emoji label={label}/>{label}</label>
      </div>
      <div className="col-75">
      <input type={type} {...register(name)} aria-label={name} />
      </div>
    </div>
  )},
  (prevProps, nextProps) =>
    prevProps.formState.isDirty === nextProps.formState.isDirty
);

const ComplexSelect = memo (
  ({name, register, options, formState: { isDirty }, ...rest }) => (
    <div className="row">
      <div className="col-25">
        <label htmlFor={name}>{name}</label>
      </div>
      <div className="col-75">
        <select {...register(name)} {...rest}>
        {options.map(({value, label, icon},idx) => (
          <option key={idx} value={value}>{label} <Emoji label={label}/></option>
        ))}
        </select>
      </div>
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.formState.isDirty === nextProps.formState.isDirty
);