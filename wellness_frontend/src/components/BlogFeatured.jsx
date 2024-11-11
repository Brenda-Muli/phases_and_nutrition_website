import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 

function BlogFeatured() {
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog/featured/');
        console.log(response.data);  
        if (response.data.length > 0) {
          setFeaturedPost(response.data[0]);  
        }
      } catch (error) {
        console.error("Error fetching featured post:", error);
      }
    };
    fetchFeaturedPost();
  }, []);
  
  if (!featuredPost) return <p>No featured posts available.</p>;

  return (
    <div className="max-w-3xl mx-0 p-4 pt-7">
      <h2 className="text-2xl font-semibold text-[#951c45] mb-8 font-playfair">Featured Article</h2>
      
      {/* Motion Card */}
      <motion.div 
        className="border rounded-lg p-4" 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: 'easeOut' }} 
      >
        <img 
          src={featuredPost.thumbnail || '/photos/about_three.png'} 
          alt={featuredPost.title} 
          className="w-full h-64 object-cover rounded-t-lg" 
        />
        <h3 className="text-lg font-semibold mt-2">{featuredPost.title}</h3>
        <p className="text-sm">{featuredPost.excerpt}</p>
        <Link to={`/blog/${featuredPost.slug}`} className="text-pink-500 hover:text-pink-600">
          Read More
        </Link>
      </motion.div>

      <div className="mt-4 text-center">
        <Link to="/blog" className="text-red-500 hover:text-red-600 font-semibold">
          Read more blogs
        </Link>
      </div>
    </div>
  );
}

export default BlogFeatured;
