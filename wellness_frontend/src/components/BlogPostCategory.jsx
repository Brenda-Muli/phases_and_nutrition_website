import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogPostCategory = ({ setPosts }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(['menstrual_products', 'health_and_wellness', 'myths_and_facts', 'self_care']);
  }, []);

  const handleCategoryClick = async (category) => {
    try {
      const response = await axios.get(`https://wellness-backend-fetu.onrender.com/api/blog/category/`, {params: { category }});
      console.log("Selected Category Posts:", response.data); 
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      alert("Failed to load posts for this category.");
    }
  };

  return (
    <div className="flex flex-wrap justify-center mt-7 mb-4 space-x-4 text-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className="text-[#c50b34] hover:text-pink-600 font-bold mb-2 sm:mb-0"
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          {category.replace('_', ' ').toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default BlogPostCategory;
