"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  token: string | undefined;
}

interface AuthenticationProviderProps {
  children: React.ReactNode;
}

const AuthenticationContext = createContext<User | undefined>(undefined);

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const isUserAuthenticated = () => {
      const auth_token = localStorage.getItem("token");
      if (auth_token) {
        setToken(auth_token);
      }
    };

    isUserAuthenticated();
  }, [token]);

  return (
    <AuthenticationContext.Provider value={{ token }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = (): { token: string | undefined } => {
  const authContextValue = useContext(AuthenticationContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }

  return authContextValue;
};
