import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../index'
import { useSelector } from 'react-redux'
import LogoutBtn from "./LogoutBtn"
import { Button } from '../index'
import { useState } from 'react'

function Header() {
    const authStatus = useSelector((state) => state.Auth.status)
    const [menuOpen, setMenuOpen] = useState(false)
    const Navigate = useNavigate()

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
        <header className='h-16 shadow-md'>
            <div className='z-50 fixed flexClass justify-between shadow-md h-16 text-base width bgColor'>
                <div className='ml-4 w-14'>
                    <Link to="/">{<Logo />}</Link>
                </div>
                <div className='inline-flex z-30 sm:hidden mr-4'>
                    <Button onClick={() => setMenuOpen(!menuOpen)} className={"hover:text-white"}>
                        {menuOpen ? "X" : "Menu"}
                    </Button>
                </div>
                <div className={`sm:inline-flex flex-row flex-wrap content-center items-center
                    ${menuOpen ? "menubar" : "hidden"}`} >
                    {
                        navItems.map((item) => item.active ? (
                                <Button className="hover:text-white" key={item.name}
                                    onClick={() => {
                                        Navigate(item.slug)
                                        handleNavClick(item.slug)
                                    }}>
                                    {item.name}
                                </Button>
                        ) : null
                        )}
                    {authStatus && (<div className='mx-4'><LogoutBtn /></div>)}
                </div>
            </div>
        </header>
    )
}

export default Header
