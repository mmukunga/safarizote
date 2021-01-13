import React from "react";
import UserForm from "./UserForm";

const initialState = {
  email: "",
  password: ""
};

const reducer = (state, action) => {
  if (action.type === "reset") {
      return initialState;
  }

  const result = { ...state };
  result[action.type] = action.value;
  return result;
};

const SignIn = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password } = state;

  const handleSubmit = e => {
    e.preventDefault();
    /* fetch api */
    console.log('Sign In!!');
    /* clear state */
    dispatch({ type: "reset" });
};

const handleChange = e => {
  const { name, value } = e.target;
  dispatch({ type: name, value });
};

  return (
    <UserForm
      cancel={() => {console.log('cancel')}}
      errors={[]}
      onChange={handleChange}
      submit={handleSubmit}
      elements={() => (
        <>
          <div controlId="ControlId">
            Please Sign In!
            <Input handleChange={handleChange}/>
            <Input handleChange={handleChange}/>
          </div>
        </>
      )}
    >    
    </UserForm>
    );
} 

export default SignIn;