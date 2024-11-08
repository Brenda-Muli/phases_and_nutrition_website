import React from "react";
import BlogFeatured from "./BlogFeatured";  

function Home() {
  return (
    <>
      <div className="welcome-section pt-9 ">
        <h1 className="text-3xl font-bold">Welcome to the HomePage</h1>
        <p className="text-lg mt-2">Explore featured articles and much more!</p>
      </div>

     
      <BlogFeatured />

      
    </>
  );
}

export default Home;
