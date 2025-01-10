import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date'); // Default sorting by date

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) {
        setError('Failed to load blogs');
        console.error('Error:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    const sortedBlogs = [...blogs].sort((a, b) => {
      if (criteria === 'title') {
        return a.title.localeCompare(b.title);
      } else if (criteria === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (criteria === 'readTime') {
        return parseInt(b.read_time) - parseInt(a.read_time);
      }
      return 0;
    });
    setBlogs(sortedBlogs);
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return <div className="max-w-5xl mx-auto pt-32">Error: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto pt-32">
      {/* Heading and Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <h1 className="text-6xl font-semibold tracking-tight">Latest Posts</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 md:mt-0">
          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs..."
            className="w-full sm:w-auto p-3 rounded-md bg-neutral-900/30 border border-neutral-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-neutral-300 transition-all"
          />

          {/* Sorting */}
          <select
            value={sortCriteria}
            onChange={(e) => handleSort(e.target.value)}
            className="p-3 rounded-md bg-neutral-900/30 border border-neutral-800 text-neutral-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="readTime">Sort by Read Time</option>
          </select>
        </div>
      </div>

      <div className="mt-16 space-y-10">
        {filteredBlogs.map((blog) => (
          <article
            key={blog.id}
            className="group p-8 bg-neutral-900/30 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all hover:transform hover:scale-[1.02]"
          >
            <Link to={`/blog/${blog.id}`}>
              <div className="flex items-center gap-4 text-base text-neutral-500">
                <time>{new Date(blog.date).toLocaleDateString()}</time>
                <span>{blog.read_time}</span>
              </div>
              <h2 className="mt-4 text-3xl font-medium group-hover:text-neutral-200 transition-colors">
                {blog.title}
              </h2>
              <p className="mt-4 text-lg text-neutral-400">{blog.content.substring(0, 200)}...</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
