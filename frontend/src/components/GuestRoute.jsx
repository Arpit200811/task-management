import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestRoute = () => {
  const token = useSelector((state) => state.auth.token);
  return token ? <Navigate to="/tasks" replace /> : <Outlet />; 
};

export default GuestRoute;
