import * as React from "react";
import { FormikProps } from "formik"
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputWrapper } from '../common'
import { capitalize } from '@/utils'

interface ISelectProps {
  name: string;
  options: string[];
  formik: FormikProps<any>;
}

const SelectInput: React.FC<ISelectProps> = ({ name, options, formik }) => {
  const { errors, touched, values, setFieldValue } = formik;
  return (
    <InputWrapper>
      <Autocomplete
        id={name}
        value={values[name]}
        onChange={(event: any, newValue: string | null): void => {
          setFieldValue(name, newValue);
        }}
        isOptionEqualToValue={(option: string, value: string): boolean =>
          option.includes(value)
        }
        inputValue={values[name]}
        onInputChange={(event: any, newInputValue: string | null): void => {
          setFieldValue(name, newInputValue);
        }}
        options={options}
        renderInput={(params) => (
          <TextField
            name={name}
            date-testid={`${name}-error-msg`}
            label={capitalize(name)}
            error={touched[name] && Boolean(errors[name])}
            helperText={touched[name] && errors[name]}
            {...params}
          />
        )}
      />
    </InputWrapper>
  );
};

export { SelectInput };
