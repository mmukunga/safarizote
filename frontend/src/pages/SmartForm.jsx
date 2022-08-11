
import React from "react";
import { useForm, useWatch, FormProvider } from "react-hook-form";

export const SmartForm = ({ defaultValues, postData = () => {}, children, onSubmit }) => {
    const methods = useForm({ defaultValues });
    const { control, handleSubmit } = methods;
    const { isDirty, isValid } = methods.formState;
    const [isSecured, setIsSecured] = React.useState(false);
    const country = methods.watch("country");
    React.useEffect(() => {
      if(country !== undefined && country !== null) {
        postData(country);
      }
    }, [country]);

    React.useEffect(() => {
      if(!isSecured && isDirty) {
        console.log('This field is dirty');
        return (<p>This field is dirty</p>)
      }
    }, [isSecured, isDirty]);

    const authedUrl = useWatch({ control, name: 'authedUrl'});
    React.useEffect(() => {
      if(authedUrl !== undefined && authedUrl !== null) {
        setIsSecured(() => true);
        onSubmit(authedUrl); 
      }
    }, [authedUrl]);
 
    return (
      <FormProvider {...methods} >
      <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {Array.isArray(children)
          ? children.map((child) => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      register: methods.register,
                      key: child.props.name,
                      errors: methods.formState.errors,
                      disabled: !isValid
                    }
                  })
                : child;
            })
          : children}  
      </form>
      </div>  
      </FormProvider>
    );
  }