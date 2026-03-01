import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from './blogs/BlogList';

const Dashboard = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <h1 className="font-serif font-bold text-4xl text-gray-900">My Blogs</h1>
        <Link
          to="/blogs/new"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 transition-colors duration-200 text-sm tracking-wide uppercase"
        >
          + New Post
        </Link>
      </div>
      <BlogList />
    </div>
  );
};

export default Dashboard;
