import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import Signup from '../Pages/Signup'
import Signin from '../Pages/Signin'
import Dashboard from '../Pages/Dashboard';
import { useEffect, useState } from 'react';
import Logout from '../Pages/logout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("token")));
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
  }, [location]);

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("token")));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
   <>
   
   <Routes>
    <Route path='/signup' 
      element={
        !isAuthenticated
          ? <Signup/>
          : <Navigate to="/" />
      }/>
    <Route path='/signin' 
      element={
        !isAuthenticated
          ? <Signin/>
          : <Navigate to="/" />
      }/>
    <Route path='/logout' element={<Logout/>}/>
    <Route path='/' 
      element={
        isAuthenticated
          ? <Dashboard />
          : <Navigate to="/signin" />
      }/>
   </Routes>
   </>
  )
}

export default App
