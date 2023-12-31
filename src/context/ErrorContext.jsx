import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [showError, setShowError] = useState(false);

  const updateErrorStatus = (newStatus) => {
    setShowError(newStatus);
  };

  return (
    <ErrorContext.Provider value={{ showError, updateErrorStatus }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  return {
    showError: context.showError,
    updateErrorStatus: context.updateErrorStatus,
  };
}