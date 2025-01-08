import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-accent text-center mb-8">Get in Touch</h1>
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400">Name</label>
              <input
                type="text"
                className="mt-2 w-full bg-gray-900 text-white rounded-md border border-gray-700 focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <input
                type="email"
                className="mt-2 w-full bg-gray-900 text-white rounded-md border border-gray-700 focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400">Message</label>
              <textarea
                rows="4"
                className="mt-2 w-full bg-gray-900 text-white rounded-md border border-gray-700 focus:border-accent focus:ring-accent"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-black py-2 px-4 rounded-md font-bold hover:scale-105 transition-transform"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
