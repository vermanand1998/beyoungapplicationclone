import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export function LoaderProvider({ children }) {
  const [showLoader, setShowLoader] = useState(false);

  const updateLoaderStatus = (newStatus) => {
    setShowLoader(newStatus);
  };

  return (
    <LoaderContext.Provider value={{ showLoader, updateLoaderStatus }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  return {
    showLoader: context.showLoader,
    updateLoaderStatus: context.updateLoaderStatus,
  };
}
