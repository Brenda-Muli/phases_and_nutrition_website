import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../auth";
import { motion } from "framer-motion";

function Navbar() {
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = window.scrollY;
  const navbarRef = useRef(null);

  const phases = [
    { name: 'Menstrual Phase', slug: 'menstrual' },
    { name: 'Ovulatory Phase', slug: 'ovulatory' },
    { name: 'Luteal Phase', slug: 'luteal' },
    { name: 'Follicular Phase', slug: 'follicular' }
  ];

  const { isAuthorized, logout } = useAuthentication();

  const handleLogout = () => {
    logout();
  };

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
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
    className={`fixed w-full bg-transparent z-10 transition-transform duration-300 ${
      isVisible ? "translate-y-0" : "-translate-y-full pb-8"
    }`}
  >
    <nav
      ref={navbarRef} 
      className="max-w-6xl mx-auto p-4 flex justify-between items-center font-calistoga"
    >
      <div className="flex items-center">
        {isAuthorized && (
          <>
            <li>
              <Link
                to="/"
                className="text-[#DE143C] hover:text-[#C71A31] font-bold mr-4"
              >
                HOME
              </Link>
            </li>
          </>
        )}
      </div>

      <ul className="flex space-x-4 pr-8">
        

  {/* Logged-in user options */}
  {isAuthorized ? (
    <>
    <li className="relative">
      <Link
        to="#"
        className="text-[#DE143C] hover:text-[#C71A31] font-bold"
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
                className="block px-4 py-2 text-sm text-[#fb3855] hover:bg-[#ff6b7e]"
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
          className="text-[#DE143C] hover:text-[#C71A31] font-bold"
        >
          BLOGS
          </Link>
        </li>
        <li>
          <Link
            onClick={handleLogout}
            to="/logout"
            className="text-[#DE143C] hover:text-[#C71A31] font-bold"
          >
            LOGOUT
          </Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link
            to="/register"
            className="text-[#DE143C] hover:text-[#C71A31] font-bold"
          >
            SIGN UP
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="text-[#DE143C] hover:text-[#C71A31] font-bold"
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
