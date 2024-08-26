"use client";
import Link from "next/link";
import FormComponent, { FormField } from "../common/form/FormComponent";
import { Divider } from "@mui/material";
import { loginMethodIcon } from "./constances";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/api-hooks/auth-hooks/useAuth";
import { useSnackbar } from "../common/snackbar/Snackbar";

const formFields: FormField[] = [
  { name: "firstName", inputType: "text", isMandatory: true, minLength: 2, label: "First Name"},
  { name: "lastName", inputType: "text", isMandatory: true, minLength: 2, label: "Last Name" },
  { name: "email", inputType: "text", isMandatory: true, isEmail: true, label: "User Name"},
  { name: "password", inputType: "password", isMandatory: true, minLength: 6, label: "Password" },
  { name: "gender", inputType: "radioButton", isMandatory: true, options: [{label: "Male", value: "MALE"}, {label: "Female", value: "FEMALE"}], label: "Gender"},
];


const RegisterV3 = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const { mutate: handleRegister, isLoading } = useRegister();



  const handleFormSubmit = (values: any) => {
    console.log("test handle submit", values);
    handleRegister(values, {
      onSuccess: (data: {
        firstName: string;
        lastName: string;
        gender: string;
        password: string;
        email: string;
      }) => {
        showSnackbar("Register Success!", "success");
        router.push("/login");
      },
      onError: (e) => {
        showSnackbar("Register Failed!", "error");
      },
    });
  };

  return (
    <div className="p-8 flex flex-col justify-between">
      <div className="heading mb-4">
        <h2 className="text-4xl font-semibold text-primary">Get Started</h2>
        <h6 className="text-secondary font-medium text-sm inline">Already have an account? </h6>
        <Link href={"/login"} className="hover:text-primary">
          Login
        </Link>
      </div>
      <div>
        <FormComponent
          form={formFields}
          onSubmit={handleFormSubmit}
          submitLabel="Sign up"
        />
      </div>
      <div>
      <Divider sx={{ color: "gray" }}>OR</Divider>
      <div className="flex items-center justify-between">
      {
        loginMethodIcon.map((item, idx) => (
            <a key={idx} href="#" className="border border-gray-300 rounded-[20%] inline-flex justify-center items-center mx-1 w-10 h-10 text-primary hover:bg-primary hover:text-white hover:transition-colors hover:duration-300 ease-linear">
              <i className={`fa-brands ${item.icon} text-inherit`}></i>
            </a>
        ))
      }
      </div>
      </div>
    </div>
  );
};

export default RegisterV3;
