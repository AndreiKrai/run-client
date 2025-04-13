import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { MainProvider } from './context/MainContext';
import MainLayout from './layouts/MainLayout';
// import AuthLayout from './layouts/AuthLayout';
import Home from './pages/public/Home';
// import Login from './pages/public/Login';
// import Register from './pages/public/Register';
// import Dashboard from './pages/private/Dashboard';
// import Profile from './pages/private/Profile';
import './App.css';

// Private route guard component
const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <MainProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Protected routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route 
              path="dashboard" 
              element={<PrivateRoute element={<Dashboard />} />} 
            />
            <Route 
              path="profile" 
              element={<PrivateRoute element={<Profile />} />} 
            />
          </Route>
        </Routes>
      </MainProvider>
    </BrowserRouter>
  );
}

export default App;
