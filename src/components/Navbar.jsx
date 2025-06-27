import React, { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-sea-catering-nonbg.png';

const Navbar = ({ user }) => {
    const location = useLocation();
    const [showNav, setShowNav] = useState(true);
    const [lastScroll, setLastScroll] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/menu', label: 'Menu' },
        { to: '/subscription', label: 'Subscription' },
        { to: '/contact', label: 'Contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setScrolled(currentScroll > 10);
            setShowNav(currentScroll < lastScroll || currentScroll < 10);
            setLastScroll(currentScroll);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScroll]);

    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
            ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
            ${scrolled ? 'bg-[#bfa3d1]/80 backdrop-blur-md shadow-md' : 'bg-transparent'}
            `}
            style={{
                WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            }}
        >

        <div className="w-full flex justify-between items-center px-6 lg:px-12 py-4">
                <Link to="/">
                    <img src={logo} alt="Logo" className="w-14 h-14" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8 text-lg font-medium">
                    {navLinks.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setMenuOpen(false)}
                            className={`relative pb-1 text-[#512260] transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#512260] after:transition-all ${
                                isActive(to) ? 'after:w-full font-semibold' : ''
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Right Button (Desktop Only) */}
                <div className={`hidden md:block transition-all duration-300 ${showNav ? 'opacity-100' : 'opacity-0'}`}>
                    {user ? (
                        <button onClick={() => navigate('/profile')} className="text-[#512260] text-3xl">
                            <FaUserCircle />
                        </button>
                    ) : (
                        <Link
                            to="/register"
                            className="bg-[#512260] text-white px-6 py-2 rounded-lg hover:bg-[#3b1748] transition-all"
                        >
                            Get Started
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden z-50">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-[#512260]">
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full h-screen bg-[#bfa3d1] flex flex-col items-center justify-center gap-8 text-2xl font-semibold text-white transition-transform duration-500 ${
                    menuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {navLinks.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        onClick={() => setMenuOpen(false)}
                        className={`${
                            isActive(to) ? 'underline underline-offset-4' : ''
                        } hover:text-[#512260] transition-colors`}
                    >
                        {label}
                    </Link>
                ))}

                {user ? (
                    <button
                        onClick={() => {
                            setMenuOpen(false);
                            navigate('/profile');
                        }}
                        className="text-[#512260] font-semibold"
                    >
                        {user.full_name}
                    </button>
                ) : (
                    <Link
                        to="/register"
                        className="bg-[#512260] text-white px-6 py-2 rounded-lg hover:bg-[#3b1748] transition-all"
                    >
                        Get Started
                    </Link>
                )}
            </div>
        </nav>

    );
};

export default Navbar;
