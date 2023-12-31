import React, { createContext, useContext, useState } from 'react';

// this context is responsible for login status and visiblity of login modal
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(() => {
    const storedLoginStatus = localStorage.getItem('loginStatus');
    return storedLoginStatus === 'true';
  });

  const updateLoginStatus = (newStatus) => {
    setLoginStatus(newStatus);
    localStorage.setItem('loginStatus', newStatus);
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const updateLoginModalStatus = (newStatus) =>{
    setShowLoginModal(newStatus)
  }

  return (
    <AuthContext.Provider value={{ loginStatus, updateLoginStatus, showLoginModal, updateLoginModalStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hooks to show or hide the login modal
export function useShowLoginModal(){
  const context = useContext(AuthContext);
  return context.showLoginModal
}
export function useUpdateLoginModalStatus(){
  const context = useContext(AuthContext);
  return context.updateLoginModalStatus
} 

// custom hooks to use or update the login status
export function useAuth() {
  const context = useContext(AuthContext);
  return context.loginStatus;
} 
export function useUpdateLoginStatus() {
  const context = useContext(AuthContext);
  return context.updateLoginStatus;
}
