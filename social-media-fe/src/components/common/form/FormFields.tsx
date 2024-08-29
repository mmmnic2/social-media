import { InputLabel, TextField } from "@mui/material";
import { Field, ErrorMessage, FieldProps } from "formik";
import React from "react";
import PasswordField from "./formFields/PasswordField";
import RadioButtonField from "./formFields/RadioButtonField";

interface FormFieldComponentProps {
  field: {
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
    options?: { value: string; label: string }[];
    label?: string;
  };
  touched: Record<string, boolean | undefined>;
  errors: Record<string, string | undefined>;
  inputClassName?: string;
}

const FormField: React.FC<FormFieldComponentProps> = ({
  field,
  touched,
  errors,
  inputClassName,
}) => {
  const { name, inputType, options, label } = field;
  const isError = touched[field.name] && errors[field.name];
  const fieldClassName = `w-full px-3 py-2 border rounded-md ${isError ? "border-red-500" : "border-gray-300"} ${inputClassName || ""} focus:outline-none focus:ring-2 focus:ring-blue-500`;

  const getInputField = () => {
    switch (inputType) {
      case "radioButton":
        return (
          <RadioButtonField
            name={name}
            options={options || []}
            isError={!!isError}
          />
        );
      case "checkbox":
        return <Field type="checkbox" name={name} />;
      case "range":
        return <Field type="range" name={name} />;
      case "password":
        return <PasswordField isError={!!isError} name={name} />;
      default:
        return (
          <Field name={name}>
            {({ field }: FieldProps) => {
              return (
                <TextField
                  {...field}
                  fullWidth
                  variant="standard"
                  label={label}
                  type={inputType}
                  error={!!isError}
                />
              );
            }}
          </Field>
        );
    }
  };

  return (
    <div className="mb-4 relative">
      {getInputField()}
      {isError && (
        <div className="form-errors absolute -bottom-11 right-0 bg-white text-danger text-xs rounded-lg py-1 px-2 z-50">
          <ErrorMessage
            name={name}
            component="div"
            className="text-danger text-sm mt-1"
          />
          <div className="absolute top-[-10px] right-[4px] w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-b-white border-l-transparent border-r-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default FormField;
