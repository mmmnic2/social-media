type LoginMethodIcon = {
  icon?: string;
  path?: string;
};

export const loginMethodIcon: LoginMethodIcon[] = [
  {
    icon: "fa-google-plus-g",
    path: `${process.env.NEXT_PUBLIC_API_URL}/login/oauth2/authorization/google`,
  },
  {
    icon: "fa-facebook-f",
    path: `${process.env.NEXT_PUBLIC_API_URL}/login/oauth2/authorization/google`,
  },
  {
    icon: "fa-github",
    path: `${process.env.NEXT_PUBLIC_API_URL}/login/oauth2/authorization/google`,
  },
  {
    icon: "fa-linkedin-in",
    path: `${process.env.NEXT_PUBLIC_API_URL}/login/oauth2/authorization/google`,
  },
];
