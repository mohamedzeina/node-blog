import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../actions';

class BlogList extends Component {
  componentDidMount() {
    this.props.fetchBlogs();
  }

  renderBlogs() {
    const blogs = map(this.props.blogs, blog => blog);

    if (!blogs.length) {
      return (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No posts yet. Write your first one.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map(blog => (
          <div
            key={blog._id}
            className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <h2 className="font-serif font-bold text-xl text-gray-900 mb-2 leading-snug">
              {blog.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
              {blog.content}
            </p>
            <Link
              to={`/blogs/${blog._id}`}
              className="text-red-600 hover:text-red-700 text-sm font-semibold tracking-wide uppercase transition-colors duration-200"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    );
  }

  render() {
    return <div>{this.renderBlogs()}</div>;
  }
}

function mapStateToProps({ blogs }) {
  return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
