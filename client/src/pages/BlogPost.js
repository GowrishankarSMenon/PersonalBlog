import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await import(`../content/${slug}.json`);
        setPost(post);
      } catch (error) {
        console.error('Failed to load post:', error);
        setPost(null);
      }
    };

    loadPost();
  }, [slug]);

  if (!post) {
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
            <span>{post.readTime}</span>
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
