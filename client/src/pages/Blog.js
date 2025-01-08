import React from 'react';

const Blog = () => {
  const blogs = [
    {
      title: 'Exploring React Hooks',
      date: 'January 1, 2025',
      summary: 'An in-depth look at how React Hooks can simplify your code.',
      readTime: '5 min read',
    },
    {
      title: 'Traveling the World',
      date: 'December 20, 2024',
      summary: 'Tips and tricks for traveling on a budget.',
      readTime: '4 min read',
    },
    {
      title: 'Mindfulness Matters',
      date: 'November 15, 2024',
      summary: 'How mindfulness can improve your daily life.',
      readTime: '6 min read',
    },
    {
      title: 'Mindfulness Matters',
      date: 'November 15, 2024',
      summary: 'How mindfulness can improve your daily life.',
      readTime: '6 min read',
    },
    {
      title: 'Mindfulness Matters',
      date: 'November 15, 2024',
      summary: 'How mindfulness can improve your daily life.',
      readTime: '6 min read',
    },
    {
      title: 'Mindfulness Matters',
      date: 'November 15, 2024',
      summary: 'How mindfulness can improve your daily life.',
      readTime: '6 min read',
    },
    {
      title: 'Mindfulness Matters',
      date: 'November 15, 2024',
      summary: 'How mindfulness can improve your daily life.',
      readTime: '6 min read',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto pt-32">
      <h1 className="text-6xl font-semibold tracking-tight">Latest Posts</h1>
      <div className="mt-16 space-y-10">
        {blogs.map((blog, index) => (
          <article
            key={index}
            className="group p-8 bg-neutral-900/30 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all hover:transform hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4 text-base text-neutral-500">
              <time>{blog.date}</time>
              <span>{blog.readTime}</span>
            </div>
            <h2 className="mt-4 text-3xl font-medium group-hover:text-neutral-200 transition-colors">
              {blog.title}
            </h2>
            <p className="mt-4 text-lg text-neutral-400">{blog.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;