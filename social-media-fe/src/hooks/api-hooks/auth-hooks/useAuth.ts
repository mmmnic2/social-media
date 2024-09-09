import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { login, logout, register } from "@/api/auth";
import { logout as logoutState } from "@/redux/auth";
export const useLogin = () => {
  return useMutation("login", login, {
    onSuccess: async (data) => {
      await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });
};

export const useRegister = () => {
  return useMutation("register", register);
};
export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return useMutation({
    mutationFn: logout, // Hàm sẽ được gọi khi mutate
    onSuccess: async () => {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(logoutState());
      router.push("/login");
    },
  });
};
