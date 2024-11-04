import { useEffect, useState} from 'react';
import axios from 'axios';

function BlogFeatured() {
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      const response = await axios.get('/api/blog/featured');
      if (response.data.length > 0) {
        setFeaturedPost(response.data[0]); 
      }
    };
    fetchFeaturedPost();
  }, []);

  if (!featuredPost) return <p>No featured posts available.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Featured Article</h2>
      <div className="border rounded-lg p-4">
        <img src={featuredPost.thumbnail} alt={featuredPost.title} className="w-full h-64 object-cover rounded-t-lg" />
        <h3 className="text-lg font-semibold mt-2">{featuredPost.title}</h3>
        <p className="text-sm">{featuredPost.excerpt}</p>
        <Link to={`/blog/${featuredPost.slug}`} className="text-pink-500 hover:text-pink-600">Read More</Link>
      </div>
    </div>
  )
}

export default BlogFeatured;