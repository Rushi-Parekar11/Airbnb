import React from 'react'
import logo from "../assets/logo.png";
import { CircleUser } from 'lucide-react';
import { Link } from "react-router-dom";   
import { useNavigate } from "react-router-dom";


function Navbar() {
      const navigate = useNavigate();

    return (
        <>
            <nav className="border border-[#222323] h-13 w-full bg-[#0a0a0a] 
        flex items-center justify-between px-6 md:px-16">

                {/* LOGO */}
                <h2 className="text-2xl font-bold text-[#fe595e]">Course bnb</h2>

                {/* NAV LINKS */}
                <div className='text-sm text-white flex gap-5'>
                    <Link to="/admin" className='cursor-pointer hover:text-[#fe595e]'>Admin </Link>
                    <Link to="/" className='cursor-pointer hover:text-[#fe595e]'>Home </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar
