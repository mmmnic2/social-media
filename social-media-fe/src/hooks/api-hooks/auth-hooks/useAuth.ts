import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { login, logout, register } from "@/api/auth";
import { logout as logoutState } from "@/redux/auth";
export const useLogin = () => {
  return useMutation("login", login);
};

export const useRegister = () => {
  return useMutation("register", register);
};
export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return useMutation({
    mutationFn: logout, // Hàm sẽ được gọi khi mutate
    onSuccess: () => {
      dispatch(logoutState());
      router.push("/login");
    },
  });
};
