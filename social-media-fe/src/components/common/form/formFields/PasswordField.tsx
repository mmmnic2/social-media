import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Field, FieldProps } from "formik";
import React, { useState } from "react";

interface PasswordFieldProps {
  isError: boolean;
  name: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ isError, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Field name={name}>
      {({ field }: FieldProps) => {
        return (
          <TextField
            {...field}
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="standard"
            label={"Password"}
            error={isError}
            //   helperText={form.touched[field.name] && form.errors[field.name]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
      }}
    </Field>
  );
};

export default PasswordField;
