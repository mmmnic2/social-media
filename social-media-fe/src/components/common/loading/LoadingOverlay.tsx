"use client";
// components/LoadingOverlay.tsx
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { Backdrop } from "@mui/material";

const LoadingOverlay = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
