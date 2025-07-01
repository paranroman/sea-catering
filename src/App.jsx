import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Menu from './pages/menu/Menu';
import Subscription from './pages/subscription/Subscription';
import Contact from './pages/contact/Contact';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Profile from './pages/profile/Profile';
import UserDashboard from './pages/subscription/components/UserDashboard';
import './App.css';

export const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) setUser(JSON.parse(saved));
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <Router>
            <Navbar user={user} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/profile" element={<Profile user={user} handleLogout={handleLogout} />} />
            </Routes>
        </Router>
    );
};