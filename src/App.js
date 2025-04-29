// src/App.js
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage'; // your admin dashboard

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <AdminPage />
      ) : (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

export default App;