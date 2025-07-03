import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/authSlice';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    if (token) {
      dispatch(logout());
      navigate('/');
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">Task Manager</Link>
      <div>
        {!token ? (
          <>
            <Link to="/" className="mr-4">Login</Link>
            <Link to="/register" className="mr-4">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/tasks" element={<div className="p-6"><TaskForm /><TaskList /></div>} />
      </Route>
    </Routes>
  </Router>
);

export default App;
