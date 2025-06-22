import React, {useState} from 'react'

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [acticeLink, setActiceLink] = useState('#home')

    const navLinks = [
        {href: "#home", label: "Home"},
        {href: "#menu", label: "Menu"},
        {href: "#subcription", label: "Subcription"},
        {href: "#contact", label: "Contact Us"},
    ]
    return (
        <nav className='fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm'>
            <div className='w-full container mx-auto px-4 sm:px-6 lg:px-8 md:h-20 h-16 flex justify-between items-center'>
                {/*logo*/}
                <div className='flex items-center gap-1 cursor-pointer'>
                    <div>
                        <a href='/' className='flex items-center gap-1'>
                            <img src='/logo-sea-catering-nonbg.png' alt='logo' className='w-10 h-10 opacity-75 hover:opacity-100 transition-opacity duration-300' />
                        </a>
                    </div>
                    <div></div>
                </div>

                {/*desktop navitems*/}
                <div className='hidden md:flex items-center gap-10'>
                    {
                        navLinks.map((link, index) => (
                            <a key={index} href={link.href}
                               onClick={() => setActiceLink(link.href)}
                               className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all ${acticeLink === link.href ? 'text-blue-600 after:w-full' : 'text-gray-600 hover:text-gray-900'}`}>
                                {link.label}</a>
                        ))
                    }
                </div>


            {/*register button*/}
            <button className="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100">
                <a href="#register">Sign In</a>
            </button>
            </div>
        </nav>
    )
}
export default Navbar
