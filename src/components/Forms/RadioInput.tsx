import * as React from "react";
import { FormikProps } from "formik"
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { capitalize } from '@/utils'
import { InputWrapper } from '../common'

interface IRadioProps {
  name: string;
  label: string;
  options: string[];
  formik: FormikProps<any>;
}

const RadioInput: React.FC<IRadioProps> = ({ name, label, options, formik }) => {
  const { errors, touched, handleChange } = formik;
  return (
    <InputWrapper>
      <FormControl>
        <FormLabel id={`${name}-label`}>{label}</FormLabel>
        <RadioGroup row aria-labelledby={`${name}-label`}>
          {options.map((opt) => {
            return (
              <FormControlLabel
                key={opt}
                control={<Radio />}
                onChange={handleChange}
                label={capitalize(opt)}
                name={name}
                value={opt}
              />
            );
          })}
        </RadioGroup>
        {touched[name] && Boolean(errors[name]) && (
          <FormHelperText id={`${name}-helper-text`} error>
            {errors[name]}
          </FormHelperText>
        )}
      </FormControl>
    </InputWrapper>
  )
}

export { RadioInput }
