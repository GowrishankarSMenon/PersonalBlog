import React from 'react';
import { Link, useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://personalblog-production-bc94.up.railway.app/api/blogs/${id}`);
        if (!response.ok) throw new Error('Post not found');
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError('Failed to load post');
        console.error('Error:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto pt-32">
        <h1 className="text-4xl font-bold">Post not found</h1>
        <Link to="/blog" className="mt-4 text-blue-400 hover:text-blue-300">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-32">
      <Link to="/blog" className="text-blue-400 hover:text-blue-300">
        ← Back to blog
      </Link>
      <article className="mt-8">
        <header className="mb-8">
          <h1 className="text-5xl font-bold tracking-tight">{post.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-neutral-400">
            <time>{new Date(post.date).toLocaleDateString()}</time>
            <span>{post.read_time}</span>
          </div>
        </header>
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
};

export default BlogPost;