import React, { useState, useEffect } from "react"; 
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Header() {
  const [bgImage, setBgImage] = useState('/photos/pink-background.jpg');
  const [textColor, setTextColor] = useState('#fb3855'); 

  const backgroundConfig = [
    { image: '/photos/header_one.jpg', color: '#ee4582', buttonColor: '#ee4582' }, 
    { image: '/photos/background_image.jpg', color: '#f996b5', buttonColor: '#d39a99' }, 
  ];

  // update background image and text/button color
  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((prevImage) => {
        const currentIndex = backgroundConfig.findIndex(bg => bg.image === prevImage);
        const nextIndex = (currentIndex + 1) % backgroundConfig.length;
        return backgroundConfig[nextIndex].image;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [backgroundConfig]);

  // update text color and button color when the background image changes
  useEffect(() => {
    const currentConfig = backgroundConfig.find(bg => bg.image === bgImage);
    if (currentConfig) {
      setTextColor(currentConfig.color);
    } else {
      setTextColor('#fb3855'); 
    }
  }, [bgImage]);

  return (
    <div className="relative flex h-screen overflow-hidden z-20">
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
        animate={{ opacity: [0, 1] }} 
        transition={{ duration: 4, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div> 
  
      {/* Text Section */}
      <div className="relative flex flex-col items-center justify-center p-8 w-full text-center z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 4, ease: "easeInOut" }} 
          className="flex flex-col sm:flex-row sm:mb-9"
        >
          {['Wellness', <span key="in" style={{ color: textColor }}>in</span>, 'Phases'].map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.8 }}
              className={`text-4xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-playfair ${index < 2 ? 'mr-4' : ''}  sm:text-5xl md:text-6xl lg:text-7xl ${word === 'Wellness' || word === 'Phases' ? 'text-white' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
  
        {/* Fade-in description text*/}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 3, duration: 3, ease: "easeInOut" }}
          className="mt-4 sm:text-xl md:text-2xl lg:text-3xl font-prata text-white"
        >
          Discover the journey of wellness through various menstrual phases.
        </motion.p>
  
        {/* Buttons */}
        <div className="mt-6 space-x-4 flex justify-center">
          <Link to="/register">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.2 }}
              className="text-white py-2 px-4 rounded-lg"
              style={{
                backgroundColor: textColor,
              }}
            >
              SIGN UP
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.2 }}
              className="text-white py-2 px-4 rounded-lg"
              style={{
                backgroundColor: textColor,
              }}
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
