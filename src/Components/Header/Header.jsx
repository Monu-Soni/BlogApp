import { Link, useNavigate } from 'react-router-dom'
import BLOGS from "../../assets/BLOGS.png"
import { useSelector } from 'react-redux'
import LogoutBtn from "./LogoutBtn"
import React, { useState, useEffect, useRef } from 'react'

function Header() {
    const authStatus = useSelector((state) => state.Auth.status)
    const [menuOpen, setMenuOpen] = useState(false)
    const Navigate = useNavigate()
    const menuRef = useRef(null)

    const handleNavClick = (slug) => {
        Navigate(slug)
        if (window.innerWidth < 640) {
          setMenuOpen(false)
        }
    }

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Log In",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Sign Up",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
        <header className='h-16'>
            <div className='z-50 fixed flexClass justify-between shadow-md h-16 text-base width'>
                <div className='ml-4 w-12'>
                    <Link to="/"><img className='rounded-full' src={BLOGS} alt="blogs" /></Link>
                </div>
                <button className='inline-flex z-30 sm:hidden bg-white mr-4 p-1 text-green-600 bold'
                    onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? "Close" : "Menu"}
                </button>
                <div className={`sm:inline-flex flex-row flex-wrap content-center items-center
                    ${menuOpen ? "menubar" : "hidden"}`} >
                    {
                        navItems.map((item) => item.active ? (
                            <div className='px-2 py-2' key={item.name}>
                                <button onClick={() => {
                                    Navigate(item.slug)
                                    handleNavClick(item.slug)} }
                                    className='bg-white hover:bg-gray-300 mr-1 px-4 py-2 rounded-md transition-all'>
                                    {item.name}
                                </button>
                            </div>
                        ) : null
                        )}
                    {authStatus && (<div className='mx-8'><LogoutBtn /></div>)}
                </div>
            </div>
        </header>
    )
}

export default Header
