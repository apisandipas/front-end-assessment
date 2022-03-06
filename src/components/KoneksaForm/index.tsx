import Button from "@mui/material/Button";
import timezones from "timezones-list";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from '@components/Forms/TextInput'
import { DateInput } from '@components/Forms/DateInput'
import { RadioInput } from '@components/Forms/RadioInput'
import { CheckboxInput } from '@components/Forms/CheckboxInput'
import { SelectInput } from "@components/Forms/SelectInput";
import { FormContainer } from '../common'

const PIZZA_TOPPING_OPTIONS = ["pepperoni", "mushrooms", "anchovies"];
const TECH_OPTIONS = ["front end", "back end", "both"];
const TZ_CODES = timezones.map(tz => tz.tzCode);


type RawFormValues = {
  name: string;
  password: string;
  birthday: string;
  pizzaToppings: string[];
  techPref: "front end" | "back end" | "both";
  timezone: string;
};

type FinalFormValues = {
  name: string;
  password: string;
  birthday: string;
  preferences: {
    techPref: "front end" | "back end" | "both";
    pizzaToppings: string[];
    timezone: string;
  };
};

/**
*   Function to transform flat value object to nested request object
*/
const transformSubmission = (submission: RawFormValues): FinalFormValues => {
  const { pizzaToppings, techPref, timezone, ...others } = submission;
  return {
    ...others,
    preferences: {
      pizzaToppings,
      techPref,
      timezone,
    },
  };
};

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name should be of minimum 2 characters length")
    .required("Name is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  birthday: yup
    .date()
    .max(new Date(), "You were born in the future?! That can't be right...")
    .required("Birthday is required"),
  techPref: yup
    .string()
    .oneOf(["front end", "back end", "both"])
    .required("Tech Preference is required")
    .nullable(),
  pizzaToppings: yup.array().min(1, "Please select a Pizza Topping").required(),
  timezone: yup
    .string()
    .required("Please enter a timezone for your current location"),
});

function KoneksaForm() {

  // 'any' used here to prevent error of the default being null for techPref
  const formik = useFormik<any>({
    initialValues: {
      name: "",
      password: "",
      birthday: "",
      timezone: "",
      techPref: null,
      pizzaToppings: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values: RawFormValues): void => {
      alert(JSON.stringify(transformSubmission(values), null, 2));
    },
  });

  return (
    <FormContainer maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <TextInput name="name" label="Name" formik={formik} />
        <TextInput name="password" label="Password" type="password" formik={formik} />
        <DateInput name="birthday" label="Birthday" formik={formik} />

        <RadioInput
          name="techPref"
          label="Tech Preference"
          options={TECH_OPTIONS}
          formik={formik}
        />

        <CheckboxInput
          name="pizzaToppings"
          label="Pizza Toppings"
          options={PIZZA_TOPPING_OPTIONS}
          formik={formik}
        />

        <SelectInput
          name="timezone"
          options={TZ_CODES}
          formik={formik}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </FormContainer>
  );
}

export { KoneksaForm }
