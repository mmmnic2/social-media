import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, logout, register } from "@/api/auth";
import { authStore } from "@/lib/store/authStore";

/* 
  Hook xử lý đăng nhập tới backend server,
  khi thành công sẽ gửi request đến API route (/api/login) của NextJS để xử lý 
  lưu access token và refresh token vào cookies
*/
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      authStore.getState().setAccessToken(data.accessToken);
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

/* 
  Hook xử lý đăng ký tới backend server
*/
export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

/**
  Hook xử lý đăng xuất tới backend server
  Sau khi thành công sẽ gửi request đến API route (/api/logout) của NextJS để xử lý
  xóa access token khỏi cookies
 */
export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/login");
    },
  });
};
