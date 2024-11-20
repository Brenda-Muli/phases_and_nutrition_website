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
    { name: "Ovulatory Phase", slug: "ovulatory" },
    { name: "Luteal Phase", slug: "luteal" },
    { name: "Follicular Phase", slug: "follicular" },
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
      className={`fixed w-full bg-white z-10 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full "}`}
    >
      <nav
        ref={navbarRef}
        className="max-w-6xl mx-auto p-4 flex justify-between items-center font-calistoga "
      >
        <div className="flex items-center">
          {isAuthorized && (
            <Link
              to="/home"
              className="text-[#b21e4b] hover:text-[#C71A31] font-bold mr-4"
            >
              HOME
            </Link>
          )}
        </div>

        <ul className="flex space-x-4 pr-8">
          {isAuthorized ? (
            <>
              <li className="relative">
                <Link
                  to="#"
                  className="text-[#b21e4b] hover:text-[#C71A31] font-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    setSubmenuVisible(!submenuVisible);
                  }}
                >
                  PHASES
                </Link>

                {submenuVisible && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-0 w-48 mt-2 text-white rounded-md shadow-lg"
                  >
                    <div className="py-1">
                      {phases.map((phase) => (
                        <Link
                          key={phase.slug}
                          to={`/phases/${phase.slug}`}
                          className="block px-4 py-2 text-sm text-[#d42a5b] hover:bg-[#e63f66]"
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
                <Link
                  to="/blog"
                  className="text-[#b21e4b] hover:text-[#C71A31] font-bold"
                >
                  BLOGS
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center space-x-2">
                  <img 
                    src="/photos/defaultprofile.JPG" 
                    alt="Profile"
                    className="w-6 h-6 rounded-full" 
                    
                  />
                <span className="text-[#b21e4b] hover:text-[#C71A31] font-bold">
                    PROFILE
                </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={logout} 
                  className="text-[#b21e4b] hover:text-[#C71A31] font-bold"
                >
                  LOGOUT
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/register"
                  className="text-[#b21e4b] hover:text-[#C71A31] font-bold"
                >
                  SIGN UP
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-[#b21e4b] hover:text-[#C71A31] font-bold"
                >
                  LOGIN
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
