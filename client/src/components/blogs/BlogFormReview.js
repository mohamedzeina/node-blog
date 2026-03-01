// BlogFormReview shows users their form inputs for review
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

class BlogFormReview extends Component {
  state = { file: null };

  renderFields() {
    const { formValues } = this.props;

    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name} className="mb-4">
          <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {label}
          </span>
          <p className="text-gray-900 font-medium">{formValues[name]}</p>
        </div>
      );
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { submitBlog, history, formValues } = this.props;
    submitBlog(formValues, this.state.file, history);
  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  render() {
    return (
      <div className="max-w-xl">
        <h5 className="font-serif font-bold text-3xl text-gray-900 mb-8">Review Your Post</h5>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="border border-gray-200 bg-white p-6 mb-6">
            {this.renderFields()}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide uppercase">
              Cover Image (optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 p-6 text-center hover:border-red-400 transition-colors duration-200">
              <input
                onChange={this.onFileChange.bind(this)}
                type="file"
                accept="image/*"
                className="w-full text-gray-500 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={this.props.onCancel}
              className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 transition-colors duration-200 tracking-wide uppercase text-sm"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.blogForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(BlogFormReview));
