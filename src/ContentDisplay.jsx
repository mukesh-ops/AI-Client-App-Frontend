// components/ContentDisplay.jsx
import React from 'react';

function ContentDisplay({ content }) {
  return (
    <div className="mt-4 border p-4 bg-gray-100">
      <h2 className="text-xl font-semibold mb-2">AI Response</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default ContentDisplay;