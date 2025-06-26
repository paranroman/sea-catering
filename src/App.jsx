import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from "./pages/home/Home.jsx";
import Menu from "./pages/menu/Menu.jsx";
import Subscription from "./pages/subscription/Subscription.jsx";

export const App = () => {
    return (
        <>
            <Navbar />
            <Home />
            {/*<Menu/>*/}
            {/*<Subscription />*/}
        </>
    )
}
