import React from "react";
import { Spinner } from "../Spinner";

interface AppButtonProps extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  loading?: boolean | undefined;
  type?: "submit" | "button" | "reset" | undefined;
}

export const AppButton: React.FC<AppButtonProps> = ({
  className = "",
  children,
  loading,
  type = "button",
  ...props
}) => {
  return (
    <button className={`${className} relative`} type={type} {...props}>
      {children}
      {loading && (
        <div className="absolute top-1/2 right-5 -translate-y-1/2">
          <Spinner />
        </div>
      )}
    </button>
  );
};
