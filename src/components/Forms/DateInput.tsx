import * as React from 'react'
import { FormikProps } from "formik"
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { InputWrapper } from '../common'

interface IDateInputProps {
  name: string;
  label: string;
  formik: FormikProps<any>;
}

const DateInput: React.FC<IDateInputProps> = ({ name, label, formik }) => {

  const { errors, values, touched, setFieldValue } = formik;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputWrapper>
        <DatePicker
          label={label}
          value={values[name]}
          onChange={(value) => setFieldValue(name, value)}
          renderInput={(params) => {
            return (
              <TextField
                fullWidth
                id={name}
                data-testid={name}
                {...params}
                helperText={touched[name] && errors[name]}
                error={touched[name] && Boolean(errors[name])}
              />
            );
          }}
        />
      </InputWrapper>
    </LocalizationProvider>
  )
}

export { DateInput }
