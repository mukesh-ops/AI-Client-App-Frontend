// components/PromptForm.jsx
import React, { useState, useEffect } from 'react';
import ContentDisplay from './ContentDisplay';

function PromptForm() {
  const [url, setUrl] = useState('');
  const [appPassword, setAppPassword] = useState('');
  const [postType, setPostType] = useState('');
  const [postTypes, setPostTypes] = useState([]);
  const [postId, setPostId] = useState('');
  const [posts, setPosts] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [contentResult, setContentResult] = useState('');

  useEffect(() => {
    if (url && appPassword) {
      fetch(`/api/post-types`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, appPassword })
      })
        .then(res => res.json())
        .then(data => setPostTypes(data))
        .catch(console.error);
    }
  }, [url, appPassword]);

  useEffect(() => {
    if (url && appPassword && postType) {
      fetch(`/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, appPassword, postType })
      })
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(console.error);
    }
  }, [url, appPassword, postType]);

  useEffect(() => {
    setIsNew(postId === 'new');
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      url,
      appPassword,
      postType,
      postId,
      isNew,
      newTitle,
      prompt
    };

    const res = await fetch('/api/analyze-or-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setContentResult(data.result);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">AI-Powered WordPress Editor</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="WordPress Site URL"
            className="w-full border border-gray-300 rounded p-2"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <input
            type="password"
            placeholder="Application Password"
            className="w-full border border-gray-300 rounded p-2"
            value={appPassword}
            onChange={e => setAppPassword(e.target.value)}
          />
          <select
            className="w-full border border-gray-300 rounded p-2"
            onChange={e => setPostType(e.target.value)}
            value={postType}
          >
            <option value="">Select Post Type</option>
            {postTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            className="w-full border border-gray-300 rounded p-2"
            onChange={e => setPostId(e.target.value)}
            value={postId}
          >
            <option value="">Select Post/Page</option>
            <option value="new">Add New</option>
            {posts.map(post => (
              <option key={post.id} value={post.id}>{post.title}</option>
            ))}
          </select>

          {postId === 'new' && (
            <input
              type="text"
              placeholder="New Title"
              className="w-full border border-gray-300 rounded p-2"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
          )}

          <textarea
            placeholder="Enter prompt/question here..."
            className="w-full border border-gray-300 rounded p-2"
            rows={4}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          ></textarea>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>

        {contentResult && (
          <div className="mt-6">
            <ContentDisplay content={contentResult} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PromptForm;
