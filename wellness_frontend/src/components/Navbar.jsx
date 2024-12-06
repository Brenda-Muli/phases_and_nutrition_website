import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../token"; // Import your token constants

function Navbar() {
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false); // Local state to track authorization
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  const lastScrollY = useRef(0);

  const phases = [
    { name: "Menstrual Phase", slug: "menstrual" },
    { name: "Follicular Phase", slug: "follicular" },
    { name: "Ovulatory Phase", slug: "ovulatory" },
    { name: "Luteal Phase", slug: "luteal" },
  ];

  // Handle scroll visibility of navbar
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

  // Handle click outside of navbar to close submenu
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setSubmenuVisible(false);
    }
  };

  // Monitor changes to authentication state when component mounts
  useEffect(() => {
    const checkAuthStatus = () => {
      if (localStorage.getItem(ACCESS_TOKEN)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    };

    checkAuthStatus(); // Check auth status when component mounts

    // Listen for changes to localStorage
    window.addEventListener('storage', checkAuthStatus);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div
      className={`fixed w-full bg-white z-10 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav ref={navbarRef} className="max-w-6xl mx-auto p-4 flex items-center justify-between space-x-8 overflow-x-auto">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <Link to="/home">
            <img 
              src="/photos/logo.png" 
              alt="Logo" 
              className="w-5 h-5 rounded-full"
            />
          </Link>
        </div>

        {/* Centered navigation links */}
        <ul className="flex items-center space-x-8 flex-grow justify-center">
          {isAuthorized ? (
            <>
              <li>
                <Link to="/home" className="text-[#b21e4b] hover:text-[#C71A31] font-bold">
                  HOME
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={() => setSubmenuVisible(!submenuVisible)}
                  className="text-[#b21e4b] hover:text-[#C71A31] font-bold"
                >
                  PHASES
                </button>
                {submenuVisible && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-0 w-48 mt-2 bg-white rounded-md shadow-lg z-20"
                  >
                    <div className="py-1">
                      {phases.map((phase) => (
                        <Link
                          key={phase.slug}
                          to={`/phases/${phase.slug}`}
                          className="block px-4 py-2 text-sm text-[#b21e4b] hover:bg-[#fbf4f7]"
                          onClick={() => setSubmenuVisible(false)}
                        >
                          {phase.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </li>
              <li>
                <Link to="/blog" className="text-[#b21e4b] hover:text-[#C71A31] font-bold">
                  BLOGS
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-[#b21e4b] hover:text-[#C71A31] font-bold">
                  CALENDAR
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center space-x-2">
                  <img
                    src="/photos/defaultprofile.JPG"
                    alt="Profile"
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-[#b21e4b] hover:text-[#C71A31] font-bold">
                    PROFILE
                  </span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="text-[#b21e4b] hover:text-[#C71A31] font-bold">
                  SIGN IN
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-[#b21e4b] hover:text-[#C71A31] font-bold">
                  LOG IN
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Logout button on the right */}
        {isAuthorized && (
          <div className="flex-shrink-0">
            <button
              onClick={logout}
              className="text-[#b21e4b] hover:text-[#C71A31] font-bold"
            >
              LOGOUT
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
