/* eslint-disable react/no-unescaped-entities */
import Button from "@mui/material/Button";
import React from "react";

const WarningBanner = () => {
  return (
    <div className="bg-yellow-500 text-white px-4 py-1 flex items-center justify-between">
      <p className="text-base">
        "This is a demo version, so some features may be locked. Log in to
        experience the full functionality."
      </p>
      <div className="flex space-x-2">
        <button className="bg-accent-color rounded-lg hover:bg-primary py-2 px-4">
          Login
        </button>
        <button className="bg-gray rounded-lg hover:bg-gray/80 py-2 px-4">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default WarningBanner;
