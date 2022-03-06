import * as React from 'react'
import TextField from '@mui/material/TextField'
import { FormikProps } from "formik"
import { InputWrapper } from '../common'

interface ITextInputProps {
  name: string;
  label: string;
  type?: string;
  formik: FormikProps<any>
}

const TextInput: React.FC<ITextInputProps> = ({ name, label, type = "text", formik }) => {
  const { touched, values, errors, handleChange } = formik
  return (
    <InputWrapper>
      <TextField
        fullWidth
        id={name}
        name={name}
        type={type}
        label={label}
        value={values[name]}
        onChange={handleChange}
        error={touched[name] && Boolean(errors[name])}
        helperText={touched[name] && errors[name]}
      />
    </InputWrapper>
  )
}

export { TextInput }
