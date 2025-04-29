<<<<<<< HEAD
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
=======
import React from "react";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return <AdminPage />;
};
>>>>>>> 03593270dd07b59a1bdc14461125d72ef08485be

export default App;