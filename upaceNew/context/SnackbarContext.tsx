import React, { createContext, useContext, useState } from "react";
import { Snackbar, useTheme } from "react-native-paper";

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    type?: "info" | "success" | "warning" | "error"
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

export const SnackbarProvider = ({ children }: Props) => {
  const paperTheme = useTheme();
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    type: "info" as "info" | "success" | "warning" | "error",
  });

  const showSnackbar = (
    message: string,
    type: "info" | "success" | "warning" | "error" = "info"
  ) => {
    setSnackbar({ visible: true, message, type });
  };

  const hideSnackbar = () => {
    setSnackbar({ ...snackbar, visible: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={hideSnackbar}
        duration={3000}
        theme={paperTheme}
      >
        {snackbar.message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }
  return context;
};
