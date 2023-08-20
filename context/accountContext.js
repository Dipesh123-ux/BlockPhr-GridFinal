"use client";
import { useState, useEffect } from "react";
import AuthContext from "./authContext";

const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails,setUserDetails] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUserDetails = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUser) {
      setUser(storedUser);
    }
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userDetails,
        setUserDetails
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;