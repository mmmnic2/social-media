"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  SnackbarCloseReason,
  TextField,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useLogin } from "@/hooks/api-hooks/auth-hooks/useAuth";
import { useGetUserProfile } from "@/hooks/api-hooks/user-hooks/useUser";
import { loginSuccess } from "@/redux/auth";
import store from "@/redux/store";
import { setUserInfo } from "@/redux/user";
import LoadingOverlay from "../common/loading/LoadingOverlay";
import { useSnackbar } from "../common/snackbar/Snackbar";

const initualValues = {
  email: "",
  password: "",
};
const validitionSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(2, "Password must be at least 6 characters")
    .required("Password is required"),
});
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const router = useRouter();
  const [formValue, setFormValue] = useState();
  const [notification, setNotification] = useState({
    isOpen: false,
    status: "error",
    message: "",
  });
  const { mutate: handleLogin, data } = useLogin();
  const {
    data: userData,
    isSuccess: getUserProfileSuccess,
    isLoading,
  } = useGetUserProfile(data?.accessToken);

  useEffect(() => {
    if (getUserProfileSuccess) {
      showSnackbar("Login Success", "success");
      store.dispatch(setUserInfo(userData));
      router.push("/test");
    }
  }, [getUserProfileSuccess, userData, router]);

  const handleClick = () => {
    router.push("/register");
  };
  const handleSubmit = (values: { email: string; password: string }) => {
    handleLogin(values, {
      onSuccess: (data: {
        accessToken: string;
        refreshToken: string;
        expireTime: number;
      }) => {
        let token: {
          accessToken: string;
          refreshToken: string;
          expireTime: number;
        } = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expireTime: data.expireTime + Date.now(),
        };
        store.dispatch(loginSuccess(token));
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
  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validitionSchema}
        initialValues={initualValues}
      >
        {({ handleSubmit, handleChange, isValid, dirty }) => (
          <Form
            onSubmit={handleSubmit}
            action="submit"
            autoComplete="off"
            className="sign-in-form form"
          >
            <div className="heading">
              <h2>Welcome Back</h2>
              <h6>Not register yet? </h6>
              <Link href={"/register"} className="toggle">
                Sign up
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
                  id="standard-basic"
                  name="email"
                  label="Email"
                  type="email"
                  variant="standard"
                  onChange={handleChange}
                  fullWidth
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="form-errors"
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
                    name="password"
                    variant="standard"
                    onChange={handleChange}
                    fullWidth
                    sx={{ width: "100%" }}
                    id="standard-adornment-password"
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className="form-errors"
                />
              </div>

              <Button
                type="submit"
                disabled={!isValid || !dirty}
                className="sign-btn"
              >
                Sign in
              </Button>

              <p className="text">
                Forgotten your password?
                <Link href={"#"} className="toggle">
                  {" "}
                  Get help
                </Link>
              </p>
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

export default Login;
