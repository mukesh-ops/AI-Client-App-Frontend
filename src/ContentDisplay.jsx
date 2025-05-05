// components/ContentDisplay.jsx
import React from 'react';

function ContentDisplay({ content }) {
  return (
    <div className="mt-6 border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Response</h2>
      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default ContentDisplay;
