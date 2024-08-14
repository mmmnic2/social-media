"use client";
import { useRegister } from "@/hooks/api-hooks/auth-hooks/useAuth";
import {
  Button,
  Card,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useRouter, usePathname } from "next/navigation";
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
const Register = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const { mutate: handleRegister, isLoading } = useRegister();
  const [notification, setNotification] = useState({
    isOpen: false,
    status: "error",
    message: "",
  });
  const handleSubmit = (values: typeof initialValues) => {
    console.log("test handle submit", values);
    handleRegister(values, {
      onSuccess: (data: {
        firstName: string;
        lastName: string;
        gender: string;
        password: string;
        email: string;
      }) => {
        setNotification({
          isOpen: true,
          status: "success",
          message: "Register successful.",
        });
        console.log(data);
      },
      onError: (e) => {
        setNotification({
          isOpen: true,
          status: "error",
          message: "Login failure!",
        });
      },
    });
  };
  const formRegister = Object.keys(initialValues).map((key, index) => (
    <div key={index}>
      <Field
        as={TextField}
        name={key}
        placeholder={key}
        type="email"
        variant="outlined"
        fullWidth
      />
      <ErrorMessage name="email" component="div" className="text-red-500" />
    </div>
  ));
  return (
    <div className="px-20 flex flex-col justify-center h-full">
      <Card className="card  p-8">
        <div className="flex flex-col items-center mb-5 space-y-1">
          <h1 className="logo text-center">Lan Social</h1>
          <p className="text-center text-sm w-[70&]">
            Connecting Lives, Sharing Stories: Making Your Friendship
          </p>
        </div>
        {/* Login Form here */}
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validationRegister}
          initialValues={initialValues}
        >
          {({ handleSubmit, handleChange, values, setFieldValue }) => (
            <Form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <Field
                    as={TextField}
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    as={TextField}
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    as={TextField}
                    name="email"
                    placeholder="Email"
                    type="email"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    as={TextField}
                    name="password"
                    placeholder="Password"
                    type="password"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
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
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500"
                    />
                  </FormControl>
                </div>
              </div>
              <Button
                sx={{ padding: ".8rem 0rem" }}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <div
          className="flex justify-center items-center gap-4 pt-2
            "
        >
          <p>If you already have an account ?</p>
          <Button onClick={() => router.push("/login")}>Login</Button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
