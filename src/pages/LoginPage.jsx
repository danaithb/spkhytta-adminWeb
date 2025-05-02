import React, { useState } from 'react';
import LoginPageStyles from '../theme/LoginPageStyles';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      localStorage.setItem("token", token);
      console.log("Token lagret:", token);

      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Backend authorized admin login");
        onLogin();
      } else {
        const backendError = await response.text(); // get detailed backend message
        console.error("Backend denied access:", backendError);
        alert("Ikke autorisert som admin");
      }
  
    } catch (error) {
      console.error("Login failed:", error);
      alert("Feil e-post eller passord (eller backend er nede)");
    }
  };

  return (
    <div style={LoginPageStyles.container}>
      <form onSubmit={handleLogin} style={LoginPageStyles.form}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={LoginPageStyles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={LoginPageStyles.input}
        />
        <button type="submit" style={LoginPageStyles.button}>Logg inn</button>
      </form>
    </div>
  );
};


export default LoginPage;