import React from "react";

const GoogleLogin = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google/callback";
  };

  return (
    <button onClick={handleLogin} className="bg-red-500 text-white p-2 rounded">
      Login with Google
    </button>
  );
};

export default GoogleLogin;
