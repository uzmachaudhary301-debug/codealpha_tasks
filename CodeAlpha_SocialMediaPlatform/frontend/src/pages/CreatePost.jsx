import React, { useState } from 'react';
import './CreatePost.css';

function CreatePost() {
  const [content, setContent] = useState('');

  const handlePublish = (e) => {
    e.preventDefault();
    console.log("Publishing post: ", content);
    setContent('');
  };

  return (
    <div className="create-post-wrapper">
      <div className="create-post-card">
        <h3>Create a New Post</h3>
        <form onSubmit={handlePublish}>
          <textarea 
            placeholder="What's on your mind? Share your thoughts..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit" className="btn-publish">Publish Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;