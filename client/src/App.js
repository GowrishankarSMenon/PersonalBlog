import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BackgroundGradient from './components/BackgroundGradient';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleUnlock = (status) => {
    setIsAdmin(status);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <BackgroundGradient />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 relative">
          <Routes>
            <Route path="/" element={<Home onUnlock={handleUnlock} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={isAdmin} isAdmin={isAdmin}>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
