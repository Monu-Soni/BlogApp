import { Link } from 'react-router-dom'
import { Logo } from "../index"
import "./Footer.css"
import React from 'react'

function Footer() {
    return (
        <footer className='z-5 relative bgColor py-10'>
            <div className="relative z-10 max-w-7xl mx-3 -my-5 px-4 flex flex-wrap content-between">
                <div className="w-full h-60 p-6 flex flex-col justify-between md:w-1/2 lg:w-5/12">
                    <div className="mb-4 inline-flex items-center"><Logo width="100px" /></div>
                    <p className="text-sm text-white">&copy; Copyright 2023. All Rights Reserved by DevUI.</p>
                </div>
                <div className="footerDiv">
                    <h3 className="tracking-px mb-6 text-xs">Company</h3>
                    <ul>
                        <li><Link to="/">Affiliate Program</Link></li>
                        <li><Link to="/">Features</Link></li>
                        <li><Link to="/">Pricing</Link></li>
                        <li><Link to="/" >Press Kit</Link></li>
                    </ul>
                </div>
                <div className="footerDiv">
                    <h3 className="tracking-px mb-6 text-xs">Support</h3>
                    <ul>
                        <li><Link to="/">Account</Link></li>
                        <li><Link to="/">Help</Link></li>
                        <li><Link to="/">Contact Us</Link></li>
                        <li><Link to="/" >Customer Support</Link></li>
                    </ul>
                </div>
                <div className="footerDiv">
                    <h3 className="tracking-px mb-6 text-xs">Legals</h3>
                    <ul>
                        <li><Link to="/">Terms &amp; Conditions</Link></li>
                        <li><Link to="/">Privacy Policy</Link></li>
                        <li><Link to="/">Licensing</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
