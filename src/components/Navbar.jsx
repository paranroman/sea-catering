import React, { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import logo from '../assets/logo-sea-catering-nonbg.png';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('#home');
    const [showNav, setShowNav] = useState(true);
    const [lastScroll, setLastScroll] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // New state for mobile menu toggle

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#menu', label: 'Menu' },
        { href: '#subscription', label: 'Subscription' },
        { href: '#contact', label: 'Contact Us' },
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

    const handleLinkClick = (href) => {
        setActiveLink(href);
        setMenuOpen(false); //  Close menu after clicking
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
            } ${scrolled ? 'bg-[#bfa3d1]' : 'bg-transparent'}`}
        >
            <div className="w-full flex justify-between items-center px-6 lg:px-12 py-4">
                {/* Logo */}
                <div className={`transition-all duration-300 ${showNav ? 'opacity-100' : 'opacity-0'}`}>
                    <a href="/">
                        <img src={logo} alt="Logo" className="w-14 h-14" />
                    </a>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8 text-lg font-medium">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            onClick={() => handleLinkClick(link.href)}
                            className={`relative pb-1 text-[#512260] transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-white after:transition-all ${
                                activeLink === link.href ? 'after:w-full font-semibold' : ''
                            }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Sign In Button (Desktop Only) */}
                <div
                    className={`hidden md:block transition-all duration-300 ${
                        showNav ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <a
                        href="#register"
                        className="bg-[#4b0082] text-white px-6 py-2 rounded-lg hover:bg-purple-900 transition-all"
                    >
                        Sign In
                    </a>
                </div>

                {/* Hamburger Icon (Mobile) */}
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
                {navLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className={`${
                            activeLink === link.href ? 'underline underline-offset-4' : ''
                        } hover:text-[#512260] transition-colors`}
                    >
                        {link.label}
                    </a>
                ))}
                <a
                    href="#register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-[#4b0082] px-6 py-2 rounded-lg hover:bg-purple-900 transition-all"
                >
                    Sign In
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
