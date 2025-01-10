import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isSortExpanded, setIsSortExpanded] = useState(false);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const sortContainerRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchExpanded(false);
      }
      if (
        sortContainerRef.current &&
        !sortContainerRef.current.contains(event.target)
      ) {
        setIsSortExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

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

  const handleSortSelect = (criteria) => {
    setSortCriteria(criteria);
    setIsSortExpanded(false);
    handleSort(criteria);
  };

  const getSortLabel = (criteria) => {
    const labels = {
      date: 'Sort by Date',
      title: 'Sort by Title',
      readTime: 'Sort by Read Time'
    };
    return labels[criteria] || labels.date;
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <h1 className="text-6xl font-semibold tracking-tight">Latest Posts</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 md:mt-0">
          {/* Animated Search Bar */}
          <div ref={searchContainerRef} className="relative flex items-center">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs..."
              className={`
                p-3 rounded-md bg-neutral-900/30 border border-neutral-800 
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                text-neutral-300 transition-all duration-300 ease-in-out absolute right-0
                ${isSearchExpanded ? 'w-64 opacity-100' : 'w-0 opacity-0 p-0 border-0'}
              `}
            />
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className={`
                p-3 rounded-md bg-neutral-900/30 border border-neutral-800 
                hover:border-neutral-700 transition-all duration-300
                ${isSearchExpanded ? 'relative z-10 border-l-0' : ''}
              `}
            >
              <Search className="w-5 h-5 text-neutral-300" />
            </button>
          </div>

          {/* Animated Sort Dropdown */}
          <div ref={sortContainerRef} className="relative">
            <button
              onClick={() => setIsSortExpanded(!isSortExpanded)}
              className="p-3 rounded-md bg-neutral-900/30 border border-neutral-800 hover:border-neutral-700 transition-all flex items-center gap-2 min-w-[140px] justify-between"
            >
              <span className="text-neutral-300 text-sm">{getSortLabel(sortCriteria)}</span>
              <ChevronDown className={`w-4 h-4 text-neutral-300 transition-transform duration-300 ${isSortExpanded ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`
              absolute top-full right-0 mt-2 w-full py-2
              bg-neutral-900/30 backdrop-blur-sm border border-neutral-800 rounded-md
              transform transition-all duration-300 origin-top z-50
              ${isSortExpanded ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
            `}>
              <button
                onClick={() => handleSortSelect('date')}
                className="w-full px-4 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-800/50 transition-colors"
              >
                Sort by Date
              </button>
              <button
                onClick={() => handleSortSelect('title')}
                className="w-full px-4 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-800/50 transition-colors"
              >
                Sort by Title
              </button>
              <button
                onClick={() => handleSortSelect('readTime')}
                className="w-full px-4 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-800/50 transition-colors"
              >
                Sort by Read Time
              </button>
            </div>
          </div>
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