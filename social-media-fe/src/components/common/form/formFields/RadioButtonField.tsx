import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormHelperText } from '@mui/material';
import { Field, FieldProps } from 'formik';

interface RadioButtonFieldProps {
  options: { value: string; label: string }[];
  isError: boolean;
  name: string;
}

const RadioButtonField: React.FC<RadioButtonFieldProps> = ({ options, isError, name }) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const { value, onChange, onBlur } = field;
        // const error = form.touched[name] && form.errors[name];
        
        return (
          <FormControl component="fieldset" error={isError}>
            <RadioGroup
              aria-label={name}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              {options.map(option => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {/* {error && <FormHelperText>{error}</FormHelperText>} */}
          </FormControl>
        );
      }}
    </Field>
  );
};

export default RadioButtonField;
