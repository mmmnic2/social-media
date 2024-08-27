import React from 'react';
import { Field, FieldProps } from 'formik';
import { FormControlLabel, Checkbox } from '@mui/material';

const CheckboxField: React.FC<FieldProps> = ({ field, form }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          checked={field.value}
          color="primary"
        />
      }
      label={field.name}
    />
  );
};

export default CheckboxField;