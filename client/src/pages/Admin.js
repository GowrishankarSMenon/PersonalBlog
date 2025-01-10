import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, X, Check, Clock, Calendar } from 'lucide-react';

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date'); // Default sorting by date
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage('');
      }, 4000);

      return () => clearTimeout(timeout); // Cleanup timeout if the component unmounts
    }
  }, [message]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      setMessage('Failed to fetch blogs');
    }
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min${readTime !== 1 ? 's' : ''}`;
  };

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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async (formData) => {
    try {
      const processedData = {
        ...formData,
        date: new Date().toISOString().split('T')[0],
        readTime: formData.readTime || calculateReadTime(formData.content),
      };

      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        setMessage('Blog added successfully!');
        setIsCreating(false);
        fetchBlogs();
      }
    } catch (error) {
      setMessage('Error adding blog');
    }
  };

  const handleEdit = async (formData) => {
    try {
      const currentBlog = blogs.find((blog) => blog.id === editingId);

      const processedData = {
        ...formData,
        date: currentBlog.date,
        readTime: formData.readTime || calculateReadTime(formData.content),
      };

      const response = await fetch(`http://localhost:5000/api/blogs/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: processedData.title,
          content: processedData.content,
          date: processedData.date,
          readTime: processedData.readTime,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessage('Blog updated successfully!');
      setEditingId(null);
      fetchBlogs();
    } catch (error) {
      console.error('Update error:', error);
      setMessage('Error updating blog: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMessage('Blog deleted successfully!');
          fetchBlogs();
        }
      } catch (error) {
        setMessage('Error deleting blog');
      }
    }
  };

  const BlogForm = ({ onSubmit, initialData = { title: '', content: '', readTime: '' }, onCancel }) => {
    const [formData, setFormData] = useState(initialData);

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6 bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-white/10">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-black/40 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full p-3 rounded-md bg-black/40 border border-white/10 text-white h-32 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">
            Read Time (optional - will be calculated automatically if left empty)
          </label>
          <input
            type="text"
            name="readTime"
            value={formData.readTime}
            onChange={handleInputChange}
            placeholder="e.g., 5 mins"
            className="w-full p-3 rounded-md bg-black/40 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-white/10 hover:border-white/20 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-all font-medium"
          >
            {editingId ? 'Update' : 'Create'} Blog
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-neutral-950 to-black">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl mt-6 pb-3 font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Blog Dashboard
            </h1>
            <p className="mt-2 text-neutral-400">Manage your blog posts and content</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortCriteria}
              onChange={(e) => handleSort(e.target.value)}
              className="p-2 bg-black/40 border border-white/10 rounded-md text-neutral-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="readTime">Sort by Read Time</option>
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search blogs..."
              className="p-2 bg-black/40 border border-white/10 rounded-md text-neutral-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={() => setIsCreating(true)}
              className="px-5 py-2.5 bg-white text-black rounded-md hover:bg-neutral-200 transition-all font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
            {message}
          </div>
        )}

        {isCreating && (
          <BlogForm 
            onSubmit={handleCreate}
            onCancel={() => setIsCreating(false)}
          />
        )}

        {!isCreating && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="group bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all">
                {editingId === blog.id ? (
                  <BlogForm 
                    onSubmit={handleEdit}
                    initialData={{
                      title: blog.title,
                      content: blog.content,
                      readTime: blog.read_time,
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-medium">{blog.title}</h2>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingId(blog.id)}
                          className="p-2 hover:bg-white/10 rounded-md transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 hover:bg-white/10 text-white rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4 text-sm text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(blog.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {blog.read_time}
                      </span>
                    </div>
                    <p className="mt-4 text-neutral-300 line-clamp-2">{blog.content}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
