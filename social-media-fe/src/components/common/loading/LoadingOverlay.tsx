"use client";
// components/LoadingOverlay.tsx
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

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
