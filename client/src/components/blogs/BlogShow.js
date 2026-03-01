import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlog } from '../../actions';

class BlogShow extends Component {
  componentDidMount() {
    this.props.fetchBlog(this.props.match.params._id);
  }

  renderImage() {
    if (this.props.blog.imageKey) {
      return (
        <img
          src={
            'https://adv-nodejs-blog-bucket.s3.eu-central-1.amazonaws.com/' +
            this.props.blog.imageKey
          }
          alt="Blog cover"
          className="w-full h-auto rounded mb-8"
        />
      );
    }
  }

  render() {
    if (!this.props.blog) {
      return '';
    }

    const { title, content } = this.props.blog;

    return (
      <article className="max-w-2xl mx-auto py-8">
        <h1 className="font-serif font-black text-4xl text-gray-900 leading-tight mb-6">
          {title}
        </h1>
        {this.renderImage()}
        <p className="text-gray-700 text-lg leading-relaxed">{content}</p>
      </article>
    );
  }
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
