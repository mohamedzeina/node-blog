import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <a
            href="/auth/google"
            className="text-white hover:text-red-400 transition-colors duration-200 font-medium tracking-wide"
          >
            Sign In
          </a>
        );
      default:
        return (
          <div className="flex items-center gap-6">
            <Link
              to="/blogs"
              className="text-white hover:text-red-400 transition-colors duration-200 font-medium tracking-wide"
            >
              My Blogs
            </Link>
            <a
              href="/auth/logout"
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Logout
            </a>
          </div>
        );
    }
  }

  render() {
    return (
      <nav className="bg-black">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to={this.props.auth ? '/blogs' : '/'}
            className="font-serif font-black text-2xl tracking-widest text-white hover:text-red-400 transition-colors duration-200 uppercase"
          >
            Blogster
          </Link>
          <div>{this.renderContent()}</div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
