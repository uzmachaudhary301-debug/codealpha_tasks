import React from 'react';
import './UserCard.css';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="user-avatar-sm">{user.name[0]}</div>
      <div className="user-card-details">
        <h5>{user.name}</h5>
        <p>{user.bio}</p>
      </div>
      <button className="btn-follow">Follow</button>
    </div>
  );
}

export default UserCard;