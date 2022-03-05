import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import DatePicker from "@mui/lab/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import timezones from "timezones-list";
import { useFormik } from "formik";
import * as yup from "yup";

const PIZZA_TOPPING_OPTIONS = ["pepperoni", "mushrooms", "anchovies"];
const TECH_OPTIONS = ["front end", "back end", "both"];

type RawFormValues = {
  name: string;
  password: string;
  birthday: string;
  pizzaToppings: string[];
  techPref: "front end" | "back end" | "both" | null;
  timezone: string;
};

type FinalFormValues = {
  name: string;
  password: string;
  birthday: string; // ISO Format
  preferences: {
    techPref: "front end" | "back end" | "both" | null;
    pizzaToppings: string[];
    timezone: string;
  };
};

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
    .max(new Date(), "You were born in the future?! Thats can't be right...")
    .required("Birthday is required"),
  techPref: yup
    .string()
    .oneOf(["front end", "back end", "both"])
    .required("Tech Preference is required"),
  pizzaToppings: yup.string().required("Please select a Pizza Topping"),
  timezone: yup
    .string()
    .required("Please enter a timezone for your current location"),
});

function KoneksaForm() {
  const { errors, values, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
        birthday: "",
        timezone: "",
        techPref: null,
        pizzaToppings: [],
      },
      validationSchema: validationSchema,
      onSubmit: (values: RawFormValues) => {
        alert(JSON.stringify(transformSubmission(values), null, 2));
      },
    });

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={values.name}
          onChange={handleChange}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Birthday"
            id="birthday"
            name="birthday"
            value={values.birthday}
            onChange={(value) => setFieldValue("birthday", value)}
            renderInput={(params) => {
              return (
                <TextField
                  fullWidth
                  {...params}
                  helperText={touched.birthday && errors.birthday}
                  error={touched.birthday && Boolean(errors.birthday)}
                />
              );
            }}
          />
        </LocalizationProvider>

        <FormControl>
          <FormLabel id="techPref-label">Tech Preference</FormLabel>
          <RadioGroup row aria-labelledby="techPref-label" name="techPref">
            <FormControlLabel
              value="front end"
              control={<Radio />}
              onChange={handleChange}
              label="Front End"
            />
            <FormControlLabel
              value="back end"
              control={<Radio />}
              onChange={handleChange}
              label="Back End"
            />
            <FormControlLabel
              value="both"
              control={<Radio />}
              onChange={handleChange}
              label="Both"
            />
          </RadioGroup>
          {touched.techPref && Boolean(errors.techPref) && (
            <FormHelperText error>
              Please select your preferred tech
            </FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel id="pizzaToppings-label">Pizza Toppings</FormLabel>
          <FormGroup row aria-labelledby="pizzaToppings-label">
            <FormControlLabel
              control={<Checkbox />}
              onChange={handleChange}
              label="Pepperoni"
              name="pizzaToppings"
              value="pepperoni"
            />
            <FormControlLabel
              control={<Checkbox />}
              onChange={handleChange}
              label="Mushrooms"
              name="pizzaToppings"
              value="mushrooms"
            />
            <FormControlLabel
              control={<Checkbox />}
              onChange={handleChange}
              label="Anchovies"
              name="pizzaToppings"
              value="anchovies"
            />
          </FormGroup>
          {touched.pizzaToppings && Boolean(errors.pizzaToppings) && (
            <FormHelperText error>
              You must pick at least one pizza topping!
            </FormHelperText>
          )}
        </FormControl>

        <Autocomplete
          id="timezone"
          value={values.timezone}
          onChange={(event: any, newValue: string | null) => {
            setFieldValue("timezone", newValue);
          }}
          isOptionEqualToValue={(option, value) => option.includes(value)}
          inputValue={values.timezone}
          onInputChange={(event, newInputValue) => {
            setFieldValue("timezone", newInputValue);
          }}
          options={timezones.map((tz) => tz.tzCode)}
          renderInput={(params) => (
            <TextField
              name="timezone"
              label="Timezone"
              error={touched.timezone && Boolean(errors.timezone)}
              helperText={touched.timezone && errors.timezone}
              {...params}
            />
          )}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export { KoneksaForm };
