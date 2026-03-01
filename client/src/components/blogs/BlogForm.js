// BlogForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import BlogField from './BlogField';
import formFields from './formFields';

class BlogForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={BlogField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div className="max-w-xl">
        <h2 className="font-serif font-bold text-3xl text-gray-900 mb-8">New Post</h2>
        <form onSubmit={this.props.handleSubmit(this.props.onBlogSubmit)}>
          {this.renderFields()}
          <div className="flex items-center justify-between mt-8">
            <Link
              to="/blogs"
              className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 transition-colors duration-200 tracking-wide uppercase text-sm"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'blogForm',
  destroyOnUnmount: false
})(BlogForm);
