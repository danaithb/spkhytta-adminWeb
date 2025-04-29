import React from 'react';

const LogoutButton = ({ onLogout }) => {
  return (
    <button onClick={onLogout} style={styles.button}>
      Logg Ut
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: '#ff4d4f',
    border: 'none',
    color: 'white',
    padding: '8px 16px',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LogoutButton;
