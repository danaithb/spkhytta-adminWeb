import React, { useState } from 'react';
import LoginPageStyles from '../theme/LoginPageStyles';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

//kilde: https://github.com/kristiania-pg6301-2022/pg6301-react-and-express-lectures/blob/reference/12/client/pages/loginPage.jsx
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      localStorage.setItem("token", token);
      console.log("Token lagret:", token);

      const response = await fetch("https://hytteportalen-307333592311.europe-west1.run.app/api/auth/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Backend authorized admin login");
        onLogin();
      } else {
        const backendError = await response.text(); 
        console.error("Backend denied access:", backendError);
        setError("Ikke autorisert som admin");
      }
  
    } catch (error) {
      console.error("Login failed:", error);
      setError("Feil e-post eller passord (eller backend er nede)");
    }
  };

  return (
    // Ytre container for siden 
    <div style={LoginPageStyles.container}>

      {/* Skjema for innlogging */}
      <form onSubmit={handleLogin} style={LoginPageStyles.form}>
        <h2>Login</h2>
        {/* Input for e-post */}
        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={LoginPageStyles.input}
        />

        {/* Input for passord */}
        <input
          type="password"
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={LoginPageStyles.input}
        />
        <button type="submit" style={LoginPageStyles.button}>Logg inn</button>
        {/* Viser feilmeldling */}
        {error && (
            <p style={{ color: "red", marginTop: "1rem" }}>
              {error}
            </p>
        )}
      </form>
    </div>
  );
};


export default LoginPage;