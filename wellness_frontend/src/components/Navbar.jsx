import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../auth";

function Navbar() {
  const { isAuthorized, logout } = useAuthentication();
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = window.scrollY;

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`fixed w-full bg-transparent z-10 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center font-calistoga">
        <div className="flex items-center">
          {isAuthorized && (
            <Link to="/" className="text-[#DE143C] hover:text-[#C71A31] font-bold mr-4">
              HOME
            </Link>
          )}
        </div>
        <ul className="flex space-x-4 pr-8">
          {isAuthorized ? (
            <>
              <li>
                <Link to="/blog" className="text-[#DE143C] hover:text-[#C71A31] font-bold">
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
                <Link to="/register" className="text-[#DE143C] hover:text-[#C71A31] font-bold">
                  SIGN UP
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-[#DE143C] hover:text-[#C71A31] font-bold">
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
