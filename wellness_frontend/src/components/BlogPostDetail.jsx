import {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BlogPostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get( `https://wellness-backend-fetu.onrender.com/api/blog/${slug}/`);
      setPost(response.data);
    };
    fetchPost();
  }, [slug]);

  if (!post) return <div>Loading....</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-center sm:text-left">{post.title}</h1>
  
      {/* Image Section */}
      <img 
        src={post.thumbnail} 
        alt={post.title} 
        className="w-full h-64 object-cover rounded-lg mt-4" 
      />
  
      {/* Date Section */}
      <p className="text-sm text-gray-500 mt-2 text-center sm:text-left">
        {`${post.month} ${post.day}, ${new Date(post.date_created).getFullYear()}`}
      </p>
  
      {/* Content Section */}
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
  
}

export default BlogPostDetail;