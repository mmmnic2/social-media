"use client";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLogin } from "@/hooks/api-hooks/auth-hooks/useAuth";
import { useGetUserProfile } from "@/hooks/api-hooks/user-hooks/useUser";
import { loginSuccess } from "@/redux/auth";
import store from "@/redux/store";
import { setUserInfo } from "@/redux/user";
import FormComponent, { FormField } from "../common/form/FormComponent";
import { useSnackbar } from "../common/snackbar/Snackbar";
import { loginMethodIcon } from "./constances";

const formFields: FormField[] = [
  {
    name: "email",
    inputType: "text",
    isMandatory: true,
    isEmail: true,
    label: "Username",
  },
  {
    name: "password",
    inputType: "password",
    isMandatory: true,
    minLength: 2,
    label: "Password",
  },
];

const Login = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const { mutate: handleLogin, data } = useLogin();
  const {
    data: userData,
    isSuccess: getUserProfileSuccess,
    isLoading,
    isFetching,
  } = useGetUserProfile(data?.accessToken);

  useEffect(() => {
    if (getUserProfileSuccess) {
      showSnackbar("Login Success", "success");
      store.dispatch(setUserInfo(userData));
      router.push("/");
      router.refresh();
    }
  }, [getUserProfileSuccess, userData]);

  const handleFormSubmit = (values: any) => {
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
        showSnackbar("Login Failed", "error");
      },
    });
  };

  return (
    <div className="p-8 flex flex-col justify-between">
      <div className="heading mb-4">
        <h2 className="text-4xl font-semibold text-primary">Welcome Back</h2>
        <h6 className="text-secondary font-medium text-sm inline">
          Not register yet?{" "}
        </h6>
        <Link href={"/register"} className="hover:text-primary">
          Sign up
        </Link>
      </div>
      <div>
        <FormComponent
          form={formFields}
          onSubmit={handleFormSubmit}
          submitLabel="Login"
          isLoading={isLoading || isFetching}
        />
        <p className="font-semibold text-primary mt-4">
          Forgotten your password?
          <Link href={"#"} className="text-text-primary hover:text-primary">
            {" "}
            Get help
          </Link>
        </p>
      </div>
      <div>
        <Divider sx={{ color: "gray" }}>OR</Divider>
        <div className="flex items-center justify-between">
          {loginMethodIcon.map((item, idx) => (
            <a
              key={idx}
              href={item.path}
              className="border border-gray-300 rounded-[20%] inline-flex justify-center items-center mx-1 w-10 h-10 text-primary hover:bg-primary hover:text-white hover:transition-colors hover:duration-300 ease-linear"
            >
              <i className={`fa-brands ${item.icon} text-inherit`}></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
