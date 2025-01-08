import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BackgroundGradient from './components/BackgroundGradient';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <BackgroundGradient />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;