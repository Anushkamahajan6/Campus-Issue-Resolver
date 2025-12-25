import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Student from "./pages/Student";
import Admin from "./pages/Admin";

export default function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, []);

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
  };

  if (!token) return <Login onLogin={login} />;
  if (role === "admin") return <Admin token={token} onLogout={logout} />;
  return <Student token={token} onLogout={logout} />;
}
