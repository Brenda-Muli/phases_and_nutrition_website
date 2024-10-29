import React from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../auth";

function Navbar() {
  const { isAuthorized, logout } = useAuthentication();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white shadow-md">
      <nav className="max-w-6xl mx-auto p-4">
        <ul className="flex space-x-4">
          {isAuthorized ? (
            <li>
              <Link 
                onClick={handleLogout} 
                to="/logout" 
                className="text-pink-500 hover:text-pink-600 font-bold"
              >
                LOGOUT
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/" className="text-pink-500 hover:text-pink-600 font-bold">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-pink-500 hover:text-pink-600 font-bold">
                  SIGN UP
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-pink-500 hover:text-pink-600 font-bold">
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
