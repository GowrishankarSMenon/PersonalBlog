import React from 'react';

function About() {
  return (
    <div className="min-h-screen pt-24" style={{ backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <img
            src="/api/placeholder/150/150"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto"
            style={{ borderColor: 'var(--accent-color)' }}
          />
          <h1 className="text-4xl font-extrabold" style={{ color: 'var(--accent-color)' }}>About Me</h1>
        </div>
        <div className="text-lg leading-relaxed">
          <p>
            Hello! I'm [Your Name], and this is my personal blog where I share my experiences and thoughts about [your topics].
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
