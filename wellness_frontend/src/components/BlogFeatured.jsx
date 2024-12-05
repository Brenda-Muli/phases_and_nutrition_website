import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function BlogFeatured() {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      try {
        const response = await axios.get(`https://wellness-backend-fetu.onrender.com/api/blog/featured/`);
        if (response.data.length > 0) {
          setFeaturedPost(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching featured post:", error);
      }
    };

    // Fetch other posts
    const fetchOtherPosts = async () => {
      try {
        const response = await axios.get(`https://wellness-backend-fetu.onrender.com/api/blog/`);
        if (response.data.length > 0) {
          setOtherPosts(response.data.slice(0, 3));  
        }
      } catch (error) {
        console.error("Error fetching other posts:", error);
      }
    };

    fetchFeaturedPost();
    fetchOtherPosts();
  }, []);

  if (!featuredPost || otherPosts.length === 0) return <p>Loading...</p>;

  return (
    <>
      {/* Featured Article Section */}
      <div className="max-w-6xl mx-auto p-4 pt-7 space-y-6 ml-0">
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold text-[#951c45] mb-8 font-playfair">Featured Article</h2>
          <motion.div
            className="border rounded-lg p-4 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={featuredPost.thumbnail || "/photos/about_three.png"}
              alt={featuredPost.title}
              className="w-full h-96 object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{featuredPost.title}</h3>
            <p className="text-sm">{featuredPost.excerpt}</p>
            <Link to={`/blog/${featuredPost.slug}`} className="text-pink-500 hover:text-pink-600">
              Read More
            </Link>
          </motion.div>
        </div>
  
        {/* Other Blogs Section (Below Featured Article) */}
        <div className="w-full space-y-6">
          <h2 className="text-2xl font-semibold text-[#951c45] font-playfair">Other Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <motion.div
                key={post.id}
                className="border rounded-lg p-4 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <img
                  src={post.thumbnail || "/photos/about_three.png"}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <h3 className="text-sm font-semibold mt-2">{post.title}</h3>
                <p className="text-xs">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="text-pink-500 hover:text-pink-600">
                  Read More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
  
        {/* Arrow leading to the main blog page */}
        <div className="mt-4 text-center">
          <Link
            to="/blog"
            className="flex items-center justify-center text-[#b21e4b] hover:text-red-600 font-semibold"
          >
            <span>See All Blogs</span>
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default BlogFeatured;
