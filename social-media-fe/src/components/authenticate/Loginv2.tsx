"use client";
import { useLogin } from "@/hooks/api-hooks/auth-hooks/useAuth";
import { useGetUserProfile } from "@/hooks/api-hooks/user-hooks/useUser";
import { loginSuccess } from "@/redux/auth";
import store from "@/redux/store";
import { setUserInfo } from "@/redux/user";
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
import { useEffect, useState } from "react";
import makeStyles from "@mui/material";

const Loginv2 = () => {
  // const router = useRouter();
  // const [formValue, setFormValue] = useState();
  // const [notification, setNotification] = useState({
  //   isOpen: false,
  //   status: "error",
  //   message: "",
  // });
  // const { mutate: handleLogin, data } = useLogin();
  // const {
  //   data: userData,
  //   isSuccess: getUserProfileSuccess,
  //   isLoading,
  // } = useGetUserProfile(data?.accessToken);
  // useEffect(() => {
  //   if (getUserProfileSuccess) {
  //     store.dispatch(setUserInfo(userData));
  //     router.push("/");
  //   }
  // }, [getUserProfileSuccess, userData, router]);

  // const handleClick = () => {
  //   router.push("/register");
  // };
  // const handleSubmit = (values: { email: string; password: string }) => {
  //   handleLogin(values, {
  //     onSuccess: (data: {
  //       accessToken: string;
  //       refreshToken: string;
  //       expireTime: number;
  //     }) => {
  //       let token: {
  //         accessToken: string;
  //         refreshToken: string;
  //         expireTime: number;
  //       } = {
  //         accessToken: data.accessToken,
  //         refreshToken: data.refreshToken,
  //         expireTime: data.expireTime + Date.now(),
  //       };
  //       store.dispatch(loginSuccess(token));
  //     },
  //     onError: (e) => {
  //       setNotification({
  //         isOpen: true,
  //         status: "error",
  //         message: "Login failure!",
  //       });
  //     },
  //   });
  // };
  const [showPassword, setShowPassword] = useState(false);
  const [mainClasses, setMainClasses] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <main className={mainClasses}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form action="submit" autoComplete="off" className="sign-in-form">
              <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Not register yet? </h6>
                <Link
                  href="#"
                  className="toggle"
                  onClick={() => setMainClasses("sign-up-mode")}
                >
                  Sign up
                </Link>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <TextField
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
                    label="Email"
                    variant="standard"
                    type="text"
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
                    <Input
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
                </div>

                <input type="submit" value="Sign in" className="sign-btn" />
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
            </form>

            <form action="submit" autoComplete="off" className="sign-up-form">
              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account? </h6>
                <Link
                  href="#"
                  className="toggle"
                  onClick={() => setMainClasses("")}
                >
                  Sign in
                </Link>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <TextField
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
                    label="Email"
                    variant="standard"
                    type="text"
                  />
                </div>

                <div className="input-wrap">
                  <TextField
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
                    label="Email"
                    variant="standard"
                    type="text"
                  />
                </div>
                <div className="input-wrap">
                  <TextField
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
                    label="Email"
                    variant="standard"
                    type="text"
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
                    <Input
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
            </form>
          </div>

          <div className="carousel"></div>
        </div>
      </div>
    </main>
  );
};

export default Loginv2;
