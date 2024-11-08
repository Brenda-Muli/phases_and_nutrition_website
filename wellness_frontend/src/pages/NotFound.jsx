import React from "react";

function NotFound() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <img 
        src="/photos/error-404.JPG" 
        alt="404 Error" 
        className="absolute inset-0 w-auto max-h-full object-contain z-0" 
      />
      <div className="absolute inset-0 z-10"></div>


      <div className="relative z-20 text-center text-white text-right ml-auto">
        <div>
          <h1 className="text-5xl font-bold mb-4 text-[#a50c33] pb-8">Page Not Found</h1>
          <p className="text-xl text-[#8d0e32]">Sorry, the page you are looking for does not exist.</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
