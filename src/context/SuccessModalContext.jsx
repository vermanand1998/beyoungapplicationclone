import React, { createContext, useContext, useState } from "react";

const SuccessModalContext = createContext();

export function SuccessModalProvider({ children }) {
  const [showSuccessModal, setShowSuccessmodal] = useState(false);

  const updateSuccessmodal = (newStatus) => {
    setShowSuccessmodal(newStatus);
  };

  return (
    <SuccessModalContext.Provider value={{ showSuccessModal, updateSuccessmodal }}>
      {children}
    </SuccessModalContext.Provider>
  );
}

export function useSuccessModal() {
  const context = useContext(SuccessModalContext);
  return {
    showSuccessModal: context.showSuccessModal,
    updateSuccessmodal: context.updateSuccessmodal,
  };
}