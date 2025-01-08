import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';

const Home = () => {
  const socials = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/o.g_shan.k.a.r_/',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/gowrishankar-s-menon-66b096296/',
      icon: Linkedin,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto pt-32 home">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Welcome to{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            DeJaVu
          </span>
        </h1>
        <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto">
          Experience the world through my eyes. I share my thoughts and experiences on my blog.
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-block px-6 py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-base font-medium transition-colors"
        >
          Read the blog
        </Link>
      </div>
      
      <section className="mt-24">
        <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
        <div className="mt-6 text-neutral-400 space-y-4">
          <p>
            Hi! I'm <span className="text-white font-semibold">Shankar</span>, 
            a software engineer and a blogger. I love to share my experiences and thoughts on my blog.
          </p>
          <p>
            I'm on a mission to create content that inspires and helps others to not make the same mistakes that I made.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h3 className="text-xl font-medium mb-6">Connect with me</h3>
        <div className="flex gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              <social.icon className="w-5 h-5" />
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;