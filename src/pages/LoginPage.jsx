import React, { useState } from 'react';
import LoginPageStyles from '../theme/LoginPageStyles';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple validation (for now)
    if (username === 'admin' && password === '1234567890') {
      onLogin();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={LoginPageStyles.container}>
      <form onSubmit={handleLogin} style={LoginPageStyles.form}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={LoginPageStyles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={LoginPageStyles.input}
        />
        <button type="submit" style={LoginPageStyles.button}>Sign In</button>
      </form>
    </div>
  );
};


export default LoginPage;


