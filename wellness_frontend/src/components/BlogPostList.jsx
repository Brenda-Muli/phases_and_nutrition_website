import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogPostCategory from './BlogPostCategory';

function BlogPostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/photos/background.jpg', 
    '/photos/feminine_one.png',
    '/photos/background_image.jpg',
    '/photos/feminine_two.png',
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/blog/");
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

  return (
    <div className="max-w-9xl mx-auto p-4 pt-10 mx-0 px-2 ">
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
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-end">
          <div className="w-1/4 p-4 text-white">
            <h1 className="text-5xl font-bold font-prata text-[#4f0216]">Wellness Blog</h1>
            <p className="mt-2 text-lg">Discover the latest insights and trends in our posts.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post, index) => (
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
              <h2 className="text-lg font-semibold mt-2">{post.title}</h2>
              <p className="text-sm">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="text-[#c50b34] hover:text-pink-600">Read More</Link>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
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
          animation: slideIn 0.7s forwards;
        }
      `}</style>
    </div>
  );
}

export default BlogPostList;
