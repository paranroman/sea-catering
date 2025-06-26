import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Testimonial from './components/Testimonial';
import ContactUs from './components/ContactUs.jsx';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Testimonial />
            <ContactUs />
        </>
    );
};

export default Home;
