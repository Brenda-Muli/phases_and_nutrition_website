import React from "react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="relative flex h-screen bg-gradient-to-r from-[#FF9494] to-[#ffcbd0] overflow-hidden">

      <img 
        src="photos/background.png" 
        alt="Blob Image" 
        className="absolute right-0 top-0 h-full w-3/4 object-cover " 
      /> 

      {/* Text Section */}
      <div className="relative flex flex-col items-start justify-center p-8 w-full text-right">
        <div className="flex flex-row mb-9">
          {['Wellness', 'in', 'Phases'].map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.8 }}
              className={`text-4xl font-bold font-playfair ${
                word === 'in' ? 'text-[#fb3855]' : 'text-white'
              } text-6xl ${index < 2 ? 'mr-4' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2 }} // Adjust delay as needed
          className="mt-4 text-2xl text-white font-prata"
        >
          Discover the journey of wellness through various phases of life.
        </motion.p>

        {/* Buttons */}
        <div className="mt-6 space-x-4">
          <Link to="/register">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.2 }}
              className="bg-[#DE143C] text-white py-2 px-4 rounded-lg hover:bg-[#FA758F]"
            >
              SIGN UP
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.2 }}
              className="bg-[#DE143C] text-white py-2 px-4 rounded-lg hover:bg-[#FA758F]"
            >
              LOG IN
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
