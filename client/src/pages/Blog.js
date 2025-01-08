import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogContext = require.context('../content', false, /\.json$/);

        const posts = await Promise.all(
          blogContext.keys().map(async (filename) => {
            const blogData = await blogContext(filename);
            return {
              ...blogData,
              slug: filename.replace('./', '').replace('.json', '') // Generate slug
            };
          })
        );

        // Sort posts by date
        setBlogs(posts.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) {
        console.error('Error loading blog posts:', error);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto pt-32">
      <h1 className="text-6xl font-semibold tracking-tight">Latest Posts</h1>
      <div className="mt-16 space-y-10">
        {blogs.map((blog) => (
          <article
            key={blog.slug}
            className="group p-8 bg-neutral-900/30 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all hover:transform hover:scale-[1.02]"
          >
            <Link to={`/blog/${blog.slug}`}>
              <div className="flex items-center gap-4 text-base text-neutral-500">
                <time>{new Date(blog.date).toLocaleDateString()}</time>
                <span>{blog.readTime}</span>
              </div>
              <h2 className="mt-4 text-3xl font-medium group-hover:text-neutral-200 transition-colors">
                {blog.title}
              </h2>
              <p className="mt-4 text-lg text-neutral-400">{blog.summary}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
