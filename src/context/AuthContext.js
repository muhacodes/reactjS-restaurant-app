import React, { useState, useContext, createContext, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState({});

  useEffect(() => {
    const authStr = localStorage.getItem("auth");
    if (authStr) {
      const auth = JSON.parse(authStr);
      if (auth.expires && new Date(auth.expires) > new Date()) {
        // setAuth(auth);
      } else {
        // If token expired, remove from storage and re-render without authorization
        localStorage.removeItem("auth");
        setAuth({});
      }
    } else {
      // No auth info found in storage, user is not logged in
      setAuth({});
    }
  }, []);

  const updateAuth = (newAuth) => {
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
    // localStorage.setItem("x-auth", auth);
  };

  const logout = () => {
    setAuth({});
    localStorage.removeItem("auth");
  }

  return (
    <AuthContext.Provider
      value={{
        Auth,
        setAuth,
        updateAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
