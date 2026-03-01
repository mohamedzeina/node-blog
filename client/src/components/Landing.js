import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Landing = ({ auth }) => {
  if (auth) {
    return <Redirect to="/blogs" />;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center py-24">
      <p className="text-red-600 font-semibold tracking-widest uppercase text-sm mb-4">
        Welcome to
      </p>
      <h1 className="font-serif font-black text-7xl text-gray-900 leading-tight mb-6">
        Blogster
      </h1>
      <p className="text-gray-500 text-xl max-w-md mb-10 leading-relaxed">
        Your space for bold ideas, sharp writing, and stories worth telling.
      </p>
      <a
        href="/auth/google"
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 transition-colors duration-200 tracking-wide uppercase text-sm"
      >
        Sign in with Google
      </a>
    </div>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
