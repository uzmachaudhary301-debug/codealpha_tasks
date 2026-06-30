import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';
import './index.css';

// Is standalone layout component mein humne routes ko wrap kiya hai
function AppContent() {
  const { isAuthenticated } = useAuth(); // Ab yeh hook crash nahi karega

  return (
    <div className="app-container">
      {/* Navbar tabhi upar show hogi jab user logged-in hoga */}
      {isAuthenticated && <Navbar />} 
      
      <main className="main-content">
        <Routes>
          {/* Main Lander Redirect Check */}
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          
          {/* Authentication Pages */}
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
          
          {/* Protected Content Routes */}
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/create-post" element={isAuthenticated ? <CreatePost /> : <Navigate to="/login" />} />
          
          {/* Fallback Protection */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;