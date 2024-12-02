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
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <img src={post.thumbnail} alt={post.title} className="w-full h-64 object-cover" />
      <p className="text-sm text-gray-500">{`${post.month} ${post.day}, ${new Date(post.date_created).getFullYear()}`}</p>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export default BlogPostDetail;