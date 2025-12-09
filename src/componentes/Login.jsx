import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../componentes/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔒 hardcode
    if (username === "admin" && password === "1234") {
      login(username);
      navigate("/");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <section className="login">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
      </form>

      <button onClick={logout}>Salir</button>
    </section>
  );
}

export default Login;
