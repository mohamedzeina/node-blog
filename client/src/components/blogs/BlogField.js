import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div className={`mb-6 ${input.name}`}>
      <label className="block text-sm font-semibold text-gray-700 mb-1 tracking-wide uppercase">
        {label}
      </label>
      <input
        {...input}
        className="w-full border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:border-red-500 transition-colors duration-200 bg-white"
      />
      {touched && error && (
        <p className="text-red-600 text-sm mt-1 field-error">{error}</p>
      )}
    </div>
  );
};
