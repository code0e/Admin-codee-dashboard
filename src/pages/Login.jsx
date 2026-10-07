import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (email === "admin@codee.com" && password === "CODEE@2026Admin") {
      localStorage.setItem("codee-auth", "true");
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <main className="login-page">
      <div className="login-box">
        <h1>CODEE</h1>

        <p>Admin Login</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
