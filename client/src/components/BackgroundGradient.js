import React, { useEffect, useRef } from 'react';

const BackgroundGradient = () => {
  const gradientRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (gradientRef.current) {
        const scrolled = window.scrollY;
        gradientRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <div
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black"
        style={{ transform: 'translateY(0)' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 to-black pointer-events-none" />
    </div>
  );
};

export default BackgroundGradient;