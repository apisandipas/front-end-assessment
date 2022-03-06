import "@testing-library/jest-dom/extend-expect"
import * as React from "react"
import { fireEvent, render, waitFor, act, queryByAttribute, queryAllByAttribute } from "@testing-library/react"
import { KoneksaForm } from './'

/*
   MUI's Batteries-included HelperText components get automatically generated ids passed on fieldnames
   Typically one would want to use data-testid attributes to avoid putting implementation details into the tests
*/
const getById = queryByAttribute.bind(null, "id");
const getByName = queryAllByAttribute.bind(null, "name");

describe("KoneksaForm validation behavior", () => {

  it("Renders okay with default values", async () => {
    const { getByLabelText, } = render(<KoneksaForm />)

    const nameInput = getByLabelText(/name/i) as HTMLInputElement;
    const passwordInput = getByLabelText(/password/i) as HTMLInputElement;
    const birthdayInput = getByLabelText(/birthday/i) as HTMLInputElement;
    const techPrefInput = getByLabelText(/tech preference/i) as HTMLInputElement;
    const pizzaToppingsInput = getByLabelText(/birthday/i) as HTMLInputElement;
    const timezoneInput = getByLabelText(/birthday/i) as HTMLInputElement;

    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe("");

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.value).toBe("");

    expect(birthdayInput).toBeInTheDocument();
    expect(birthdayInput.value).toBe("");

    expect(techPrefInput).toBeInTheDocument();
    expect(techPrefInput.checked).toBeFalsy();

    expect(pizzaToppingsInput).toBeInTheDocument();
    expect(pizzaToppingsInput.checked).toBeFalsy();

    expect(timezoneInput).toBeInTheDocument();
    expect(timezoneInput.checked).toBeFalsy();
  })

  describe("Name input", () => {
    it("takes valid input without error", async () => {

      const { getByLabelText, getByText, container } = render(<KoneksaForm />)

      const nameInput = getByLabelText(/name/i) as HTMLInputElement;
      const submitBtn = getByText(/submit/i)

      fireEvent.change(nameInput, { target: { value: "Bryan" } })
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(nameInput.value).toBe("Bryan");
        expect(
          getById(container, "name-helper-text")
        ).toBeFalsy();
      })
    })

    it("shows error with invalid input", async () => {

      const { getByLabelText, getByText, container } = render(<KoneksaForm />)

      const nameInput = getByLabelText(/name/i) as HTMLInputElement;
      const submitBtn = getByText(/submit/i)

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(nameInput.value).toBe("");
        expect(
          getById(container, "name-helper-text")
        ).toBeInTheDocument();
      })
    })
  })

  describe("Password input", () => {
    it("takes valid input without error", async () => {

      const { getByLabelText, getByText, container } = render(<KoneksaForm />)

      const passwordInput = getByLabelText(/password/i) as HTMLInputElement;
      const submitBtn = getByText(/submit/i)

      fireEvent.change(passwordInput, { target: { value: "supersecret123" } })

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(passwordInput.value).toBe("supersecret123");
        expect(
          getById(container, "password-helper-text")
        ).toBeFalsy();
      })
    })

    it("shows error with invalid input", async () => {

      const { getByLabelText, getByText, container } = render(<KoneksaForm />)

      const passwordInput = getByLabelText(/password/i) as HTMLInputElement;
      const submitBtn = getByText(/submit/i)

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(passwordInput.value).toBe("");
        expect(
          getById(container, "password-helper-text")
        ).toBeInTheDocument();
      })
    })
  })
  describe("Birthday input", () => {
    it("takes valid input without error", async () => {

      const { getByText, getByTestId, container } = render(<KoneksaForm />)

      const birthdayInput = (getByTestId("birthday").querySelector("#birthday")) as HTMLInputElement;
      const submitBtn = getByText(/submit/i)

      fireEvent.change(birthdayInput, { target: { value: "04/12/1985" } })

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(
          getById(container, "birthday-helper-text")
        ).toBeFalsy();
      })
    })

    it("shows error with invalid input", async () => {

      const { getByLabelText, getByText, container } = render(<KoneksaForm />)

      const passwordInput = getByLabelText(/password/i) as HTMLInputElement;
      const submitBtn = getByText(/submit/i)

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(passwordInput.value).toBe("");
        expect(
          getById(container, "birthday-helper-text")
        ).toBeInTheDocument();
      })
    })
  })


  describe("Tech Preference input", () => {
    it("takes valid input without error", async () => {

      const { getByText, container, } = render(<KoneksaForm />)

      const techPrefInput = getByName(container, "techPref")[0] as HTMLElement;

      const submitBtn = getByText(/submit/i)

      fireEvent.change(techPrefInput, { target: { checked: true } })

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(
          getById(container, "techPref-helper-text")
        ).toBeFalsy();
      })
    })

    it("shows error with invalid input", async () => {

      const { getByText, container } = render(<KoneksaForm />)

      const submitBtn = getByText(/submit/i)

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(
          getById(container, "techPref-helper-text")
        ).toBeInTheDocument();
      })
    })
  })

  describe("Pizza Toppings input", () => {
    it("takes valid input without error", async () => {

      const { getByText, container, } = render(<KoneksaForm />)

      const techPrefInput0 = getByName(container, "pizzaToppings")[0] as HTMLElement;

      const submitBtn = getByText(/submit/i)

      fireEvent.change(techPrefInput0, { target: { checked: true } })

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(
          getById(container, "pizzaToppings-helper-text")
        ).toBeFalsy();
      })
    })

    it("shows error with invalid input", async () => {

      const { getByText, container } = render(<KoneksaForm />)

      const submitBtn = getByText(/submit/i)

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(
          getById(container, "pizzaToppings-helper-text")
        ).toBeInTheDocument();
      })
    })
  })


  describe("Timezone input", () => {
    it("takes valid input without error", async () => {

      const { getByText, container, } = render(<KoneksaForm />)

      const timezoneInput = getByName(container, "timezone")[0] as HTMLElement;

      const submitBtn = getByText(/submit/i)

      fireEvent.change(timezoneInput, { target: { value: "America/Chicago" } })

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(
          getById(container, "timezone-helper-text")
        ).toBeFalsy();
      })
    })

    it("shows error with invalid input", async () => {

      const { getByText, container } = render(<KoneksaForm />)

      const submitBtn = getByText(/submit/i)

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(
          getById(container, "timezone-helper-text")
        ).toBeInTheDocument();
      })
    })
  })
})
