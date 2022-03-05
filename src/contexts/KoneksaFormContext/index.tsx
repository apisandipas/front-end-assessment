import * as React from 'react'

const FormContext = React.createContext({});

const FormProvider: React.FC = ({ children }) => {
  const ctx = {}

  function validate(values: any) {
    const errors = {};



    return errors;
  }


  return <FormContext.Provider value={ctx}>{children}</FormContext.Provider>;
}

const useFormContext = () => React.useContext(FormContext);

export { useFormContext, FormProvider, FormContext }
