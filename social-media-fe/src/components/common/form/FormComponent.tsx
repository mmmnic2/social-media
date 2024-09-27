// "use client";

import { Form, Formik } from "formik";
import React from "react";
import { AppButton } from "../button/AppButton";
import FormFieldComponent from "./FormFields";
import buildValidationSchema from "./ValidationSchemaBuilder";

export interface FormField {
  name: string;
  inputType:
    | "text"
    | "password"
    | "radioButton"
    | "checkbox"
    | "range"
    | string;
  isMandatory: boolean;
  regex?: string;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  options?: { value: string; label: string }[];
  label?: string;
}

interface FormProps {
  form: FormField[];
  onSubmit: (values: Record<string, any>) => void;
  submitLabel: string;
  isLoading?: boolean;
}

const FormComponent: React.FC<FormProps> = ({
  form,
  isLoading,
  onSubmit,
  submitLabel = "submit",
}) => {
  const validationSchema = buildValidationSchema(form);

  const initialValues = form.reduce(
    (values, field) => {
      values[field.name] = "";
      return values;
    },
    {} as Record<string, string>,
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur={true}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form>
          {form.map((field, index) => (
            <FormFieldComponent
              key={index}
              field={field}
              touched={touched}
              errors={errors}
            />
          ))}
          <AppButton
            className="bg-primary text-white w-full py-3 rounded-xl hover:bg-secondary hover:text-text-primary transition-all duration-500 disabled:bg-gray disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-white"
            type="submit"
            disabled={!isValid || !dirty}
            loading={isLoading}
          >
            {submitLabel}
          </AppButton>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
