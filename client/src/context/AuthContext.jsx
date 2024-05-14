import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState({
    token: localStorage.getItem("token") || null,
    id: localStorage.getItem("id") || null,
  });

  function authenticate() {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    setIsAuth({ token, id });
  }

  useEffect(() => {
    const expiryDate = localStorage.getItem("expiryDate");
    if (expiryDate && new Date(expiryDate) < new Date()) {
      logout();
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("id");
    setIsAuth({ token: null, id: null });
  }

  return (
    <AuthContext.Provider value={{ isAuth, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
