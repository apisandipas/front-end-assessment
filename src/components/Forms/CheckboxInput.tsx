import * as React from "react";
import { FormikProps } from "formik"
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { InputWrapper } from '../common'
import { capitalize } from '@/utils'

interface ICheckboxProps {
  name: string;
  label: string;
  options: string[];
  formik: FormikProps<any>;
}

const CheckboxInput: React.FC<ICheckboxProps> = ({ name, label, options, formik }) => {

  const { errors, touched, handleChange } = formik;
  return (
    <InputWrapper>
      <FormControl>
        <FormLabel id={`${name}-label`}>{label}</FormLabel>
        <FormGroup row aria-labelledby={`${name}-label`}>
          {options.map((opt) => {
            return (
              <FormControlLabel
                key={opt}
                control={<Checkbox />}
                onChange={handleChange}
                label={capitalize(opt)}
                name={name}
                value={opt}
              />
            );
          })}
        </FormGroup>
        {touched[name] && Boolean(errors[name]) && (
          <FormHelperText id={`${name}-helper-text`} error>
            {errors[name]}
          </FormHelperText>
        )}
      </FormControl>
    </InputWrapper>
  )
}

export { CheckboxInput }
