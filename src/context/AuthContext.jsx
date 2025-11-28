import { useState, useEffect } from "react";
import { AuthContext } from "./Context";
import api from "../services/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = async () => {
    try {
      await api.post("/usuarios/logout");
    } catch (error) {
      console.error("Erro no logout back-end", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { data } = await api.post("/usuarios/refresh");
        localStorage.setItem("token", data.access_token);
        
        // Decodifica o payload do JWT
        const payload = JSON.parse(atob(data.access_token.split('.')[1]));
        setUser({ id: payload.sub, nome: payload.nome, papel: payload.papel });
        
      } catch (error) {
        console.error("Sessão inválida ou expirada:", error);
        logout();
      }
    };
    checkSession();
  }, []);

  const login = async (email, senha) => {
    const { data } = await api.post("/usuarios/login", { email, senha });
    localStorage.setItem("token", data.access_token);
    setUser(data.user);
  };

const register = async (nome, email, senha, papel) => {
    const { data } = await api.post("/usuarios/register", { nome, email, senha, papel });
    
    localStorage.setItem("token", data.access_token);
    setUser(data.user);
};

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};