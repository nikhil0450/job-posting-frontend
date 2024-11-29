import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Jobs from './pages/Jobs';
import AddJob from './pages/AddJob';
import Profile from './pages/Profile';
import Home from './pages/Home';
import NotFound from './components/NotFound';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
                        <Route path="/add-job" element={<ProtectedRoute><AddJob /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;