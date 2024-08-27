import * as Yup from "yup";
import { FormField } from "./FormComponent";

const buildValidationSchema = (formFields: FormField[]) => {
  return Yup.object(
    formFields.reduce(
      (schema, field) => {
        console.log(schema, field);
        let validator: Yup.StringSchema = Yup.string();

        if (field.isMandatory) {
          validator = validator.required(`${field.name} is required`);
        }

        if (field.regex) {
          validator = validator.matches(
            new RegExp(field.regex),
            `${field.name} is not valid`,
          );
        }

        if (field.isEmail) {
          validator = validator.email("Invalid email");
        }

        if (field.minLength) {
          validator = validator.min(
            field.minLength,
            `${field.name} must be at least ${field.minLength} characters`,
          );
        }

        if (field.maxLength) {
          validator = validator.max(
            field.maxLength,
            `${field.name} must be at most ${field.maxLength} characters`,
          );
        }

        schema[field.name] = validator;
        return schema;
      },
      {} as Record<string, any>,
    ),
  );
};

export default buildValidationSchema;
