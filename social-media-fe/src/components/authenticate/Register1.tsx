/* eslint-disable import/order */
"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRegister } from "@/hooks/api-hooks/auth-hooks/useAuth";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePathname } from "next/navigation";
import LoadingOverlay from "../common/loading/LoadingOverlay";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
};

const validationRegister = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short!")
    .required("Password is required"),
  gender: Yup.string().required("Gender is required"),
});
const Register1 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const router = useRouter();
  const currentPath = usePathname();
  const { mutate: handleRegister, isLoading } = useRegister();
  const [notification, setNotification] = useState({
    isOpen: false,
    status: "error",
    message: "",
  });
  const handleSubmit = (values: typeof initialValues) => {
    handleRegister(values, {
      onSuccess: (data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        gender: string;
      }) => {
        setNotification({
          isOpen: true,
          status: "success",
          message: "Register successful.",
        });
      },
      onError: (e) => {
        setNotification({
          isOpen: true,
          status: "error",
          message: "Register failure!",
        });
      },
    });
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationRegister}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, setFieldValue }) => (
          <Form
            action="submit"
            autoComplete="off"
            className="sign-up-form form"
            onSubmit={handleSubmit}
          >
            <div className="heading">
              <h2>Get Started</h2>
              <h6>Already have an account? </h6>
              <Link href={"/login"} className="toggle">
                Sign in
              </Link>
            </div>

            <div className="actual-form">
              <div className="input-wrap">
                <Field
                  as={TextField}
                  sx={{
                    width: "100%",
                    position: "absolute",
                    "& .MuiInput-root": {
                      "&.Mui-focused:after": {
                        borderColor: "#8371fd", // Màu của border khi focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "#8371fd", // Màu của label khi focus
                      },
                    },
                  }}
                  name="firstName"
                  label="First Name"
                  variant="standard"
                  onChange={handleChange}
                  type="text"
                />
              </div>

              <div className="input-wrap">
                <Field
                  as={TextField}
                  sx={{
                    width: "100%",
                    position: "absolute",
                    "& .MuiInput-root": {
                      "&.Mui-focused:after": {
                        borderColor: "#8371fd", // Màu của border khi focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "#8371fd", // Màu của label khi focus
                      },
                    },
                  }}
                  name="lastName"
                  label="Last Name"
                  variant="standard"
                  type="text"
                  onChange={handleChange}
                />
              </div>

              <div className="input-wrap">
                <Field
                  as={TextField}
                  sx={{
                    width: "100%",
                    position: "absolute",
                    "& .MuiInput-root": {
                      "&.Mui-focused:after": {
                        borderColor: "#8371fd", // Màu của border khi focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "#8371fd", // Màu của label khi focus
                      },
                    },
                  }}
                  name="email"
                  label="Email"
                  type="email"
                  variant="standard"
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrap">
                <FormControl
                  sx={{
                    width: "100%",
                    position: "absolute",
                    "& .MuiInput-root": {
                      "&.Mui-focused:after": {
                        borderColor: "#8371fd", // Màu của border khi focus
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "#8371fd", // Màu của label khi focus
                      },
                    },
                  }}
                  variant="standard"
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Field
                    as={Input}
                    sx={{ width: "100%" }}
                    name="password"
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="input-wrap">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    // name="row-radio-buttons-group"
                    name="gender"
                    value={values.gender}
                    onChange={(event) =>
                      setFieldValue("gender", event.target.value)
                    }
                  >
                    <FormControlLabel
                      value="FEMALE"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="MALE"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <input type="submit" value="Sign up" className="sign-btn" />
            </div>

            <Divider sx={{ color: "gray" }}>OR</Divider>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register1;
