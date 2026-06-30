import React from 'react';
import './PostCard.css';

function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar">{post.user[0]}</div>
        <div className="post-user-info">
          <h4>{post.user}</h4>
          <span className="post-time">2 hours ago</span>
        </div>
      </div>
      <p className="post-content">{post.content}</p>
      <div className="post-actions">
        <button className="btn-action">❤️ {post.likes} Likes</button>
        <button className="btn-action">💬 {post.commentsCount} Comments</button>
      </div>
    </div>
  );
}

export default PostCard;