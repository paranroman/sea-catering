import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Menu from './pages/menu/Menu';
import Subscription from './pages/subscription/Subscription';
import Contact from './pages/contact/Contact';

export const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
};
