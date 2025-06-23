import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'

export const App = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
        </>
    )
}
