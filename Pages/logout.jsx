import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from "../constant/api"
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem("token");
    
    fetch(`${API_BASE}/auth/signout`, {
      method: "POST",
      credentials: "include"
    });
   
    navigate("/signin");
  }, [navigate]);

  return (
    <div>Logging out...</div>
  );
};

export default Logout;