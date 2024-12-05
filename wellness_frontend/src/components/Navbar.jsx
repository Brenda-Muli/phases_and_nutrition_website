import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthentication } from "../auth"; 

function Navbar() {
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  
  const { isAuthorized, logout } = useAuthentication(); 

  const lastScrollY = useRef(0); 

  const phases = [
    { name: "Menstrual Phase", slug: "menstrual" },
    { name: "Follicular Phase", slug: "follicular" },
    { name: "Ovulatory Phase", slug: "ovulatory" },
    { name: "Luteal Phase", slug: "luteal" },
  ];

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = window.scrollY; 
    }
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setSubmenuVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed w-full bg-white z-10 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav ref={navbarRef} className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <Link to="/home">
            <img src="/photos/logo.png" alt="Logo" className="w-5 h-5 rounded-full" />
          </Link>
        </div>
  
        {/* Mobile Menu Icon */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMenuVisible(!menuVisible)}
            className="text-[#b21e4b] hover:text-[#C71A31]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
  
        {/* Centered navigation links */}
        <ul className={`lg:flex space-x-8 flex-grow justify-center ${menuVisible ? 'flex' : 'hidden'} lg:flex`}>
          {isAuthorized ? (
            <>
              <li>
                <Link to="/home" className="text-[#b21e4b] hover:text-[#C71A31] font-bold">HOME</Link>
              </li>
              <li className="relative">
                <button onClick={() => setSubmenuVisible(!submenuVisible)} className="text-[#b21e4b] hover:text-[#C71A31] font-bold">
                  PHASES
                </button>
                {submenuVisible && (
                  <motion.div initial="hidden" animate="visible" exit="exit" className="absolute left-0 w-48 mt-2 bg-white rounded-md shadow-lg z-20">
                    <div className="py-1">
                      {phases.map((phase) => (
                        <Link key={phase.slug} to={`/phases/${phase.slug}`} className="block px-4 py-2 text-sm text-[#b21e4b] hover:bg-[#fbf4f7]" onClick={() => setSubmenuVisible(false)}>
                          {phase.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </li>
              <li>
                <Link to="/blog" className="text-[#b21e4b] hover:text-[#C71A31] font-bold">BLOGS</Link>
              </li>
              <li>
                <Link to="/calendar" className="text-[#b21e4b] hover:text-[#C71A31] font-bold">CALENDAR</Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center space-x-2">
                  <img src="/photos/defaultprofile.JPG" alt="Profile" className="w-5 h-5 rounded-full" />
                  <span className="text-[#b21e4b] hover:text-[#C71A31] font-bold">PROFILE</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="text-[#b21e4b] hover:text-[#C71A31] font-bold">SIGN IN</Link>
              </li>
              <li>
                <Link to="/login" className="text-[#b21e4b] hover:text-[#C71A31] font-bold">LOG IN</Link>
              </li>
            </>
          )}
        </ul>
  
        {/* Logout button on the right */}
        {isAuthorized && (
          <div className="flex-shrink-0">
            <button onClick={logout} className="text-[#b21e4b] hover:text-[#C71A31] font-bold">
              LOGOUT
            </button>
          </div>
        )}
      </nav>
    </div>
  );
  
}

export default Navbar;
