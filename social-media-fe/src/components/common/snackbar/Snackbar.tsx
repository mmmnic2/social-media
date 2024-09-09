"use client";

import { Snackbar as MuiSnackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: SnackbarState["severity"]) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (
    message: string,
    severity: SnackbarState["severity"] = "success",
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <MuiSnackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        key={snackbar.message}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ zIndex: 10001 }}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </MuiSnackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
