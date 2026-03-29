import { useState } from "react";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ new state

  const login = () => {
    if (!email || !password) return alert("Enter email & password");

    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("user", cleanEmail);
      localStorage.setItem("role", "admin");
      window.location.href = "/admin";
    } else {
      localStorage.setItem("user", cleanEmail);
      localStorage.setItem("role", "user");
      window.location.href = "/user";
    }
  };

  const register = () => {
    if (!name || !email || !password) return alert("Enter all fields");

    alert("Registered Successfully");

    localStorage.setItem("user", email);
    localStorage.setItem("role", "user");

    window.location.href = "/user";
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>{isRegister ? "Register" : "Login"}</h2>

        {isRegister && (
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={input}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"} // ✅ toggle type
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "purple",
              fontWeight: "bold"
            }}
          >
            {showPassword ? "🌕" : "🌑"} {/* eye icon */}
          </span>
        </div>

        <button style={btn} onClick={isRegister ? register : login}>
          {isRegister ? "Register" : "Login"}
        </button>

        <p style={toggle} onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "Already have account? Login"
            : "New user? Register"}
        </p>
      </div>
    </div>
  );
}

/* STYLES */
const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f3efff"
};

const card = {
  background: "#fff",
  padding: 30,
  borderRadius: 10,
  width: 300,
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
};

const input = {
  width: "100%",
  padding: 10,
  margin: "8px 0",
  borderRadius: 5,
  border: "1px solid #ccc"
};

const btn = {
  width: "100%",
  padding: 10,
  background: "#7b5cff",
  color: "#fff",
  border: "none",
  borderRadius: 5,
  cursor: "pointer"
};

const toggle = {
  cursor: "pointer",
  color: "purple",
  marginTop: 10,
  textAlign: "center"
};