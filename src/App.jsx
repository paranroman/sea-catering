import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from "./pages/home/Home.jsx";

export const App = () => {
    return (
        <>
            <Navbar />
            <Home   />
        </>
    )
}
