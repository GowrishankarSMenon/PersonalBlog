import React from 'react';

function BlogCard({ title, excerpt, date, imageUrl }) {
  return (
    <div
      className="card transition-transform hover:scale-105 shadow-lg"
      style={{
        backgroundColor: 'var(--color-card-bg)',
        color: 'var(--color-card-text)',
      }}
    >
      <img
        src={imageUrl || '/api/placeholder/400/250'}
        alt={title}
        className="rounded-t-lg w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-sm" style={{ color: 'var(--color-footer-text)' }}>
          {date}
        </p>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2">{excerpt}</p>
        <button
          className="mt-4"
          style={{
            color: 'var(--color-card-text)',
            borderBottom: '2px solid var(--color-hover)',
          }}
        >
          Read More →
        </button>
      </div>
    </div>
  );
}

export default BlogCard;