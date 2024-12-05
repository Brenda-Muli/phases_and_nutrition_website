import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogPostCategory from './BlogPostCategory';

function BlogPostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/photos/feminine_three.png', 
    '/photos/feminine_one.png',
    '/photos/feminine_two.png',
    '/photos/feminine_four.png',
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://wellness-backend-fetu.onrender.com/api/blog/`);
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); 
  }, [images.length]);

  const rows = [];
  for (let i = 0; i < posts.length; i += 3) {
    rows.push(posts.slice(i, i + 3)); 
  }

  return (
    <div className="max-w-9xl mx-auto p-4 pt-10 mx-0 px-2">
      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}
  
      <BlogPostCategory setPosts={setPosts} />
  
      {/* Top Div with Image Carousel */}
      <div className="relative h-[60vh] w-full mb-10 rounded-lg overflow-hidden">
        <img 
          src={images[currentImageIndex]} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: 0.8 }} 
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="w-full p-4 text-white text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-prata text-white">Wellness Blog</h1>
            <p className="mt-2 text-base sm:text-lg md:text-xl text-white">Discover the latest insights and trends in our posts.</p>
          </div>
        </div>
      </div>
  
      <div className="space-y-8">
        {Array.isArray(rows) && rows.length > 0 ? (
          rows.map((row, index) => (
            <div 
              key={index} 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transform transition-transform duration-500 ease-in-out"
              style={{ animationDelay: `${index * 8}s` }} 
            >
              {row.map((post) => (
                <div 
                  key={post.slug} 
                  className="border rounded-lg p-4 transform transition-transform duration-500 ease-in-out translate-x-full animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img 
                    src={post.thumbnail || 'path/to/default/image.jpg'} 
                    alt={post.title} 
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <h2 className="text-lg sm:text-xl font-semibold mt-2">{post.title}</h2>
                  <p className="text-sm sm:text-base">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="text-[#c50b34] hover:text-pink-600">Read More</Link>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
   
      {/* CSS for row animations */}
      <style jsx>{`
        @keyframes slideInRow {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slideInRow 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default BlogPostList;
